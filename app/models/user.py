from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    #"asian, american, etc..."
    cuisine_pref = db.Column(db.String(20))
    #"beginner", "intermediate", "professional"
    cook_proficiency = db.Column(db.String(20))
    
    comments = db.relationship('Comment', back_populates='comment_owner')
    recipes = db.relationship('Recipe', back_populates='recipe_owner')
    

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'cuisine_pref': self.cuisine_pref,
            'cook_proficiency' : self.cook_proficiency,
            'recipes' : [recipe.to_dict_no_rel() for recipe in self.recipes]
        }
        
    def to_dict_no_rel_user(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'cuisine_pref': self.cuisine_pref,
            'cook_proficiency' : self.cook_proficiency,
        }
