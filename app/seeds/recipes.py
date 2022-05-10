from app.models import db, Recipe
import datetime

def seed_recipes():
    recipe1 = Recipe(
        name = 'German Rhubarb Cake with Meringue',
        cooking_time = 45,
        servings = 12,
        directions = 'Preheat the oven to 350F Convection. Grease a round 26 cm Spring pan (9 1/2 inch).$Wash, dry and peel the rhubarb. Cut it in little pieces, mix with 2 tablespoon of sugar and let sit for at least 1/2 hour. It will extract a lot of water that needs to be drained. Pat rhubarb dry for further use.$In a kitchen machine beat together butter, sugar and vanilla extract until the butter is fluffy and the sugar is dissolved. Put in the eggs, one at a time and mix well.$In a separate bowl sift together flour, ground almonds, salt and baking powder, add slowly to the egg mixture. Dont over mix.$Fill dough into the spring pan, top with dried rhubarb and bake for 25 min.$In the mean time prepare the meringue/ baiser topping. Beat egg whites until stiff peaks form. Slowly add the sugar until meringue is firm and shiny.$Spread the meringue evenly over the rhubarb and decorate with almond slices. Return to the oven for another 15 min. Cover the cake with aluminum foil after 5 min. in case the meringue does turn too dark.$Cool completely before removing the cake from the pan.',
        cuisine = 'German',
        author_id =  1,
        created_at = datetime.datetime.now(), 
        )
    recipe2 = Recipe(
        name = 'Egg and Bacon Toast',
        cooking_time = 10,
        servings = 1,
        directions = 'Preheat the oven to 350F Convection. Grease a round 26 cm Spring pan (9 1/2 inch).$Wash, dry and peel the rhubarb. Cut it in little pieces, mix with 2 tablespoon of sugar and let sit for at least 1/2 hour. It will extract a lot of water that needs to be drained. Pat rhubarb dry for further use.$In a kitchen machine beat together butter, sugar and vanilla extract until the butter is fluffy and the sugar is dissolved. Put in the eggs, one at a time and mix well.$In a separate bowl sift together flour, ground almonds, salt and baking powder, add slowly to the egg mixture. Dont over mix.$Fill dough into the spring pan, top with dried rhubarb and bake for 25 min.$In the mean time prepare the meringue/ baiser topping. Beat egg whites until stiff peaks form. Slowly add the sugar until meringue is firm and shiny.$Spread the meringue evenly over the rhubarb and decorate with almond slices. Return to the oven for another 15 min. Cover the cake with aluminum foil after 5 min. in case the meringue does turn too dark.$Cool completely before removing the cake from the pan.',
        cuisine = 'American',
        author_id =  1,
        created_at = datetime.datetime.now(), 
        )
    recipe3 = Recipe(
        name = 'Meatball Sandwich',
        cooking_time = 45,
        servings = 12,
        directions = 'Preheat the oven to 350F Convection. Grease a round 26 cm Spring pan (9 1/2 inch).$Wash, dry and peel the rhubarb. Cut it in little pieces, mix with 2 tablespoon of sugar and let sit for at least 1/2 hour. It will extract a lot of water that needs to be drained. Pat rhubarb dry for further use.$In a kitchen machine beat together butter, sugar and vanilla extract until the butter is fluffy and the sugar is dissolved. Put in the eggs, one at a time and mix well.$In a separate bowl sift together flour, ground almonds, salt and baking powder, add slowly to the egg mixture. Dont over mix.$Fill dough into the spring pan, top with dried rhubarb and bake for 25 min.$In the mean time prepare the meringue/ baiser topping. Beat egg whites until stiff peaks form. Slowly add the sugar until meringue is firm and shiny.$Spread the meringue evenly over the rhubarb and decorate with almond slices. Return to the oven for another 15 min. Cover the cake with aluminum foil after 5 min. in case the meringue does turn too dark.$Cool completely before removing the cake from the pan.',
        cuisine = 'American',
        author_id =  1,
        created_at = datetime.datetime.now(), 
        )
    recipe4 = Recipe(
        name = 'Spaghetti',
        cooking_time = 45,
        servings = 12,
        directions = 'Preheat the oven to 350F Convection. Grease a round 26 cm Spring pan (9 1/2 inch).$Wash, dry and peel the rhubarb. Cut it in little pieces, mix with 2 tablespoon of sugar and let sit for at least 1/2 hour. It will extract a lot of water that needs to be drained. Pat rhubarb dry for further use.$In a kitchen machine beat together butter, sugar and vanilla extract until the butter is fluffy and the sugar is dissolved. Put in the eggs, one at a time and mix well.$In a separate bowl sift together flour, ground almonds, salt and baking powder, add slowly to the egg mixture. Dont over mix.$Fill dough into the spring pan, top with dried rhubarb and bake for 25 min.$In the mean time prepare the meringue/ baiser topping. Beat egg whites until stiff peaks form. Slowly add the sugar until meringue is firm and shiny.$Spread the meringue evenly over the rhubarb and decorate with almond slices. Return to the oven for another 15 min. Cover the cake with aluminum foil after 5 min. in case the meringue does turn too dark.$Cool completely before removing the cake from the pan.',
        cuisine = 'Italian',
        author_id =  1,
        created_at = datetime.datetime.now(), 
        )
    recipe5 = Recipe(
        name = 'Hamburger',
        cooking_time = 45,
        servings = 12,
        directions = 'Preheat the oven to 350F Convection. Grease a round 26 cm Spring pan (9 1/2 inch).$Wash, dry and peel the rhubarb. Cut it in little pieces, mix with 2 tablespoon of sugar and let sit for at least 1/2 hour. It will extract a lot of water that needs to be drained. Pat rhubarb dry for further use.$In a kitchen machine beat together butter, sugar and vanilla extract until the butter is fluffy and the sugar is dissolved. Put in the eggs, one at a time and mix well.$In a separate bowl sift together flour, ground almonds, salt and baking powder, add slowly to the egg mixture. Dont over mix.$Fill dough into the spring pan, top with dried rhubarb and bake for 25 min.$In the mean time prepare the meringue/ baiser topping. Beat egg whites until stiff peaks form. Slowly add the sugar until meringue is firm and shiny.$Spread the meringue evenly over the rhubarb and decorate with almond slices. Return to the oven for another 15 min. Cover the cake with aluminum foil after 5 min. in case the meringue does turn too dark.$Cool completely before removing the cake from the pan.',
        cuisine = 'American',
        author_id =  1,
        created_at = datetime.datetime.now(), 
        )
    
    db.session.add_all([recipe1,recipe2,recipe3,recipe4,recipe5])
    db.session.commit()

def undo_recipes():
    db.session.execute('TRUNCATE recipes RESTART IDENTITY CASCADE;')
    db.session.commit()