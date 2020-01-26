import os
from postgres import Postgres
from psycopg2.errors import UniqueViolation

conn_string = None
connection = None

def init():
    # set up connection params
    username = os.environ.get("DB_USER", 'postgres')
    password = os.environ["DB_PASS"]
    host = os.environ.get("DB_HOST", 'localhost')
    port = os.environ.get("DB_PORT", '5432')
    database = os.environ.get("DB_NAME", 'cuhackit')

    # connect to DB
    global conn_string
    conn_string = 'postgresql://{}:{}@{}:{}/{}'.format(username, password, host, port, database)
    global connection
    connection = Postgres(conn_string)

    # init tables
    with open("../db/schema.sql") as schema:
        connection.run(schema.read())
    connection.run("INSERT INTO users (name) VALUES ('fred')")

# monday, tues, wednes at 4
def add_medicine(name, details=None):
    connection.run("INSERT INTO medicines (name) VALUES (%(name)s)", name=name)

def add_schedule(user, medicine, weekdays, time):
    sql = """
    INSERT INTO schedules (medicine, user_id, weekdays, time_taken)
        VALUES (%s, %s, %s, %s)
    """
    connection.run(sql, medicine, user, weekdays, time)

# TODO: multiple users
def username(uid):
    return connection.one("SELECT name FROM users WHERE id = %s", [uid])
