from .db import db
from sqlalchemy import ForeignKey
import datetime

class Recipe(db.Model):
    __tablename__= 'recipes'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    cooking_time = db.Column(db.Integer, nullable=False)
    servings = db.Column(db.Integer, nullable=False)
    directions = db.Column(db.String(10000), nullable=False)
    cuisine = db.Column(db.String(50), nullable=False)
    imgURL = db.Column(db.String(2000))
    author_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    created_at = db.Column('created_at', db.DateTime, default=datetime.datetime.now, nullable=False)
    
    recipe = db.relationship('IngredientsInRecipe', back_populates='ingredients', cascade="all, delete")
    
    recipe_owner = db.relationship('User', back_populates='recipes')
    comments = db.relationship('Comment', back_populates='recipe', cascade="all, delete")
    
    def to_dict(self):
        return {
            'id' : self.id,
            'name' : self.name,
            'cooking_time' : self.cooking_time,
            'servings' : self.servings,
            'directions' : self.directions,
            'cuisine' : self.cuisine,
            'imgURL' : self.imgURL,
            'author_id' : self.author_id,
            'created_at' : self.created_at,
            'ingredients' : [ingredient.to_dict() for ingredient in self.recipe],
            # 'recipe_owner' : self.recipe_owner.to_dict_no_rel_user(),
            # 'comments' : [comment.to_dict_no_recipe() for comment in self.comments]
        }

    def to_dict_no_rel(self):
        return {
            'name' : self.name,
            'cooking_time' : self.cooking_time,
            'servings' : self.servings,
            'directions' : self.directions,
            'cuisine' : self.cuisine,
            'imgURL' : self.imgURL,
            'author_id' : self.author_id,
            'created_at' : self.created_at,
        }