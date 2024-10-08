#!/usr/bin/env python3

# Standard library imports
from datetime import datetime
from dotenv import load_dotenv

# Remote library imports
from flask import Flask, render_template, request
from flask_restful import Resource
from flask import make_response

# Local imports
from config import app, db, api
# Add your model imports
from models import Animal, Photograph, Location

load_dotenv()

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
        animal_dicts = []
        for animal in animals:
            animal_dict = animal.to_dict()
            animal_dict['locations'] = [location.name for location in animal.locations]
            animal_dicts.append(animal_dict)
        return make_response(animal_dicts, 200)

class AnimalById(Resource):
    def get(self, id):
        animal = Animal.query.filter_by(id=id).first()
        if animal:
            return animal.to_dict(), 200
        else:
            return {'Error': 'Animal not found'}, 404 
    
    def patch(self, id):
        print("PATCHING", id, request.json.get('description'))
        animal = Animal.query.filter_by(id=id).first()
        if animal:
            animal.name = request.json.get('name')
            animal.description = request.json.get('description')
            db.session.commit()
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
        location_dicts = []
        for location in locations:
            location_dict = location.to_dict()
            location_dict['animals'] = [animal.name for animal in location.animals]
            location_dicts.append(location_dict)
        return make_response(location_dicts, 200)

class LocationById(Resource):
    def patch(self, id):
        location = Location.query.filter_by(id=id).first()
        if location:
            location.name = request.json.get('name')
            location.description = request.json.get('description')
            db.session.commit()
            return location.to_dict(), 200
        else:
            return {'Error': 'Location not found'}, 404

class Photographs(Resource):
    def get(self):
        photographs = Photograph.query.all()
        return [photograph.to_dict() for photograph in photographs], 200
    
    def post(self):
        data = request.json

        dt = datetime.now()
        dt_formatted = f"{dt.day}/{dt.month}/{dt.year} {dt.hour}:{dt.minute:02d}"

        animal = Animal.query.filter_by(name=data.get('animal_name')).first()
        if not animal:
            try:
                animal = Animal(name = data.get('animal_name'))
            except ValueError:
                return {'error creating new animal': ['validation errors']}, 400
            db.session.add(animal)
        
        location = Location.query.filter_by(name=data.get('location_name')).first()
        if not location:
            try:
                location = Location(name = data.get('location_name'))
            except ValueError:
                return {'error creating new location': ['validation errors']}, 400
            db.session.add(location)

        photograph = Photograph(datetime = dt_formatted, animal = animal, location = location, image = data.get('image'))
        db.session.add(photograph)
        db.session.commit()
        return photograph.to_dict(), 201

class PhotographById(Resource):
    def patch(self, id):
        photograph = Photograph.query.filter_by(id=id).first()
        if photograph:
            photograph.animal_id = request.json.get('animal_id')
            photograph.location_id = request.json.get('location_id')
            db.session.commit()
            return photograph.to_dict(), 200
        else:
            return {'Error': 'Photograph not found'}, 404
            
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
api.add_resource(LocationById, '/locations/<int:id>')
api.add_resource(Photographs, '/photographs')
api.add_resource(PhotographById, '/photographs/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

