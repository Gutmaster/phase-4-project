#!/usr/bin/env python3

# Standard library imports
from dotenv import load_dotenv
load_dotenv()

# Remote library imports
from flask import Flask, render_template, request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Animal, Photograph, Location

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)


# Views go here!
@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Animals(Resource):
    def get(self):
        animals = Animal.query.all()
        return [animal.to_dict() for animal in animals], 200

class AnimalById(Resource):
    def get(self, id):
        animal = Animal.query.filter_by(id=id).first()
        if animal:
            return animal.to_dict(), 200
        else:
            return {'Error': 'Animal not found'}, 404 
    def delete(self, id):
        animal = Animal.query.filter_by(id=id).first()
        if animal:
            db.session.delete(animal)
            db.session.commit()
            return {'Message': 'Animal deleted'}, 200
        else:
            return {'Error': 'Animal not found'}, 404
        
class Locations(Resource):
    def get(self):
        locations = Location.query.all()
        return [location.to_dict() for location in locations], 200

class Photographs(Resource):
    def get(self):
        photographs = Photograph.query.all()
        return [photograph.to_dict() for photograph in photographs], 200

class PhotographById(Resource):
    def delete(self, id):
        photograph = Photograph.query.filter_by(id=id).first()
        if photograph:
            db.session.delete(photograph)
            db.session.commit()
            return {'Message': 'Photograph deleted'}, 200
        else:
            return {'Error': 'Photograph not found'}, 404

api.add_resource(Animals, '/animals')
api.add_resource(AnimalById, '/animals/<int:id>')
api.add_resource(Locations, '/locations')
api.add_resource(Photographs, '/photographs')
api.add_resource(PhotographById, '/photographs/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

