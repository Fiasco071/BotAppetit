from app.models import db, CookCount


# Adds a demo user, you can add other users here if you want
def seed_cc():
    cc1 = CookCount(recipe_id=1, user_id=1)
    cc2 = CookCount(recipe_id=1, user_id=2)
    cc3 = CookCount(recipe_id=1, user_id=3)
    cc4 = CookCount(recipe_id=2, user_id=2)
    cc5 = CookCount(recipe_id=2, user_id=3)
    cc6 = CookCount(recipe_id=3, user_id=2)
    cc7 = CookCount(recipe_id=1, user_id=1)



    db.session.add_all([cc1,cc2,cc3,cc4,cc5,cc6,cc7])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_cc():
    db.session.execute('TRUNCATE cookCounts RESTART IDENTITY CASCADE;')
    db.session.commit()
