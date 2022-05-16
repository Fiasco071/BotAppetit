from sqlalchemy import ForeignKey
from .db import db


class Heart(db.Model):
    __tablename__= 'hearts'

    id = db.Column(db.Integer, primary_key=True)
    heart_num = db.Column(db.Integer, nullable=False)
    recipe_id = db.Column(db.Integer, ForeignKey('recipes.id'), nullable=False)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    
    ## CookCount -> User Relations
    heart_u = db.relationship('User', back_populates='user_hearts')
    ## CookCount -> Recipe Relations
    heart_r = db.relationship('Recipe', back_populates='recipe_hearts')
    

    def to_dict_heart(self):
        return {
            'id' : self.id,
            'heart_num' : self.heart_num,
            'recipe_id' : self.recipe_id,
            'user_id' : self.user_id,  
        }
    