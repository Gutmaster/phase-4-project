#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Specie, Sighting, Location

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Species(Resource):
    def get(self):
        species = Specie.query.all()
        return [{'ID': specie.id,
                 'Name': specie.name} for specie in species], 200

class SpecieById(Resource):
    def get(self, id):
        specie = Specie.query.filter_by(id=id).first()
        if specie:
            return {'ID': specie.id,
                    'Name': specie.name}, 200
        else:
            return {'Error': 'Specie not found'}, 404 
    def delete(self, id):
        specie = Specie.query.filter_by(id=id).first()
        if specie:
            db.session.delete(specie)
            db.session.commit()
            return {'Message': 'Specie deleted'}, 200
        else:
            return {'Error': 'Specie not found'}, 404
        
class Sightings(Resource):
    def get(self):
        sightings = Sighting.query.all()
        return [{'Specie': sighting.specie.name,
                 'Location': sighting.location.name,
                 'DateTime': sighting.datetime} for sighting in sightings], 200

api.add_resource(Species, '/species')
api.add_resource(SpecieById, '/species/<int:id>')
api.add_resource(Sightings, '/sightings')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

