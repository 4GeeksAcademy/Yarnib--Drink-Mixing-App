"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint

from api.models import db, User, ContactRequests
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash



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


@api.route('/sign-up', methods=["POST", "GET"])
def user_sign_up():
    new_user_data = request.json
    name = new_user_data.get("name")
    email = new_user_data.get("email")
    hashed_password = new_user_data.get("hashed_password")

    if not name or not email or not hashed_password:
        raise APIException("Incomplete user data in the request", 400)

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        raise APIException("User with this email already exists", 400)

    new_user = User(name=name, email=email, hashed_password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(message="User registered successfully"), 201

@api.route('/contact_requests', methods=['POST'])
def create_contact_request():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    datatype = data.get('datatype')
    text = data.get('text')
    if not all([name, email, datatype, text]):
        return jsonify({'error': 'Missing required fields'}), 400 
    new_contact_request = ContactRequests(name=name, email=email, datatype=datatype, text=text)
    print(new_contact_request.name)
    db.session.add(new_contact_request)
    try:
        db.session.commit()
        
        return jsonify({'message': 'Contact request added successfully'}), 201  
    except Exception as e:
        db.session.rollback()
        print(e)
        return jsonify({'error': str(e)}), 500 
        

