import CookBot from "../CookBot";
import './index.css'

import { useEffect, useRef, useState } from "react";
import { getAllIngredients } from "../../store/ingredient";
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from "../../store/recipe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faFlag } from "@fortawesome/free-solid-svg-icons";
import CommentBox from "../CommentBox";
import { updateUser } from "../../store/session";
import Test from "../test";



const Home = () => {
    const dispatch = useDispatch()
    const ref = useRef(null);

    const ingredients = useSelector(state => Object.values(state.ingredients))
    const recipes = useSelector(state => Object.values(state.recipes))
    

    //Recipe instruction break down
    let instructionArr;

    if (recipes) {
        instructionArr = recipes[0]?.directions.split("$")
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


    useEffect(() => {
        dispatch(getAllIngredients())
        dispatch(getAllRecipes())
        dispatch(updateUser())
    }, [dispatch])



    return (
        <div className="home-wrapper">
            <div className="recipe-box">
                <Test/>
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

export default Home