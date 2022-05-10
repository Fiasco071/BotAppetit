from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Ingredient

ing_routes = Blueprint('ingredients', __name__)


@ing_routes.route('/')
# @login_required
def get_all_ingredients():
    ingredients = Ingredient.query.all()
    return {'ingredients': [ingredient.to_dict_no_rel() for ingredient in ingredients]}

