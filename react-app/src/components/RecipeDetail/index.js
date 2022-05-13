import CookBot from "../CookBot";
import './index.css'

import { useEffect, useRef, useState } from "react";
import { getAllIngredients } from "../../store/ingredient";
import { useDispatch, useSelector } from 'react-redux';
import { delARecipes, getAllRecipes } from "../../store/recipe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faFlag } from "@fortawesome/free-solid-svg-icons";
import CommentBox from "../CommentBox";
import { useHistory, useParams } from "react-router-dom";



const RecipeDetail = () => {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const ref = useRef(null);

    const ingredients = useSelector(state => Object.values(state.ingredients)[0])
    const recipes = useSelector(state => Object.values(state.recipes)[0])
    const userId = useSelector(state => state.session.user.id)

    // const recipes3 = useSelector(state => state.recipes)
    // console.log(recipes3)
    let recipe =recipes?.filter((recipe) => +recipe.id === +id)[0]


    let instructionArr;
    if (recipe) {
        instructionArr = recipe?.directions.split("$")
    }


    const [sliderFlag, setSliderFlag] = useState(false)

    const slidein = () => {
        if (!sliderFlag) {
            ref.current.classList.add("slideanimation");
            setSliderFlag(true)
        } else {
            ref.current.classList.remove("slideanimation");
            setSliderFlag(false)
        }
    }

    const handleDelete = async() => {
        await dispatch(delARecipes(id))
        history.push('/')
    }

    useEffect(() => {
        dispatch(getAllIngredients())
        dispatch(getAllRecipes())
    }, [dispatch, id])



    return (
        <div className="home-wrapper">
            <div className="recipe-box">
                {userId == recipe?.author_id && (
                    <p 
                    onClick={handleDelete}
                    className="comment-delete-button recipe">X</p>
                )}
                <div className="big-img-box"></div>
                <div className="ing-box">
                    <div className="ing-box-groc-icon"></div>
                    <div className="recipe-ing-box">
                        {recipe && recipe?.ingredients.map(ingredient => (
                            <div key={`b${ingredient.id}`} className="rec-ing-single-info-container">
                                <div
                                    key={`a${ingredient.id}`}
                                    className="ingredient-icon-box-recipe">{ingredient.ingdata.name}</div>
                                <div key={ingredient.id}>{ingredient.measurement} {ingredient.measurement_type}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="direc-box-1">
                    {recipe && (
                        <div className="quick-info-box">
                            <h2 className="recipe-title">{recipe?.name}</h2>
                            <div>
                                <FontAwesomeIcon icon={faClock} className="cook-time-icon" />
                                <p className="cooking-time-text">{recipe?.cooking_time}m</p>
                                <FontAwesomeIcon icon={faFlag} className="cook-time-icon" />
                                <p className="cuisine-text">{recipe?.cuisine}</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="direc-box-2">
                    <h2>Instructions</h2>
                    {recipe && (
                        <div className="directions-box">
                            {instructionArr && (
                                instructionArr.map(direction => (
                                    <div key={instructionArr.indexOf(direction)}>{direction}</div>
                                ))
                            )}
                        </div>
                    )}
                </div>

                <div className="direc-box-3">
                    <CommentBox id={id}/>
                </div>

            </div>
            <CookBot />
            <div ref={ref} className="ingredient-dnd-box">
                <p onClick={slidein} className="ing-dnd-box-tab">Ingredients</p>
                <div className="ing-dnd-icons-box">
                    {ingredients?.map((ingredient) => (
                        <div key={ingredient.id}>
                            <div
                                key={ingredient?.id}
                                className={`ingredient-icon-box ${ingredient?.id}`}
                            >{ingredient.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RecipeDetail
