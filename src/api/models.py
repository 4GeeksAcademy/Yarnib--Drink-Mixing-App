from flask_sqlalchemy import SQLAlchemy
from api.utils import APIException
from base64 import b64encode
import os
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    hashed_password = db.Column(db.String(240), unique=False, nullable=False)
    salt = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name
        }

    def __init__(self, name, hashed_password, email):
        already_exists = User.query.filter_by(name=name).one_or_none()
        if already_exists is not None:
            raise APIException("User already exists", 400)
        self.salt = b64encode(os.urandom(32)).decode("utf-8")
        self.hashed_password = generate_password_hash(hashed_password + self.salt)
        self.name = name
        self.email = email
        db.session.add(self)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise APIException(str(e), 500)
        
    def check_password(self, password_to_check):
        return check_password_hash(self.hashed_password, f"{password_to_check}{self.salt}")

class Cocktail(db.Model):
    __tablename__ = "cocktail"
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    recipe = db.Column(db.Text, nullable=False)
    instructions = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f'<Cocktail {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "recipe": self.recipe,
            "name": self.name,
            "instructions": self.instructions
        }


Favorites = db.Table('favorites',
    db.Column("user_id", db.Integer, db.ForeignKey("user.id"), primary_key=True),
    db.Column("cocktail_id", db.Integer, db.ForeignKey("cocktail.id"), primary_key=True)
)
