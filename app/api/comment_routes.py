from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Comment

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:id>')
# @login_required
def get_all_comments(id):
    #some recipe ID filter is needed here later
    comments = Comment.query.filter(Comment.recipe_id == id).all()
    return {'comments': [comment.to_dict_no_recipe() for comment in comments]}

