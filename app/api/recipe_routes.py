from random import random
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms.recipe_form import RecipeForm
from app.models import db, Recipe, IngredientsInRecipe, Ingredient, CookCount, Heart
import datetime


recipe_routes = Blueprint('recipes', __name__)


@recipe_routes.route('/')
@login_required
def get_all_recipes():
    recipes = Recipe.query.all()
    return {'recipes': [recipe.to_dict() for recipe in recipes]}

@recipe_routes.route('/add', methods=['GET', "POST"])
@login_required
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
            cuisine =  request.json["cuisine"],
            imgURL = form.data['imgURL'],
            author_id = current_user.to_dict_no_rel_user()['id'],
            created_at = datetime.datetime.now()
        )
        
        db.session.add(recipe)
        db.session.commit()
        
        for ingredient in set(request.json["ingredients"]):
            ing = IngredientsInRecipe(
                recipe_id = recipe.id,
                ing_id = ingredient,
                measurement = 1.00,
                measurement_type = 'Tbsp'
            )
            db.session.add(ing)
            db.session.commit()

        return recipe.to_dict()

    return {"error": form.errors}



@recipe_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def update_recipe(id):
    
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
        
        recipe = Recipe.query.filter(Recipe.id == id).first()
        recipe.name = form.data['name']
        recipe.cooking_time = form.data['cooking_time'],
        recipe.servings = form.data['servings'],
        recipe.directions = form.data['directions'],
        recipe.cuisine =  request.json["cuisine"],
        recipe.imgURL = form.data['imgURL'],
        
        db.session.add(recipe)
        db.session.commit()
        
        
        #TRICKY
        #I will have to grab all ingredients indvidiually check the db for their existence and if they do, i dont do anything, else, i add. actually this doesnt sound too bad at all
        ings = IngredientsInRecipe.query.filter(IngredientsInRecipe.recipe_id == recipe.id).all()
        
        for individualIng in ings:
            db.session.delete(individualIng)
            db.session.commit()
        for ingredient in set(request.json["ingredients"]):
            # ing = IngredientsInRecipe.query.filter(IngredientsInRecipe.recipe_id == recipe.id, IngredientsInRecipe.ing_id == ingredient).first()
            # if ing == None :
            #     ing2 = IngredientsInRecipe(
            #         recipe_id = recipe.id,
            #         ing_id = ingredient,
            #         measurement = 1.00,
            #         measurement_type = 'Tbsp'
            #     )
            #     db.session.add(ing2)
            #     db.session.commit()
            ing2 = IngredientsInRecipe(
                    recipe_id = recipe.id,
                    ing_id = ingredient,
                    measurement = 1.00,
                    measurement_type = 'Tbsp'
                )
            db.session.add(ing2)
            db.session.commit()    
                
        return recipe.to_dict()

    return {"error": form.errors}


@recipe_routes.route('/<int:id>/delete', methods=['GET'])
@login_required
def delete_comment(id):
    
    recipe = Recipe.query.filter(Recipe.id == id).one()
    deletedRecord = recipe.to_dict()
    db.session.delete(recipe)
    db.session.commit()

    return deletedRecord


###################### COOKED COUNT ROUTES####################################

@recipe_routes.route('/<int:id>/cooked')
@login_required
def getAllCC(id):
    cooked_count = CookCount.query.filter(CookCount.recipe_id == id).count()
    return {'cook_count': cooked_count }

@recipe_routes.route('/<int:id>/cooked/add')
@login_required
def addACC(id):
    add = CookCount(
        recipe_id = id,
        user_id = current_user.to_dict_no_rel_user()['id'],
    )
    db.session.add(add)
    db.session.commit()
    cooked_count = CookCount.query.filter(CookCount.recipe_id == id).count()
    return {'cook_count': cooked_count }

@recipe_routes.route('/<int:id>/cooked/delete')
@login_required
def removeACC(id):
    deletes = CookCount.query.filter(CookCount.recipe_id == id, CookCount.user_id == current_user.to_dict_no_rel_user()['id']).all()
    deleteRecord = deletes[0]
    for cc in deletes:
            db.session.delete(cc)
            db.session.commit()
    cooked_count = CookCount.query.filter(CookCount.recipe_id == id).count()
    return {'cook_count': cooked_count }

##############################################################################

@recipe_routes.route('/<int:id>/hearts')
@login_required
def getAllHearts(id):
    hearts = Heart.query.filter(Heart.recipe_id == id).all()
    acc = 0
    for heart in hearts:
        acc += int(heart.heart_num)
    if acc == 0:
        return {'heart_avg' : 0}
    else:     
        return {'heart_avg': round(acc / len(hearts), 2) }
    
@recipe_routes.route('/<int:id>/hearts/my')
@login_required
def getMyHearts(id):
    update = Heart.query.filter(Heart.recipe_id == id, Heart.user_id == current_user.to_dict_no_rel_user()['id']).first()
    if update :
        return {'my_hearts': update.to_dict_heart() }
    else:
        return 'none Found!'

@recipe_routes.route('/<int:id>/hearts/add', methods=['POST'])
@login_required
def addHearts(id):
    ## need to send some values thru POST request body and extract and update below
    num = request.json["heart_num"]
    add = Heart(
        heart_num = num,
        recipe_id = id,
        user_id = current_user.to_dict_no_rel_user()['id'],
    )
    db.session.add(add)
    db.session.commit()
    hearts = Heart.query.filter(Heart.recipe_id == id).all()
    acc = 0
    for heart in hearts:
        acc += int(heart.heart_num)
    if acc == 0:
        return {'heart_avg' : 0}
    else:     
        return {'heart_avg': round(acc / len(hearts), 2) }

@recipe_routes.route('/<int:id>/hearts/update', methods=['PUT'])
@login_required
def updateHearts(id):
    update = Heart.query.filter(Heart.recipe_id == id, Heart.user_id == current_user.to_dict_no_rel_user()['id']).first()
    
    ## need to send some values thru POST request body and extract and update below
    num = request.json["heart_num"]
    update.heart_num = num
    db.session.add(update)
    db.session.commit()
    hearts = Heart.query.filter(Heart.recipe_id == id).all()
    acc = 0
    for heart in hearts:
        acc += int(heart.heart_num)
    if acc == 0:
        return {'heart_avg' : 0}
    else:     
        return {'heart_avg': round(acc / len(hearts), 2) }