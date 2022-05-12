from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import Recipe, Ingredient


def recipe_exists(form, field):
    # Checking if user exists
    name = field.data
    recipe = Recipe.query.filter(Recipe.name == name).first()
    if recipe:
        raise ValidationError('Recipe exists already!')

def dropdown_ingredients():
    # return [(ingredient.to_dict_no_rel().id, ingredient.to_dict_no_rel().name) for ingredient in Ingredient.query.all()]
    ingredients = Ingredient.query.all()
    return [(ingredient.id, ingredient.name) for ingredient in Ingredient.query.all()]




class RecipeForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), recipe_exists])
    cooking_time = IntegerField('cooking_time', validators=[DataRequired()])
    servings = IntegerField("servings", validators=[DataRequired()])
    directions = StringField("directions", validators=[DataRequired()])
    cuisine = SelectField("cuisine", choices=[], validators=[DataRequired()])
    imgURL = StringField('imgURL', validators=[DataRequired()])
    ingredients = SelectField('ingredients', choices=[], validators=[DataRequired()])