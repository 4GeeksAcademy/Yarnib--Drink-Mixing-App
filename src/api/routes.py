"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, ContactRequest
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash ,generate_password_hash
from datetime import datetime,timedelta
from api.favoriteService import addFavorite, getAllFavorites, deleteFromFavorites
import requests
import os

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/log-in', methods=["POST"])
def check_user_identity():
    body = request.json
    email = body.get("email")
    hashed_password = body.get("hashed_password")

    if email is None or hashed_password is None:
        raise APIException("Incomplete login data in the request", 400)

    user = User.query.filter_by(email=email).first()
    if user is None:
        raise APIException("User not found", 404)

    is_password_correct = user.check_password(hashed_password)

    if not is_password_correct:
        raise APIException("Wrong password! STAY OUT", 401)

    access_token = create_access_token(identity=user.id)

    return jsonify(
        access_token=access_token,
        user=user.serialize()
    ), 200


@api.route('/sign-up', methods=["POST"])
def user_sign_up():
    new_user_data = request.json
    name = new_user_data.get("name")
    email = new_user_data.get("email")
    age = new_user_data.get("age")
    hashed_password = new_user_data.get("hashed_password")

    if not name or not email or not hashed_password or not age:
        raise APIException("Incomplete user data in the request", 400)

    if int(age) < 10:
        return jsonify(message="You must be older than 10 years old to sign up"), 400
    elif int(age) < 21:
        return jsonify(message="You must be 21 years or older to sign up"), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        raise APIException("User with this email already exists", 400)

    new_user = User(name=name, email=email, hashed_password=hashed_password, age=age)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(message="User registered successfully"), 201

@api.route("/transfers", methods=["GET"])
@jwt_required()
def protected():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        raise APIException("No such user!, 404")
    return jsonify(logged_in_as=user.serialize()), 200


@api.route('/forgot-password', methods=["POST"])
def send_email():
    email = request.json.get('email')
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify("incorrect email")
    token = create_access_token(identity=email)
  
    try:
        response=requests.post(
            
            # need to get rid of every instance of mailgun
            f"{os.environ.get('HIDDEN_URL')}",
             auth=("api", os.environ.get('MAILGUN_KEY')),
            data={
                "from": f"Your Name <{os.environ.get('HIDDEN')}@{os.environ.get('DOMAIN')}>",
                "to": [email],
                "subject": "passwordreset",
                "text": f"Your reset token is: {token}"  # You should create a proper reset link using this token
            # do a conditional after line 107 before the return
            #use os.environment.get
            }
        )
    
        return jsonify(response.json()),response.status_code
    except Exception as error:
        print(f">>> 😣 {error}")
        return jsonify(error),400
@api.route('/request_reset', methods=['POST'])
def request_reset():
    email = request.json.get('email')
    user = User.query.filter_by(email=email).first()
  
    if user:
        token = create_access_token(identity=email)
        user.reset_token = token
        user.token_expiration = datetime.utcnow() + timedelta(hours=1)
        db.session.commit()
        
 
        send_email(user.email, 'Password Reset Request', token)

        return jsonify({'message': 'If your email is in our system, you will receive a password reset link.',"reset_url":token}) #need to get rid of "reesturl:token need to work send email function"
    return jsonify({"message":"If your email is in our system, you will receive a password reset link."}), 400
@api.route('/reset-password', methods=['POST']) 
@jwt_required()
def reset_password():
    email=get_jwt_identity()

    user = User.query.filter_by(email=email).first_or_404()
    new_password = request.json.get('password')
    user.hashed_password = generate_password_hash(new_password)
   
    user.reset_token = None
    user.token_expiration = None
    db.session.commit()
    
    return jsonify({'message': 'Password has been reset successfully.'})

@api.route('/contact-requests', methods=['POST'])
def create_contact_request():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    datatype = data.get('datatype')
    text = data.get('text')
    if not all([name, email, datatype, text]):
        return jsonify({'error': 'Missing required fields'}), 400 
    new_contact_request = ContactRequest(name=name, email=email, datatype=datatype, text=text)
    print(new_contact_request.name)
    db.session.add(new_contact_request)
    try:
        db.session.commit()
        
        return jsonify({'message': 'Contact request added successfully'}), 201  
    except Exception as e:
        db.session.rollback()
        print(e)
        return jsonify({'error': str(e)}), 500 

@api.route('/favorites', methods=['POST'])
def addToFavorites():
    data = request.get_json()
    user = data.get("userId")
    cocktail = data.get("cocktailId")
    name = data.get("name")
    url = data.get("url")
    result = addFavorite(user, cocktail, name, url)
    if result is None:
        return jsonify({'error': 'couldnt add'}), 400
    else:
        return jsonify({'result:' : 'successfully added to favorite'}), 201

@api.route('/favorites/all', methods=['POST'])
def getAllFav():
    data = request.get_json()
    user = data.get('userId')
    favs = getAllFavorites(user)
    print("returned ", favs)
    favAsJson = [e.serialize() for e in favs]
    return jsonify({'favs': favAsJson}), 200

@api.route('/favorites', methods=['DELETE'])
def removeFromFavorites():
    data = request.get_json()
    favId = data.get("favId")
    deleteFromFavorites(favId)
    return jsonify({"msg": "deleted"}), 200


