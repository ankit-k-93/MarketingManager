from flask import Flask, render_template
from flask_restful import Resource, Api, request

app = Flask(__name__)
api = Api(app)


@app.route('/')
def index():
    return render_template('index.html', name="ankit")


class SimpleApi(Resource):
    def get(self):
        return {"message": "successful GET api"}


class SimplePostApi(Resource):
    def post(self, id):
        query_params = dict(request.args)
        print(query_params)
        return {"message": "successful POST api with id : {}".format(id)}


api.add_resource(SimpleApi, '/api/simple-api')

api.add_resource(SimplePostApi, '/api/simple-post-api/<int:id>')

if __name__=='__main__':
    app.run(host='0.0.0.0', port=4000)
