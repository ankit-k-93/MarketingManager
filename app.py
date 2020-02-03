from flask import Flask, render_template, jsonify, Response
from flask_restful import Resource, Api, request
from MarketingManager.models.dummy_models import DB

# importing users data
USERS = DB.get('USERS')

app = Flask(__name__)
api = Api(app)


@app.route('/')
def index():
    return render_template('index.html', name="ankit")


class AllUsers(Resource):
    def get(self):
        return USERS


class User(Resource):
    def get(self, id):

        for user in USERS:
            if user.get('id') == id:

                return jsonify(user)

        return {"message": "No such user found"}, 404


api.add_resource(AllUsers, '/api/user')
api.add_resource(User, '/api/user/<int:id>')


if __name__=='__main__':
    app.run(host='0.0.0.0', port=4000)
