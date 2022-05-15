from sqlalchemy import ForeignKey
from .db import db
import simplejson as json
from decimal import Decimal

class IngredientsInRecipe(db.Model):
    __tablename__= 'ingredientsInRecipes'

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, ForeignKey('recipes.id'), nullable=False)
    ing_id = db.Column(db.Integer, ForeignKey('ingredients.id'), nullable=False)
    measurement = db.Column('measurement', db.Numeric(precision=5, scale=2), nullable=False)
    measurement_type = db.Column('measurement_type', db.String(20), nullable=False)
    
    ingredients = db.relationship('Recipe', back_populates='recipe')
    
    ingdata = db.relationship('Ingredient', back_populates='ing_in_recipe')
    

    def to_dict(self):
        return {
            'id' : self.id,
            'recipe_id' : self.recipe_id,
            'ing_id' : self.ing_id,
            'ingdata' : self.ingdata.to_dict_no_rel(),
            'measurement' : json.dumps(Decimal(self.measurement), use_decimal=True),
            'measurement_type' : self.measurement_type,
            
        }
    