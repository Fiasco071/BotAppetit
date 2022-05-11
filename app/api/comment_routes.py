from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import desc
from app.forms.comment_form import CommentForm
from app.models import db, Comment
import datetime

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:id>')
# @login_required
def get_all_comments(id):
    #some recipe ID filter is needed here later
    comments = Comment.query.filter(Comment.recipe_id == id).order_by(Comment.created_at.desc()).all()
    return {'comments': [comment.to_dict_no_recipe() for comment in comments]}


@comment_routes.route('/<int:id>/add', methods=['GET', "POST"])
# @login_required
def add_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    id = request.json["recipe_id"]
    
    if form.validate_on_submit():
        comment = Comment(
        content = form.data['content'],
        recipe_id = id,
        user_id = current_user.to_dict_no_rel_user()['id'],
        created_at = datetime.datetime.now()
    )
        db.session.add(comment)
        db.session.commit()

        return comment.to_dict_no_recipe()

    return {"error": form.errors}




@comment_routes.route('/<int:id>/delete', methods=['GET'])
# @login_required
def delete_comment(id):
    
    comment = Comment.query.filter(Comment.id == id).one()
    deletedRecord = comment.to_dict_no_recipe()
    db.session.delete(comment)
    db.session.commit()

    return deletedRecord

