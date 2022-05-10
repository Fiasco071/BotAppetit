from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Recipe

recipe_routes = Blueprint('recipes', __name__)


@recipe_routes.route('/')
# @login_required
def get_all_recipes():
    recipes = Recipe.query.all()
    return {'recipes': [recipe.to_dict() for recipe in recipes]}

