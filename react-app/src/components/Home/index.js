import CookBot from "../CookBot";
import './index.css'

import { useEffect, useRef, useState } from "react";
import { getAllIngredients } from "../../store/ingredient";
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from "../../store/recipe";
import CommentBox from "../CommentBox";
import { updateUser } from "../../store/session";
import Test from "../test";
import './profile.css';
import { useHistory } from "react-router-dom";


const Home = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const ref = useRef(null);
    const ref2 = useRef(null)

    const user = useSelector(state => state.session.user);
    const ingredients = useSelector(state => Object.values(state.ingredients))
    const recipes = useSelector(state => Object.values(state.recipes))
    

    //Recipe instruction break down
    let instructionArr;

    if (recipes) {
        instructionArr = recipes[0]?.directions.split("$")
    }


    const [sliderFlag, setSliderFlag] = useState(false)

    // const slidein = () => {
    //     if (!sliderFlag) {
    //         ref.current.classList.add("slideanimation");
    //         ref2.current.classList.add('showingtab')
    //         setSliderFlag(true)
    //     } else {
    //         ref.current.classList.remove("slideanimation");
    //         ref2.current.classList.remove('showingtab')
    //         setSliderFlag(false)
    //     }
    // }


    useEffect(() => {
        dispatch(getAllIngredients())
        dispatch(getAllRecipes())
        dispatch(updateUser())
    }, [dispatch])

    return (
        <div className="home-wrapper">
            <div className="recipe-box profile-page">
                <div className="website-title-back"></div>
                <h1 className="website-title">Bot-Appetit</h1>
                <div className="user-info-box">
                    <div className="user-info-small-box">
                        <h2 className="user-info-title">User Info</h2>
                        <div>
                            <div>
                                <div className="info-box">
                                    <p className="info-tag">Username</p>
                                    <p className="info-text">{user.username}</p>
                                </div>
                                <div className="info-box">
                                    <p className="info-tag">Email</p>
                                    <p className="info-text">{user.email}</p>
                                </div>
                            </div>
                            <div>
                                <div className="info-box">
                                    <p className="info-tag">Cuisine</p>
                                    <p className="info-text">{!user.cuisine_pref ? `update` : user.cuisine_pref}</p>
                                </div>
                                <div className="info-box">
                                    <p className="info-tag">Proficiency</p>
                                    <p className="info-text">{!user.cook_proficiency ? 'update' : user.cook_proficiency}</p>

                                </div>
                            </div>
                        </div>

                    </div>
                    <h2 className="my-recipe-list-title">My Recipes</h2>
                    <div className="my-recipe-list">
                        {recipes.filter(recipe => recipe.author_id == user.id).map((recipe) => (
                            <div className="recipes-small-box"
                            onClick={()=>history.push(`/recipes/${recipe.id}`)}
                            >
                                <h2 className="smallv-recipe-name">{recipe.name.length > 9 ? `${recipe.name.slice(0,9)}...`: recipe.name}</h2>
                                <div>
                                    <img className='smallv-cuisine-flag' src={require(`../../assets/img/flagicon/${recipe?.cuisine.split(" ").join('').toLowerCase()}.png`).default} />

                                </div>
                                <div className="smallv-recipe-inglist">
                                    {recipe?.ingredients.map(ingredient => (
                                                <img className='smallv-recipe-ing-icon' src={require(`../../assets/img/ingIcons/${ingredient.ingdata.name.includes("oil") ? 'oil' : ingredient.ingdata.name}.png`).default} />
                                    ))}
                                </div>
                                <div className="smallv-clock-box">
                                      {recipe.cooking_time} m
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className='profile-icon' />
                    <div className='recipes-icon' />
                </div>
            </div>
            <CookBot />
            {/* <p 
            ref={ref} 
            onClick={slidein} 
            className="ing-dnd-box-tab">
                Ingredients</p>
            <div ref={ref2} className="ing-dnd-icons-box">
                {ingredients?.map((ingredient) => (
                    <div key={ingredient.id}>
                        <div
                            key={ingredient?.id}
                            className={`ingredient-icon-box ${ingredient?.id}`}
                        >{ingredient.name}</div>
                    </div>
                ))}
            </div> */}
        </div>
    );
}

export default Home