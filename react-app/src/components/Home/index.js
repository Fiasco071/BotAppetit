import CookBot from "../CookBot";
import './index.css'

import { useEffect, useRef, useState } from "react";
import { getAllIngredients } from "../../store/ingredient";
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from "../../store/recipe";
import CommentBox from "../CommentBox";
import { updateUser } from "../../store/session";
import Test from "../test";



const Home = () => {
    const dispatch = useDispatch()
    const ref = useRef(null);
    const ref2 = useRef(null)

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
            ref2.current.classList.add('showingtab')
            setSliderFlag(true)
        } else {
            ref.current.classList.remove("slideanimation");
            ref2.current.classList.remove('showingtab')
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