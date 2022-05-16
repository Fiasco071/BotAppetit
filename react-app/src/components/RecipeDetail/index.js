import CookBot from "../CookBot";
import './index.css'

import { useEffect, useRef, useState } from "react";
import { getAllIngredients } from "../../store/ingredient";
import { useDispatch, useSelector } from 'react-redux';
import { delARecipes, getAllRecipes } from "../../store/recipe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import CommentBox from "../CommentBox";
import { useHistory, useParams } from "react-router-dom";
import { updateUser } from "../../store/session";


const RecipeDetail = () => {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const ref = useRef(null);
    const ref2 = useRef(null);
    const ingredients = useSelector(state => Object.values(state.ingredients))
    const recipes = useSelector(state => state.recipes)
    const userId = useSelector(state => state.session.user.id)
    const user = useSelector(state => state.session.user)
    let recipe = recipes[id]

    let instructionArr;
    if (recipe) {
        instructionArr = recipe?.directions.split("$")
    }

    const [cookcount, setCC] = useState();

    const getCookCount = async (id) => {
        const response = await fetch(`/api/recipes/${id}/cooked`);
        const count = await response.json();
        setCC(count.cook_count)
    }

    const adjustCookCount = async () => {
        if (user.user_cc?.filter(cc => cc.recipe_id == id).length > 0) {
            const response = await fetch(`/api/recipes/${id}/cooked/delete`);
            const count = await response.json();
            setCC(count.cook_count)
            ref2.current.classList.add('blinking')
            const timeOut = setTimeout(() => {
                ref2.current.classList.remove('blinking')
            }, 500)
        } else {
            const response = await fetch(`/api/recipes/${id}/cooked/add`);
            const count = await response.json();
            setCC(count.cook_count)
            ref2.current.classList.add('blinking')
            const timeOut = setTimeout(() => {
                ref2.current.classList.remove('blinking')
            }, 500)
        }
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

    const handleDelete = async () => {
        await dispatch(delARecipes(id))
        history.push('/home')
    }

    ////// Handle Hearts /////////////////
    const [heartAvg, setHeartAvg] = useState(0)

    const getAllHearts = async () => {
        const response = await fetch(`/api/recipes/${id}/hearts`);
        const data = await response.json();
        setHeartAvg(data.heart_avg)
    }

    const adjustHearts = async () => {
        if (recipe.recipe_hearts?.filter(heart => heart.user_id == userId).length > 0) {
            const response = await fetch(`/api/recipes/${id}/hearts/update`);
            const data = await response.json();
            setHeartAvg(data.heart_avg)
            // ref2.current.classList.add('blinking')
            // const timeOut = setTimeout(() => {
            //     ref2.current.classList.remove('blinking')
            // }, 500)
        } else {
            const response = await fetch(`/api/recipes/${id}/hearts/add`);
            const data = await response.json();
            setHeartAvg(data.heart_avg)

            // ref2.current.classList.add('blinking')
            // const timeOut = setTimeout(() => {
            //     ref2.current.classList.remove('blinking')
            // }, 500)
        }
    }





    useEffect(() => {
        dispatch(getAllIngredients())
        dispatch(getAllRecipes())
        getCookCount(id)
        getAllHearts(id)
        dispatch(updateUser())
    }, [dispatch, cookcount, heartAvg, id])

    return (
        <div className="detail-wrapper">
            <div className="recipe-box">
                {userId == recipe?.author_id && (
                    <>
                        <FontAwesomeIcon
                            onClick={() => history.push(`/recipes/${recipe?.id}/edit`)}
                            icon={faEdit}
                            className="edit-icon" />
                        <p
                            onClick={handleDelete}
                            className="comment-delete-button recipe">X</p>
                    </>
                )}
                <div className={`big-img-box bg-${recipe?.cuisine.split(" ").join('').toLowerCase()}`}></div>
                <div className="ing-box">
                    <div className="ing-box-groc-icon"></div>
                    <h2 className="ing-box-title">Ingredients</h2>
                    <div className="recipe-ing-box">
                        {recipe && recipe?.ingredients.map(ingredient => (
                            <div key={`b${ingredient.id}`} className="rec-ing-single-info-container">
                                <div
                                    key={`a${ingredient.id}`}
                                    className="ingredient-icon-box-recipe">
                                    <img className='recipe-ing-icon' src={require(`../../assets/img/ingIcons/${ingredient.ingdata.name.includes("oil") ? 'oil' : ingredient.ingdata.name}.png`).default} />
                                </div>
                                <div key={ingredient.id}> {ingredient.ingdata.name}
                                    {/* {ingredient.measurement} {ingredient.measurement_type} */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="direc-box-1">
                    {recipe && (
                        <div className="quick-info-box">
                            <h2 className="recipe-title">{recipe?.name.length > 31 ? `${recipe?.name.slice(0, 31)} ...` : recipe?.name}</h2>
                            <div className="box-one-dish-icon"></div>
                            <div>
                                <img className='clock-icon-rd' src={require(`../../assets/img/clock.png`).default} />
                                <p className="cooking-time-text">{recipe?.cooking_time}m</p>

                                <img className='cuisine-flag-rd' src={require(`../../assets/img/flagicon/${recipe?.cuisine.split(" ").join('').toLowerCase()}.png`).default} />
                                <p className="cuisine-text">{recipe?.cuisine} Cuisine</p>
                                <p className="serving-text">{recipe?.servings}</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="box-two-direct-icon"></div>
                <h2 className="instructions-title">Instructions</h2>
                <div className="direc-box-2">
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
                <div className="comment-icon"></div>
                <h2 className="comment-box-title">Comments</h2>
                <div></div>
                <div className="direc-box-3">

                    <CommentBox id={id} />
                </div>

            </div><div
                className="cook-bot-container">
                <CookBot />
            </div>
            <p
                ref={ref2}
                className="cookcount-text">{cookcount} humans have tried this</p>

            {user.user_cc?.filter(cc => cc.recipe_id == id).length > 0 ?
                <>
                    <p className="helper-text">Thanks for letting us know!</p>
                    <img
                        onClick={() => adjustCookCount()}
                        className='click-pan-icon' src={require(`../../assets/img/panon.png`).default} />

                </>
                :
                <>
                    <p className="helper-text">Have you tried this dish?</p>
                    <img
                        onClick={() => adjustCookCount()}
                        className='click-pan-icon' src={require(`../../assets/img/panoff.png`).default} />

                </>
            }
            <div className="heart-box">
                {heartAvg == 0 
                ? <img 
                onClick={() => adjustHearts()}
                className='heart-icon' src={require(`../../assets/img/noheart.png`).default} />
                : <img
                onClick={() => adjustHearts()} 
                className='heart-icon' src={require(`../../assets/img/heart.png`).default} />
                }
                <p>{heartAvg}</p>
            </div>
        </div>
    );
}

export default RecipeDetail

