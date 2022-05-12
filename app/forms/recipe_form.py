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


class RecipeForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), recipe_exists])
    cooking_time = IntegerField('cooking_time', validators=[DataRequired()])
    servings = IntegerField("servings", validators=[DataRequired()])
    directions = StringField("directions", validators=[DataRequired()])
    cuisine = SelectField("cuisine", choices=[], validators=[DataRequired()])
    imgURL = StringField('imgURL', validators=[])
    ingredients = StringField('ingredients', validators=[DataRequired()])
    
