from flask_wtf import FlaskForm
from wtforms import TextField
from wtforms.validators import DataRequired, ValidationError

def invalid_amount(form, field):
    content = field.data
    if len(content) <= 0:
        raise ValidationError('Please enter a value.')

class CommentForm(FlaskForm):
    content = TextField('content', validators=[DataRequired(), invalid_amount])
