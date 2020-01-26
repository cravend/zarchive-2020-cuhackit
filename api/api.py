import os
from postgres import Postgres
from psycopg2.errors import UniqueViolation

conn_string = None
connection = None

# monday - sunday
DAYS = 'MTWRFSU'

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
    try:
        return connection.one("INSERT INTO medicines (name) VALUES (%(name)s) RETURNING id", name=name)
    except UniqueViolation:
        return connection.one(
                "SELECT id FROM medicines WHERE name = %(name)s",
                name=name)

def add_schedule(user, medicine, weekdays, time):
    sql = """
    INSERT INTO schedules (user_id, medicine, weekdays, time_taken)
        VALUES (%s, %s, %s, %s)
    RETURNING id
    """
    return connection.one(sql, (user, medicine, weekdays, time))

def add_taken(user, medicine, time):
    sql = """
    INSERT INTO taken (user_id, medicine, datetime)
    VALUES (%s, %s, %s)
    RETURNING id
    """
    return connection.one(sql, (user, medicine, time))

"""
{
    'mon': {
        'atorvastatin': { taken: true, time: '22:00' },
        'tretonin': { taken: false, time: '7:00' },
    }
}
NOTE: for a week that looks like this:
```
M: 21, T: 22, W: 23, ...
```
When called with a start date of Wednesday,
will return the 23rd - 29th, NOT 21st - 27th
"""
def notifications_for_week(user, start_day):
    """Algorithm: if a `taken` entry appears for a `(user, day, medicine)`
    node, then it has been taken. Otherwise, it has not been taken.
    """
    # normalize start_day to include time
    if ' ' not in start_day:
        start_day += ' 00:00:00'

    sql = """
    SELECT medicines.name, schedules.medicine, schedules.weekdays, schedules.time_taken
    FROM schedules INNER JOIN medicines ON medicines.id = schedules.medicine
    WHERE user_id =  %(user)s
    """
    medicines = connection.all(sql, user=user)
    d = []
    for i in range(len(DAYS)):
        d.append({})
    for med_name, med_id, med_days, med_time in medicines:
        sql = """
        WITH taken_meds AS (
            SELECT date_trunc('day', taken.datetime) as day
            FROM taken
            WHERE user_id = %s AND medicine = %s
        )
        SELECT
            -- day 1
            (SELECT count(*) FROM taken_meds WHERE day = %s) AS one,
            -- day 2
            (SELECT count(*) FROM taken_meds WHERE day = date_trunc('day', %s::timestamp + interval '2' day)) AS two,
            -- day 3
            (SELECT count(*) FROM taken_meds WHERE day = %s::timestamp + interval '3' day) AS three,
            -- day 4
            (SELECT count(*) FROM taken_meds WHERE day = %s::timestamp + interval '4' day) AS four,
            -- day 5
            (SELECT count(*) FROM taken_meds WHERE day = %s::timestamp + interval '5' day) AS five,
            -- day 6
            (SELECT count(*) FROM taken_meds WHERE day = %s::timestamp + interval '6' day) AS six,
            -- day 7
            (SELECT count(*) FROM taken_meds WHERE day = %s::timestamp + interval '7' day) as seven
        """
        taken = connection.one(sql, (user, med_id) + (start_day,)*7)
        for i, day in enumerate(DAYS):
            if day in med_days:
                d[i][med_name] = [
                    bool(taken[i]),
                    str(med_time)[:5],
                ]
    return d

# TODO: multiple users
def username(uid):
    return connection.one("SELECT name FROM users WHERE id = %s", [uid])
