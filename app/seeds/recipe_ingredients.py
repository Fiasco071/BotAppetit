from app.models import db, IngredientsInRecipe

def seed_rec_ings():
    r1i1 = IngredientsInRecipe(
        recipe_id = 1,
        ing_id = 3,
        measurement = 2.5,
        measurement_type = 'TBSP',
    )
    r1i2 = IngredientsInRecipe(
        recipe_id = 1,
        ing_id = 1,
        measurement = 2.5,
        measurement_type = 'TBSP',
    )
    r1i3 = IngredientsInRecipe(
        recipe_id = 1,
        ing_id = 8,
        measurement = 2.5,
        measurement_type = 'TBSP',
    )
    r1i4 = IngredientsInRecipe(
        recipe_id = 1,
        ing_id = 9,
        measurement = 2.5,
        measurement_type = 'TBSP',
    )
    r1i5 = IngredientsInRecipe(
        recipe_id = 1,
        ing_id = 10,
        measurement = 2.5,
        measurement_type = 'TBSP',
    )
    r1i6 = IngredientsInRecipe(
        recipe_id = 1,
        ing_id = 5,
        measurement = 2.5,
        measurement_type = 'TBSP',
    )
    
    
    db.session.add_all([r1i1,r1i2,r1i3,r1i4,r1i5,r1i6])
    db.session.commit()

def undo_rec_ings():
    db.session.execute('TRUNCATE ingredientsInRecipes RESTART IDENTITY CASCADE;')
    db.session.commit()