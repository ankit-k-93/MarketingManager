import requests

DB = {
    "USERS": requests.get('http://jsonplaceholder.typicode.com/users').json(),
    "TEMPLATES": {
    }
}

