#!/usr/bin/env python3

import api
import json
from psycopg2.errors import UniqueViolation

FRED = 1

api.init()
#print(api.conn_string)
assert(api.username(FRED) == "fred")

atorvastatin = api.add_medicine("atorvastatin")
tretonin = api.add_medicine("tretonin")

try:
    api.add_schedule(FRED, atorvastatin, 'MWF', '10:00')
    api.add_schedule(FRED, tretonin, 'MTWRF', '22:00')
    api.add_taken(FRED, atorvastatin, '2020-01-25 21:27:00')
except UniqueViolation:
    pass

print(json.dumps(api.notifications_for_week(FRED, '2020-01-25')))
