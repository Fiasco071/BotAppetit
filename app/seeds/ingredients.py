from app.models import db, Ingredient

def seed_ingredients():
    apple = Ingredient(
        name='apple', ing_type='fruit')
    carrot = Ingredient(
        name='carrot', ing_type='vegetable')
    potato = Ingredient(
        name='potato', ing_type='vegetable')

    db.session.add_all([apple,carrot,potato])
    db.session.commit()

def undo_ingredients():
    db.session.execute('TRUNCATE ingredients RESTART IDENTITY CASCADE;')
    db.session.commit()