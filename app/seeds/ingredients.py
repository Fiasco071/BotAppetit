from app.models import db, Ingredient

def seed_ingredients():
    apple = Ingredient(
        name='apple', ing_type='fruit')
    
    carrot = Ingredient(
        name='carrot', ing_type='vegetable')
    potato = Ingredient(
        name='potato', ing_type='vegetable')
    tomato = Ingredient(
        name='tomato', ing_type='fruit')
    onion  = Ingredient(
        name='onion', ing_type='vegetable ')
    lettuce = Ingredient(
        name='lettuce', ing_type='vegetable')
    garlic = Ingredient(
        name='garlic', ing_type='vegetable')
    spinach = Ingredient(
        name='spinach', ing_type='vegetable')
    
    rice = Ingredient(
        name='rice', ing_type='grain') 
    
    
    chicken = Ingredient(
        name='chicken', ing_type='poultry')
    beef = Ingredient(
        name='beef', ing_type='meat')
    pork = Ingredient(
        name='pork', ing_type='meat')
    
    sugar = Ingredient(
        name='sugar', ing_type='seasoning')
    salt = Ingredient(
        name='salt', ing_type='seasoning')
    flour = Ingredient(
        name='flour', ing_type='flour')
    
    
    olive_oil = Ingredient(
        name='olive oil', ing_type='oil') 
    vege_oil = Ingredient(
        name='vegetable oil', ing_type='oil') 
    cano_oil = Ingredient(
        name='canola oil', ing_type='oil')  
    cooking_spray = Ingredient(
        name='cooking spray', ing_type='oil') 
    
    
    
    db.session.add_all([apple,carrot,potato,tomato,onion,lettuce,garlic,rice,spinach,chicken,beef,pork,sugar,salt,flour,olive_oil,vege_oil,cano_oil,cooking_spray])
    db.session.commit()

def undo_ingredients():
    db.session.execute('TRUNCATE ingredients RESTART IDENTITY CASCADE;')
    db.session.commit()