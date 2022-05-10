from unicodedata import name
from .db import db
from sqlalchemy import ForeignKey
import datetime

class Recipe(db.Model):
    __tablename__= 'recipes'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    cooking_time = db.Column(db.Integer, nullable=False)
    prep_time = db.Column(db.Integer, nullable=False)
    servings = db.Column(db.Integer, nullable=False)
    directions = db.Column(db.String(2000), nullable=False)
    author_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    created_at = db.Column('created_at', db.DateTime, default=datetime.datetime.now, nullable=False)
    
    recipe = db.relationship('IngredientsInRecipe', back_populates='ingredients')
    
    recipe_owner = db.relationship('User', back_populates='recipes')
    comments = db.relationship('Comment', back_populates='recipe')
    
    def to_dict(self):
        return {
            'id' : self.id,
            'name' : self.name,
            'cooking_time' : self.cooking_time,
            'prep_time' :self.prep_time,
            'servings' : self.servings,
            'directions' : self.directions,
            'author_id' : self.author_id,
            'created_at' : self.created_at,
            'ingredients' : [ingredient for ingredient in self.ingredients],
            'recipe_owner' : self.recipe_owner,
            'comments' : [comment.to_dict_no_recipe() for comment in self.comments]
        }

    def to_dict_no_rel(self):
        return {
            'name' : self.name,
            'cooking_time' : self.cooking_time,
            'prep_time' :self.prep_time,
            'servings' : self.servings,
            'directions' : self.directions,
            'author_id' : self.author_id,
            'created_at' : self.created_at,
        }