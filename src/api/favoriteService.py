from .models import db, User, Favorites
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException


def addFavorite(userId, cocktailId):
    print("addFavorite was called")
    print("userId is ", userId)
    print("cocktail is ", cocktailId)

    favToSave = Favorites(user_id=userId, cocktail_id=cocktailId)
    print("Object is ", favToSave)
    obj = db.session.add(favToSave)
    db.session.commit()
    print("added successfully", obj)

def getAllFavorites(userId):
    print("getting all favorites for user ", userId)
    favs = Favorites.query.filter_by(user_id=userId).all()
    if favs is None:
        print("No favorites")
    print(favs)
    return favs

def removeFromFavorites(userId, favId):
    print("removing from favorites for user ", userId)
    obj = Favorites.query.filter_by(id=favId).one()
    session.delete(obj)
    session.commit()    
