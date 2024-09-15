#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Animal, Photograph, Location

# Views go here!

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

api.add_resource(Animals, '/animals')
api.add_resource(AnimalById, '/animals/<int:id>')
api.add_resource(Locations, '/locations')
api.add_resource(Photographs, '/photographs')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

