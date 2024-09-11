from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db


# Models go here!
class Animal(db.Model, SerializerMixin):
    __tablename__ = 'animals'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    
    photographs = db.relationship('Photograph', back_populates='animal')

    serialize_rules = ('-photographs.animal',)


class Photograph(db.Model, SerializerMixin):
    __tablename__ = 'photographs'

    id = db.Column(db.Integer, primary_key=True)
    datetime = db.Column(db.String)
    image = db.Column(db.String)

    animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'))
    animal = db.relationship('Animal', back_populates='photographs', cascade='delete')

    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'))
    location = db.relationship('Location', back_populates='photographs', cascade='delete')

    serialize_rules = ('-animal.photographs, -location.photographs')


class Location(db.Model, SerializerMixin):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)

    photographs = db.relationship('Photograph', back_populates='location')

    serialize_rules = ('-photographs.location',)
