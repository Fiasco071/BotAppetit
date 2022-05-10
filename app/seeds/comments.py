from app.models import db, Comment
import datetime


def seed_comments():
    comment1 = Comment(
        content = 'Lorem Ipsem something something blah blah comment filler',
        recipe_id = '1',
        user_id = '1',
        created_at = datetime.datetime.now()
    )
    comment2 = Comment(
        content = 'Lorem Ipsem something something blah blah comment filler',
        recipe_id = '1',
        user_id = '3',
        created_at = datetime.datetime.now()
    )
    comment3 = Comment(
        content = 'Lorem Ipsem something something blah blah comment filler',
        recipe_id = '1',
        user_id = '2',
        created_at = datetime.datetime.now()
    )
    comment4 = Comment(
        content = 'Lorem Ipsem something something blah blah comment filler',
        recipe_id = '1',
        user_id = '2',
        created_at = datetime.datetime.now()
    )
    comment5 = Comment(
        content = 'Lorem Ipsem something something blah blah comment filler',
        recipe_id = '1',
        user_id = '3',
        created_at = datetime.datetime.now()
    )
    

    
    
    
    db.session.add_all([comment1,comment2,comment3,comment4,comment5])
    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()