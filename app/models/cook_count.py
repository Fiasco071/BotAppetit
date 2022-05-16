from sqlalchemy import ForeignKey
from .db import db


class CookCount(db.Model):
    __tablename__= 'cookCounts'

    id = db.Column(db.Integer, primary_key=True)
    tried_dish = db.Column(db.Boolean, server_default='t', default=True, nullable=False)
    recipe_id = db.Column(db.Integer, ForeignKey('recipes.id'), nullable=False)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    
    ## CookCount -> User Relations
    cook_count_u = db.relationship('User', back_populates='user_cc')
    ## CookCount -> Recipe Relations
    cook_count_r = db.relationship('Recipe', back_populates='recipe_cc')
    

    def to_dict_cc(self):
        return {
            'id' : self.id,
            'tried_dish' : self.tried_dish,
            'recipe_id' : self.recipe_id,
            'user_id' : self.user_id,  
        }
    