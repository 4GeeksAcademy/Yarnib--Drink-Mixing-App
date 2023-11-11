from .models import db, User, Favorites
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException


def addFavorite(userId, cocktailId, drinkName, url):
    print("addFavorite was called")
    print("userId is ", userId)
    print("cocktail is ", cocktailId)
    print("url ", url)

    favToSave = Favorites(user_id=userId, cocktail_id=cocktailId, name=drinkName, img=url)
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

def deleteFromFavorites(userId, drinkId):
    print("removing from favorites for user ", drinkId)
    obj = Favorites.query.filter_by(cocktail_id=drinkId, user_id=userId).first()
    db.session.delete(obj)
    db.session.commit()    
    return True