from .db import db

class Ingredient(db.Model):
    __tablename__= 'ingredients'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    ing_type = db.Column(db.String(50), nullable=False)
    
    ing_in_recipe = db.relationship('IngredientsInRecipe', back_populates='ingdata')
    
    
    def to_dict_no_rel(self):
        return {
            'id' : self.id,
            'name' : self.name,
            'ing_type' : self.ing_type
        }
    