from .db import db
from sqlalchemy import ForeignKey
import datetime

class Comment(db.Model):
    __tablename__= 'comments'
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(250), nullable=False)
    recipe_id = db.Column(db.Integer, ForeignKey('recipes.id'), nullable=False)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    created_at = db.Column('created_at', db.DateTime, default=datetime.datetime.now, nullable=False)
    
    
    comment_owner = db.relationship('User', back_populates='comments')
    recipe = db.relationship('Recipe', back_populates='comments')
    
    def to_dict_no_recipe(self):
        return {
            'id' : self.id,
            'content' : self.content,
            'recipe_id' : self.recipe_id,
            'user_id' :self.user_id,
            'created_at' : self.created_at,
            'comment_owner' : self.comment_owner
        }
    