import json
from http.server import BaseHTTPRequestHandler, HTTPServer
import api
from urllib.parse import urlparse, parse_qs

api.init()

def run():
    HTTPServer(('', 5000), handler).serve_forever()

class handler(BaseHTTPRequestHandler):
    def not_found(self):
        self.send_error(404)

    def params(self):
        url = urlparse(self.path)
        return {key: a[0] for key, a in parse_qs(url.query).items()}

    def json(self):
        return json.loads(self.rfile.read())

    def jsonify(self, data):
        serialized = json.dumps(data)
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(serialized.encode())

    def do_GET(self):
        if self.path.startswith("/username"):
            user = self.params().get('user', 1)
            self.jsonify({ 'name': api.username(user) })

        elif self.path.startswith("/notifications"):
            data = self.params()
            user, day = data.get('user', 1), data['day']
            print(user, day)
            notifications = api.notifications_for_week(user, day)
            self.jsonify(notifications)

        else:
            self.not_found()

    def do_POST(self):
        if self.path.startswith("/add-medicine"):
            name = self.json()['name']
            return self.jsonify({ 'id': api.add_medicine(name) })

        elif self.path.startswith("/add-schedule"):
            data = self.json()
            user, medicine, days, time = data.get('user', 1), data['medicine'], data['days'], data['time']
            days = ''.join(days)
            id = api.add_schedule(user, medicine, days, time)
            return self.jsonify({ 'id': id })

        elif self.path.startswith("/add-taken"):
            data = self.json()
            user, medicine, time = data.get('user', 1), data['medicine'], data['time']
            id = api.add_taken(user, medicine, time)
            return self.jsonify({ 'id': id })

        else:
            self.not_found()

if __name__ == '__main__':
    run()
