from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db


# Models go here!
class Species(db.Model, SerializerMixin):
    __tablename__ = 'species'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)

    sightings = db.relationship('Sighting', back_populates='species')

    serialize_rules = ('-sightings.species',)


class Sighting(db.Model, SerializerMixin):
    __tablename__ = 'sightings'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime)

    species_id = db.Column(db.Integer, db.ForeignKey('species.id'), nullable=False)
    species = db.relationship('Species', back_populates='sightings', cascade='delete')

    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'), nullable=False)
    location = db.relationship('Location', back_populates='sightings', cascade='delete')

    serialize_rules = ('-species.sightings, -location.sightings')


class Location(db.Model, SerializerMixin):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)

    sightings = db.relationship('Sighting', back_populates='location')

    serialize_rules = ('-sightings.location',)