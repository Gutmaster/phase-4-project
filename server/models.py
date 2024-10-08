from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

from config import db


# Models go here!
class Animal(db.Model, SerializerMixin):
    __tablename__ = 'animals'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    description = db.Column(db.String)

    photographs = db.relationship('Photograph', back_populates='animal')

    # Adding association proxy to access locations directly from animals
    locations = association_proxy('photographs', 'location')

    serialize_rules = ('-photographs.animal',)

    @validates('name')
    def validate_name(self, key, value):
        if not value:
            raise ValueError('Name cannot be empty.')
        return value

    @validates('description')
    def validate_description(self, key, value):
        if type(value) != str:
            raise ValueError('Description must be string.')
        elif len(value) > 200:
            raise ValueError('Description must be 200 characters or less.')
        return value

class Photograph(db.Model, SerializerMixin):
    __tablename__ = 'photographs'

    id = db.Column(db.Integer, primary_key=True)
    datetime = db.Column(db.String)
    image = db.Column(db.String)

    animal_id = db.Column(db.Integer, db.ForeignKey('animals.id'))
    animal = db.relationship('Animal', back_populates='photographs')

    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'))
    location = db.relationship('Location', back_populates='photographs')

    serialize_rules = ('-animal.photographs', '-location.photographs')

    @validates('image')
    def validate_image(self, key, value):
        if not value:
            raise ValueError('Photograph must include a linked image.')
        return value


class Location(db.Model, SerializerMixin):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    description = db.Column(db.String)

    photographs = db.relationship('Photograph', back_populates='location')

    # Adding association proxy to access animals directly from locations
    animals = association_proxy('photographs', 'animal')
    
    serialize_rules = ('-photographs.location',)

    @validates('name')
    def validate_name(self, key, value):
        if not value:
            raise ValueError('Name cannot be empty.')
        return value

    @validates('description')
    def validate_description(self, key, value):
        if type(value) != str:
            raise ValueError('Description must be string.')
        elif len(value) > 200:
            raise ValueError('Description must be 200 characters or less.')
        return value