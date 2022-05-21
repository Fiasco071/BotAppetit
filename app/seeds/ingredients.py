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
    
    
    bellpepper = Ingredient(
        name='bellpepper', ing_type='vegetable')
    cheese = Ingredient(
        name='cheese', ing_type='dairy')
    chili = Ingredient(
        name='chili', ing_type='vegetable')
    milk = Ingredient(
        name='milk', ing_type='dairy')
    pepper = Ingredient(
        name='pepper', ing_type='pepper')
    water = Ingredient(
        name='water', ing_type='water')
    fish = Ingredient(
        name='fish', ing_type='meat')
    egg = Ingredient(
        name='egg', ing_type='egg')
    honey = Ingredient(
        name='honey', ing_type='honey')
    
    orange = Ingredient(
        name='orange', ing_type='fruit')
    chickpea =Ingredient(
        name='chickpea', ing_type='vegetable')
    broccoli = Ingredient(
        name='broccoli', ing_type='vegetable')
    lentil = Ingredient(
        name='lentil', ing_type='vegetable')
    lemon = Ingredient(
        name='lemon', ing_type='fruit')
    lime = Ingredient(
        name='lime', ing_type='fruit') 
    eggplant = Ingredient(
        name='eggplant', ing_type='vegetable')
    pineapple = Ingredient(
        name='pineapple', ing_type='fruit')
    rhubarb = Ingredient(
        name='rhubarb', ing_type='vegetable')
    bread = Ingredient (
        name='bread', ing_type='bread'
    )

    
    db.session.add_all([apple,carrot,potato,tomato,onion,lettuce,garlic,rice,spinach,chicken,beef,pork,sugar,salt,flour,olive_oil,vege_oil,cano_oil,cooking_spray,bellpepper,cheese,chili,milk,pepper,water,fish,egg,honey, orange, chickpea,broccoli,lentil,lemon,lime,eggplant,pineapple,rhubarb,bread])
    db.session.commit()

def undo_ingredients():
    db.session.execute('TRUNCATE ingredients RESTART IDENTITY CASCADE;')
    db.session.commit()