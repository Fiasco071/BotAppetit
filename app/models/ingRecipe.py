from sqlalchemy import ForeignKey

from app.seeds import ingredients
from .db import db


class IngredientsInRecipe(db.Model):
    __tablename__= 'IngredientsInRecipe'

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, ForeignKey('recipes.id'), primary_key=True)
    ing_id = db.Column(db.Integer, ForeignKey('ingredients.id'), primary_key=True)
    measurement = db.Column('measurement', db.Numeric(precision=5, scale=2), nullable=False)
    measurement_type = db.Column('measurement_type', db.String(20), nullable=False)
    
    ingredients = db.relationship('Recipe', back_populates='recipe')
    
    ingdata = db.relationship('Ingredient', back_populates='ing_in_recipe')