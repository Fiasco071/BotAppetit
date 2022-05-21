from app.models import db, Recipe
import datetime

def seed_recipes():
    recipe1 = Recipe(
        name = 'German Rhubarb Cake with Meringue',
        cooking_time = 45,
        servings = 12,
        directions = 'Preheat the oven to 350F Convection. Grease a round 26 cm Spring pan (9 1/2 inch).$**$Wash, dry and peel the rhubarb. Cut it in little pieces, mix with 2 tablespoon of sugar and let sit for at least 1/2 hour. It will extract a lot of water that needs to be drained. Pat rhubarb dry for further use.$**$In a kitchen machine beat together butter, sugar and vanilla extract until the butter is fluffy and the sugar is dissolved. Put in the eggs, one at a time and mix well.$**$In a separate bowl sift together flour, ground almonds, salt and baking powder, add slowly to the egg mixture. Dont over mix.$**$Fill dough into the spring pan, top with dried rhubarb and bake for 25 min.$**$In the mean time prepare the meringue/ baiser topping. Beat egg whites until stiff peaks form. Slowly add the sugar until meringue is firm and shiny.$**$Spread the meringue evenly over the rhubarb and decorate with almond slices. Return to the oven for another 15 min. Cover the cake with aluminum foil after 5 min. in case the meringue does turn too dark.$**$Cool completely before removing the cake from the pan.',
        cuisine = 'German',
        author_id =  4,
        created_at = datetime.datetime.now(), 
        )
    recipe2 = Recipe(
        name = 'Egg and Bacon Toast',
        cooking_time = 10,
        servings = 1,
        directions = 'Preheat the oven to 350F Convection. Grease a round 26 cm Spring pan (9 1/2 inch).$**$Wash, dry and peel the rhubarb. Cut it in little pieces, mix with 2 tablespoon of sugar and let sit for at least 1/2 hour. It will extract a lot of water that needs to be drained. Pat rhubarb dry for further use.$**$In a kitchen machine beat together butter, sugar and vanilla extract until the butter is fluffy and the sugar is dissolved. Put in the eggs, one at a time and mix well.$**$In a separate bowl sift together flour, ground almonds, salt and baking powder, add slowly to the egg mixture. Dont over mix.$**$Fill dough into the spring pan, top with dried rhubarb and bake for 25 min.$**$In the mean time prepare the meringue/ baiser topping. Beat egg whites until stiff peaks form. Slowly add the sugar until meringue is firm and shiny.$**$Spread the meringue evenly over the rhubarb and decorate with almond slices. Return to the oven for another 15 min. Cover the cake with aluminum foil after 5 min. in case the meringue does turn too dark.$**$Cool completely before removing the cake from the pan.',
        cuisine = 'American',
        author_id =  4,
        created_at = datetime.datetime.now(), 
        )
    recipe3 = Recipe(
        name = 'Meatball Sandwich',
        cooking_time = 45,
        servings = 12,
        directions = 'Preheat the oven to 350F Convection. Grease a round 26 cm Spring pan (9 1/2 inch).$**$Wash, dry and peel the rhubarb. Cut it in little pieces, mix with 2 tablespoon of sugar and let sit for at least 1/2 hour. It will extract a lot of water that needs to be drained. Pat rhubarb dry for further use.$**$In a kitchen machine beat together butter, sugar and vanilla extract until the butter is fluffy and the sugar is dissolved. Put in the eggs, one at a time and mix well.$**$In a separate bowl sift together flour, ground almonds, salt and baking powder, add slowly to the egg mixture. Dont over mix.$**$Fill dough into the spring pan, top with dried rhubarb and bake for 25 min.$**$In the mean time prepare the meringue/ baiser topping. Beat egg whites until stiff peaks form. Slowly add the sugar until meringue is firm and shiny.$**$Spread the meringue evenly over the rhubarb and decorate with almond slices. Return to the oven for another 15 min. Cover the cake with aluminum foil after 5 min. in case the meringue does turn too dark.$**$Cool completely before removing the cake from the pan.',
        cuisine = 'American',
        author_id =  4,
        created_at = datetime.datetime.now(), 
        )
    recipe4 = Recipe(
        name = 'Spaghetti',
        cooking_time = 45,
        servings = 12,
        directions = 'Preheat the oven to 350F Convection. Grease a round 26 cm Spring pan (9 1/2 inch).$**$Wash, dry and peel the rhubarb. Cut it in little pieces, mix with 2 tablespoon of sugar and let sit for at least 1/2 hour. It will extract a lot of water that needs to be drained. Pat rhubarb dry for further use.$**$In a kitchen machine beat together butter, sugar and vanilla extract until the butter is fluffy and the sugar is dissolved. Put in the eggs, one at a time and mix well.$**$In a separate bowl sift together flour, ground almonds, salt and baking powder, add slowly to the egg mixture. Dont over mix.$**$Fill dough into the spring pan, top with dried rhubarb and bake for 25 min.$**$In the mean time prepare the meringue/ baiser topping. Beat egg whites until stiff peaks form. Slowly add the sugar until meringue is firm and shiny.$**$Spread the meringue evenly over the rhubarb and decorate with almond slices. Return to the oven for another 15 min. Cover the cake with aluminum foil after 5 min. in case the meringue does turn too dark.$**$Cool completely before removing the cake from the pan.',
        cuisine = 'Italian',
        author_id =  4,
        created_at = datetime.datetime.now(), 
        )
    recipe5 = Recipe(
        name = 'Hamburger',
        cooking_time = 45,
        servings = 12,
        directions = 'Preheat the oven to 350F Convection. Grease a round 26 cm Spring pan (9 1/2 inch).$**$Wash, dry and peel the rhubarb. Cut it in little pieces, mix with 2 tablespoon of sugar and let sit for at least 1/2 hour. It will extract a lot of water that needs to be drained. Pat rhubarb dry for further use.$**$In a kitchen machine beat together butter, sugar and vanilla extract until the butter is fluffy and the sugar is dissolved. Put in the eggs, one at a time and mix well.$**$In a separate bowl sift together flour, ground almonds, salt and baking powder, add slowly to the egg mixture. Dont over mix.$**$Fill dough into the spring pan, top with dried rhubarb and bake for 25 min.$**$In the mean time prepare the meringue/ baiser topping. Beat egg whites until stiff peaks form. Slowly add the sugar until meringue is firm and shiny.$**$Spread the meringue evenly over the rhubarb and decorate with almond slices. Return to the oven for another 15 min. Cover the cake with aluminum foil after 5 min. in case the meringue does turn too dark.$**$Cool completely before removing the cake from the pan.',
        cuisine = 'American',
        author_id =  4,
        created_at = datetime.datetime.now(), 
        )
    recipe6 = Recipe(
        name = 'Honeyed Bacon Baklava',
        cooking_time = 45,
        servings = 24,
        directions = 'In large bowl of food processor, add walnuts, bacon, sugar, and cinnamon. Pulse until walnuts and bacon are chopped; set aside. (Be sure to fry the bacon to a crispy stage. Then it will chop up finely and evenly.)$**$Cut phyllo into 13\" by 9\" rectangles. In greased 13\" by 9\" baking dish, place 1 phyllo sheet; brush with melted butter. Repeat with phyllo and butter to make 5 more layers, overlapping any small strips of phyllo to make rectangles, if necessary.$**$Over phyllo in baking dish, sprinkle 1 cup walnut mixture.$**$Repeat steps 2 and 3 to make 3 more layers (4 layers total). Place remaining phyllo on top of last walnut layer; brush with butter.$**$With sharp knife, cut just halfway through layers in triangle or diamond pattern.$**$Bake in 300 degree oven for 1 hour and 25 minutes or until top is golden brown.$**$In small saucepan over medium-low heat, heat honey until hot but not boiling. Evenly spoon hot honey over hot baklava.$**$Cool Baklava in dish on wire rack at least 1 hour; cover with foil and let stand at room temperature until serving.$**$To serve, finish cutting, with a sharp knife, through layers to make triangles or diamonds.',
        cuisine = 'Lebanese',
        author_id =  4,
        created_at = datetime.datetime.now(), 
        )
    recipe7 = Recipe(
        name = 'Crispy Buttermilk Fried Chicken',
        cooking_time = 45,
        servings =6,
        directions = 'Mix flour, salt, paprika and pepper. $**$Dip chicken in buttermilk and then into flour mixture. $**$Cook chicken in oil, starting on medium-high heat, then, when chicken is browned, reduce heat to medium and cook an additional 30 to 35 minutes until chicken is done (approx 150-155 degrees F internal), turning occasionally.',
        cuisine = 'American',
        author_id =  4,
        created_at = datetime.datetime.now(), 
        )
    
    recipe8 = Recipe(
        name = 'Caramel Macchiato Cake',
        cooking_time = 180,
        servings = 10,
        directions = 'Make 3 cake layers: Follow the chocolate cake box instructions to make 3 layers ( add 1 boxes of mix so that you get 3 layers). Add the instant coffee directly to batter. Stir and let sit for a minutes so that coffee dissolves. Add to 3 8 inch cake pans, and bake according to box instructions.$**$Once cool, place large plate on top of pan and then invert so that plate is on the bottom. Tap top of pan a few times and gently wiggle and remove pan from cake. Repeat for other 2 layers. Wrap in plastic wrap and place in fridge for at least 2 hours to overnight.$**$Make caramel: In a small saucepan over medium low heat, add all ingredients. Stir and cook until a dark golden brown color, stirring frequently so it does not burn. Remove from heat when finished.$**$Make frosting: Add gelatin and cold water to a small dish. Stir. In a small saucepan, add 4 TBSP of cream and cook until just simmering. Once simmering, remove and add to gelatin. Stir and place in fridge to let set, about 10 minutes. Whip with a whisk until smooth.$**$In a stand mixer, add the remaining cream and sugar. and whip with whisk attachment at medium high speed until soft peaks form, it will take a few minutes.$**$Add gelatin mixture and whip again until frosting becomes thick and stiffer peaks form, it should only take about 30 seconds more to achieve desired fluffiness. Do no over mix. Place in fridge until ready to use.$**$Assemble cake: On a cake stand or tray, place first layer of cake. Add 1 cup whip cream and spread evenly over cake. Add next layer of cake. Gently press down. Add another layer of whipped cream. Place top layer of cake. Press down gently. Place in fridge for 5 minutes to let frosting set.$**$Add the caramel to the top layer. Pour in the middle and let drip down the sides. If needed, use a spoon to drag caramel off the sides as desired. Place in fridge for 10 minutes to let caramel set Add final layer of whipped cream to top and spread evenly on top.$**$Place in fridge until ready to serve.',
        cuisine = 'American',
        author_id =  4,
        created_at = datetime.datetime.now(), 
        )
    
    recipe9 = Recipe(
        name = "S'mores-n-berry Bars",
        cooking_time = 45,
        servings = 9,
        directions = 'Preheat your oven to 325 degrees F.$**$Line an 8-inch-square baking pan with foil so that it hangs over the edges and spray it with nonstick cooking spray.$**$Use a medium-sized bowl to mix together the melted butter, graham cracker crumbs and sugar.$**$Press the crumb mixture evenly on the bottom of the pan.$**$Bake until golden, or for about 20 minutes. Remove and set aside.$**$Raise the oven temperature to 350 degrees F.$**$Meanwhile, use a medium-sized bowl and mix the brownie mixture together, then gently fold in the raspberries.$**$Pour the batter over the graham cracker crust.$**$Bake the brownie mixture for about 25 minutes (based on your brownie mix), or until a toothpick inserted in the middle of the brownie comes out clean.$**$Remove the brownie and place the oven on broil.$**$Meanwhile, break the two graham crackers into small pieces and arrange them in a single layer on top of the brownie.$**$Next arrange the mini marshmallows evenly over the top of the graham crackers.$**$Place the pan back in the oven, just for a few minutes, until the marshmallows begin to brown. Keep a close watch on them so they dont burn under the broiler.$**$Remove from the oven and cool completely.$**$Remove from the pan using the overhanging foil and cut into bars to serve.',
        cuisine = 'American',
        author_id =  4,
        created_at = datetime.datetime.now(), 
        )
    recipe10 = Recipe(
        name = 'Flank Steak with Herbed Salsa',
        cooking_time = 45,
        servings = 4,
        directions = 'Preheat a grill pan or light a grill.$**$In a medium bowl, combine the tomatoes with the scallions, cilantro, Jalapeno, garlic and lemon  lime juice. Season the salsa with salt and freshly ground pepper.$**$Season with salt and pepper the flank steak.$**$Using a grill pan brush a shadow of oil on the bottom of it. Place the pan over high heat and when hot add the flank steak. Cook until nicely charred outside and medium rare inside. About 3 minutes per side.$**$Transfer the steak to a carving board and let rest for 5 minutes.$**$Thinly slice the steak across the grain and serve with the herbed salsa.',
        cuisine = 'Mexican',
        author_id =  4,
        created_at = datetime.datetime.now(), 
        )
    recipe11 = Recipe(
        name = 'Dump Cake',
        cooking_time = 45,
        servings = 12,
        directions = 'Spread pineapple in bottom of a 9X13 pan$**$Cover with pie filling$**$Cover with cake mix$**$Cut butter into small pieces and place evenly over cake mix$**$Bake 350 for 1 hour$**$Serve Old School with Cool Whip, or fresh whipped cream',
        cuisine = 'American',
        author_id =  4,
        created_at = datetime.datetime.now(), 
        )
    
    recipe12 = Recipe(
        name = 'Florida Orange Breakfast Bread',
        cooking_time = 45,
        servings = 16,
        directions = 'Preheat oven to 350F.$**$Grease and lightly flour loaf pans.$**$In a medium bowl, whisk together flour, baking powder, baking soda, and salt. Set aside.$**$Measure buttermilk, orange juice, and vanilla into a measuring cup. Set aside.$**$In a large bowl, use a mixer to beat the butter until creamy.$**$Blend in sugar and beat for a few minutes until light and fluffy.$**$Mix in eggs, one at a time, and orange zest, and beat until well incorporated.$**$With mixer on low, slowly pour in 1/3 of the flour mixture.$**$Mix in half of the buttermilk mixture.$**$Blend in another 1/3 of the flour mixture and remaining buttermilk mixture.$**$Add remaining flour mixture and mix until just blended.$**$Divide batter between prepared pans, filling about 3/4 full, and bake for 30 to 35 minutes (45 minutes if using a large loaf pan) or until a toothpick inserted in center comes out clean.$**$While loaves bake, prepare orange simple syrup.$**$Stir together 1/2 cup orange juice and 1/2 cup brown sugar in a small pot. Bring to a boil over medium heat while occasionally stirring, then reduce heat and simmer for a few minutes. Remove pot from heat and set aside to cool.$**$When cakes are done, cool for 10 minutes before turning out onto wire rack. Set rack over a sheet pan or piece of foil, and using a brush or a spoon, soak each cake with simple syrup. Allow to cool completely.$**$Store in an airtight container or wrap tightly.',
        cuisine = 'American',
        author_id =  4,
        created_at = datetime.datetime.now(), 
        )
    
    recipe13 = Recipe(
        name = 'Easy Eggplant Curry',
        cooking_time = 45,
        servings = 6,
        directions = "Wash eggplants and dice into 2 cm cubes.$**$Heat ghee/oil in a large frying pan over medium heat. Add the onion and cook, stirring occasionally for about 10 minutes until a deep golden brown colour. (Be patient and don't be tempted to rush this stage).$**$Add the grated ginger, crushed garlic, fennel and cumin seeds (if using, if you are using cumin powder however, add in the next stage with the other ground spices). Cook for about 2 minutes until garlic and ginger are fragrant. Add ground coriander, turmeric, cayenne/chilli powder and salt. Cook for 30 seconds. Add the diced eggplant and stir well to coat evenly with spices. Pour in the tin of chopped tomatoes, give it a big stir, then place the lid on and continue to cook over low-medium heat for about 10-15 minutes. Check and stir a few times to ensure it's not catching on the bottom. Turn temperature down a little if need be.$**$When the sauce has thicken and the eggplant is meltingly soft, check the seasoning once more. Serve sprinkled with coriander/cilantro leaves and steamed rice.",
        cuisine = 'Indian',
        author_id =  1,
        created_at = datetime.datetime.now(), 
        )
    
    recipe14 = Recipe(
        name = 'Moroccan chickpea and lentil stew',
        cooking_time = 30,
        servings = 3,
        directions = 'Heat oil in large saucepan over medium-high heat, add onion and cook for about 3 minutes.$**$Add celery, carrot and broccoli to pan and saut for about 5 minutes.$**$Add in all seasonings and cook additional 1 minute.$**$Add water, tomato paste, chickpeas and lentils, bring to a boil. Cover, reduce heat to low and simmer for 20 minutes.$**$Meanwhile, cook couscous in separate pan according to package directions.$**$Add cilantro and lemon juice to stew and serve over warm couscous.',
        cuisine = 'Lebanese',
        author_id =  1,
        created_at = datetime.datetime.now(), 
        )
    
    recipe15 = Recipe(
        name = 'Herb and Cheddar Cordon Bleu',
        cooking_time = 60,
        servings = 2,
        directions = 'Pre-heat the oven to 350 degrees F (about 176 degrees C).$**$Put the chicken breasts between two slices of wax paper and flatten with a rolling pin or meat mallet until they are about a quarter of an inch thick. $**$Place a slice of ham and a slice of cheddar on each chicken breast.$**$Roll the chicken breast as tightly as possible. If necessary, secure the rolls with toothpicks or small skewers.$**$Beat an egg in a shallow baking dish. $**$Arrange two other \"stations\" using foil or other dishes, one for the flour and another for the dried herbs and breadcrumbs. $**$Cover the rolled chicken breasts in flour, then dip them into the egg mixture. $**$Finally, press them into the mixture of dried herbs and breadcrumbs until they are covered on all sides.$**$Place the chicken in an oiled (or buttered) baking dish and bake for about 30 minutes.',
        cuisine = 'French',
        author_id =  1,
        created_at = datetime.datetime.now(), 
        )
    
    recipe16 = Recipe(
        name = 'Beef Tenderloin With Creamy Alouette Mushroom Sauce',
        cooking_time = 45,
        servings = 2,
        directions = 'Heat broiler.$**$Coat all sides of tenderloin with 1 tsp. of the olive oil.  Place on broiler pan.  Season to taste with salt and pepper.  Broil 4 inches from heat for 6 minutes or until well-browned. Turn. Broil 6 to 8 minutes or until desired doneness.$**$Meanwhile, heat remaining olive oil and the butter in small skillet over medium heat.$**$Add shallot; cook 1 minute.$**$Add mushrooms.  Cook 2 to 3 minutes or until tender, stirring frequently.$**$Stir in Alouette, adding milk to desired consistency.  Heat just until warm.$**$Spoon sauce over tenderloins.  Sprinkle with parsley.',
        cuisine = 'American',
        author_id =  1,
        created_at = datetime.datetime.now(), 
        )
    db.session.add_all([recipe1,recipe2,recipe3,recipe4,recipe5,recipe6,recipe7,recipe8,recipe9,recipe10,recipe11,recipe12,recipe13,recipe14,recipe15,recipe16])
    db.session.commit()

def undo_recipes():
    db.session.execute('TRUNCATE recipes RESTART IDENTITY CASCADE;')
    db.session.commit()