from flask.cli import AppGroup
from .users import seed_users, undo_users
from .ingredients import seed_ingredients, undo_ingredients
from .recipes import seed_recipes, undo_recipes
from .recipe_ingredients import seed_rec_ings, undo_rec_ings
from .comments import seed_comments, undo_comments
from .cook_counts import seed_cc, undo_cc

seed_commands = AppGroup('seed')


@seed_commands.command('all')
def seed():
    seed_users()
    seed_ingredients()
    seed_recipes()
    seed_rec_ings()
    seed_comments()
    seed_cc()


@seed_commands.command('undo')
def undo():
    undo_users()
    undo_ingredients()
    undo_recipes()
    undo_rec_ings()
    undo_comments()
    undo_cc()

