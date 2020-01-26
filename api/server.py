import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import api

app = Flask(__name__)
CORS(app)

api.init()

@app.route("/add-medicine", methods=['POST'])
def add_medicine_handler():
    name = request.json['name']
    return jsonify({ 'id': api.add_medicine(name) })

@app.route("/add-schedule", methods=['POST'])
def add_schedule_handler():
    data = request.json
    user, medicine, days, time = data.get('user', 1), data['medicine'], data['days'], data['time']
    id = api.add_schedule(user, medicine, days, time)
    return jsonify({ 'id': id })

@app.route("/add-taken", methods=['POST'])
def add_taken_handler():
    data = request.json
    user, medicine, time = data.get('user', 1), data['medicine'], data['time']
    id = api.add_taken(user, medicine, time)
    return jsonify({ 'id': id })

@app.route("/username", methods=['GET'])
def username_handler():
    return jsonify({ 'name': api.username(data.get('user', 1)) })

@app.route("/notifications", methods=['GET'])
def notification_handler():
    data = request.args
    user, day = data.get('user', 1), data['day']
    notifications = api.notifications_for_week(user, day)
    return jsonify(notifications)
