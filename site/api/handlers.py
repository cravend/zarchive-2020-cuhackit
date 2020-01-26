#!/usr/bin/env python3
import json
import api
api.init()

def not_found():
    return {
        'statusCode': 404,
        'body': json.dumps({ 'error': 'Not Found' }),
        'headers': { 'Content-Type': 'application/json' }
    }

def handle_add_medicine(event, context):
    if event['httpMethod'] != 'POST':
        # TODO: return 404
        return not_found()
    parsed = json.loads(event['body'])
    return {
        'statusCode': 200,
        'body': json.dumps({ 'id': api.add_medicine(parsed['name']) })
    }
