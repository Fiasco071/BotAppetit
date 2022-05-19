import email
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')
    
def email_format_is_valid(form, field):
    email = field.data
    pattern='^[a-z 0-9]+[\._]?[a-z 0-9]+[@]\w+[.]\w{2,3}$'
    if re.search(pattern , email):
        None
    else:
        raise ValidationError('Email is not in a valid format.')
    
def invalid_email_s(form, field):
    email = field.data
    if len(email) < 6:
        raise ValidationError('Email needs 6 characters at least.')
    
def invalid_email_l(form, field):
    email = field.data
    if len(email) > 255:
        raise ValidationError('Email is too long (less than 250 characters).')
    
def invalid_password_length_s(form, field):
    password = field.data
    if len(password) < 6:
        raise ValidationError('Password needs 6 characters at least.')
    
def invalid_password_length_l(form, field):
    password = field.data
    if len(password) >= 250:
        raise ValidationError('Password is too long (less than 250 characters).')    
    
def invalid_username_length_l(form, field):
    username = field.data
    if len(username) > 40:
        raise ValidationError('User name is too long (less than 40 characters).')
    
def invalid_username_length_s(form, field):
    username = field.data
    if len(username) > 40:
        raise ValidationError('User name needs 6 characters at least.')
    
    

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, invalid_username_length_l, invalid_username_length_s])
    email = StringField('email', validators=[DataRequired(), user_exists, email_format_is_valid, invalid_email_s ,invalid_email_l])
    password = StringField('password', validators=[DataRequired(), invalid_password_length_s,invalid_password_length_l])
