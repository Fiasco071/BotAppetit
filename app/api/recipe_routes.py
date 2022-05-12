from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms.recipe_form import RecipeForm
from app.models import db, Recipe, IngredientsInRecipe, Ingredient
import datetime


recipe_routes = Blueprint('recipes', __name__)


@recipe_routes.route('/')
# @login_required
def get_all_recipes():
    recipes = Recipe.query.all()
    return {'recipes': [recipe.to_dict() for recipe in recipes]}

@recipe_routes.route('/add', methods=['GET', "POST"])
# @login_required
def add_recipe():
    
    form = RecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.ingredients.choices = [(ingredient.id, ingredient.name) for ingredient in Ingredient.query.all()]
    form.cuisine.choices = [('Italian', 'Italian'),
        ('Thai','Thai'),
        ('French','French'),
        ('Japanese','Japanese'),
        ('Lebanese','Lebanese'),
        ('Spanish','Spanish'),
        ('German','German'),
        ('Korean','Korean'),
        ('South African','South African'),
        ('Australian','Australian'),
        ('Caribbean','Caribbean'),
        ('Greek','Greek'),
        ('Filipino','Filipino'),
        ('Scottish','Scottish'),
        ('Indian','Indian'),
        ('Mexican','Mexican'),
        ('Indonesian','Indonesian'),
        ('Brazilian','Brazilian'),
        ('Chinese','Chinese'),
        ('American','American')]
    if form.validate_on_submit():
        
        recipe = Recipe(
            name = form.data['name'],
            cooking_time = form.data['cooking_time'],
            servings = form.data['servings'],
            directions = form.data['directions'],
            cuisine = form.data['cuisine'],
            imgURL = form.data['imgURL'],
            author_id = current_user.to_dict_no_rel_user()['id'],
            created_at = datetime.datetime.now()
        )
        
        ##### HERE Is where it gets tricky, make sure to create one in ing recipe table as well to save all the ingredients
        ## may have to loop through however long the array is to create multiple logs
        
        ## for now, we will go with just one.
        db.session.add(recipe)
        db.session.commit()
        
        ###LOOP THIS PORTION
        ingredient = IngredientsInRecipe(
            recipe_id = recipe.id,
            ing_id = form.data['ingredients'],
            measurement = 1.00,
            measurement_type = 'Tbsp'
        )
        
        db.session.add(ingredient)
        #######################
        
        db.session.commit()

        return recipe.to_dict()

    return {"error": form.errors}