from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db


# Models go here!
class Specie(db.Model, SerializerMixin):
    __tablename__ = 'species'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    
    sightings = db.relationship('Sighting', back_populates='specie')

    serialize_rules = ('-sightings.specie',)


class Sighting(db.Model, SerializerMixin):
    __tablename__ = 'sightings'

    id = db.Column(db.Integer, primary_key=True)
    datetime = db.Column(db.String)
    image = db.Column(db.String)

    species_id = db.Column(db.Integer, db.ForeignKey('species.id'))
    specie = db.relationship('Specie', back_populates='sightings', cascade='delete')

    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'))
    location = db.relationship('Location', back_populates='sightings', cascade='delete')

    serialize_rules = ('-species.sightings, -location.sightings')


class Location(db.Model, SerializerMixin):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)

    sightings = db.relationship('Sighting', back_populates='location')

    serialize_rules = ('-sightings.location',)
