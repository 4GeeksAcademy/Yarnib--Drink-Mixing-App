from .models import db, User, Favorites
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException


def addFavorite(userId, cocktailId, name):
    print("addFavorite was called")
    print("userId is ", userId)
    print("cocktail is ", cocktailId)

    favToSave = Favorites(user_id=userId, cocktail_id=cocktailId, name=name)
    print("Object is ", favToSave)
    db.session.add(favToSave)
    db.session.commit()
    db.session.refresh(favToSave)
    print("added successfully", favToSave)
    return favToSave

def getAllFavorites(user):
    print("getting all favorites for user ", user)
    favs = db.session().query(Favorites).filter(Favorites.user_id == user).all()
    print("result ", favs)
    return favs

def removeFromFavorites(userId, favId):
    print("removing from favorites for user ", userId)
    obj = Favorites.query.filter_by(id=favId).one()
    db.session.delete(obj)
    db.session.commit()    
