import './index.css'
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { getAllIngredients } from "../../store/ingredient";
import { addARecipe, getAllRecipes } from '../../store/recipe';
import CookBot from '../CookBot';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faFlag } from "@fortawesome/free-solid-svg-icons";

const RecipeForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    ////Below are state variables for controlled inputs
    const [name, setName] = useState();
    const [cooking_time, setCT] = useState();
    const [servings, setServings] = useState();
    const [directions, setDirections] = useState();
    const [cuisine, setCuisine] = useState('Italian');
    const [imgURL, setImgtags] = useState();
    const [ingredients, setIngredients] = useState(1);
    //////////////////////////////////////////////////


    const userId = useSelector(state => state.session.user.id)
    const ingredientsListdata = useSelector(state => Object.values(state.ingredients)[0])
    const [ingredientsList, setIngreList] = useState([])
    const recipe = useSelector(state => Object.values(state.recipes)[0])


    const cuisineArr = ['Italian', 'Thai', 'French', 'Japanese', 'Lebanese', 'Spanish', 'German', 'Korean', 'South African', 'Australian', 'Caribbean', 'Greek', 'Filipino', 'Scottish', 'Indian', 'Mexican', 'Indonesian', 'Brazilian', 'Chinese', 'American']



    useEffect(() => {
        dispatch(getAllIngredients())
        dispatch(getAllRecipes())
    }, [dispatch])

    const submitUpdateForm = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);
        setShowErrors(true);

        const data = {
            name,
            cooking_time,
            servings,
            directions,
            cuisine,
            imgURL,
            ingredients: ingredientsList,
            author_id: userId,
        };

        if (validationErrors.length === 0) {
            let update = await dispatch(addARecipe(data));
            if (update) {
                setValidationErrors([]);
                setHasSubmitted(false);
                await dispatch(getAllRecipes())
                console.log()
                await history.push(`/recipes/${recipe[recipe.length-1]?.id + 1}`)
            }
        }
    };
    const addIngredients = (e) => {
        e.preventDefault();
        setIngreList([...ingredientsList, ingredients])
    }

    useEffect(() => {
        const errors = [];
        // if (content.length <= 0) errors.push("We may need to think of what to write first...");
        // if (content.length >= 250) errors.push("Gather your thoughts, It's way too long...")
        setValidationErrors(errors);
    }, []);



    return (
        <div className='update-form-wrapper'>
            <div className="write-recipe-icon"></div>
            <div className='recipe-form-wrapper'>
                <div className='recipe-form-box'>
                    <h2 className='form-title'>Create a new Recipe!</h2>
                    <form onSubmit={(e) => submitUpdateForm(e)}
                        className='recipe-form'
                    >
                        <div className='input-box-wrapper'>
                            <p className='input-title-label'> Dish Name</p>
                            <input
                                name="name"
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                placeholder="Name of the dish"
                            ></input >
                        </div>
                        <div className='input-box-wrapper'>
                            <p className='input-title-label'> Cook  ... mins</p>
                            <FontAwesomeIcon icon={faClock} className="cook-time-icon" />
                            <input
                                name="cooking_time"
                                type="number"
                                onChange={(e) => setCT(e.target.value)}
                                value={cooking_time}
                                placeholder="30"
                            ></input >
                        </div>

                        <div className='input-box-wrapper'>
                            <p className='input-title-label'> Servings</p>
                            <input
                                name="servings"
                                type="number"
                                onChange={(e) => setServings(e.target.value)}
                                value={servings}
                                placeholder="1"
                            ></input >
                        </div>

                        <div className='input-box-wrapper'>
                            <p className='input-title-label'> Directions</p>
                            <button
                                onClick={(e) => (e.preventDefault())}
                                className='ing-add-button'>+</button>
                            <input
                                name="directions"
                                type="text"
                                onChange={(e) => setDirections(e.target.value)}
                                value={directions}
                                placeholder="Direction goes here..."
                            ></input >
                        </div>

                        <div className='input-box-wrapper'>
                            <p className='input-title-label'> Cuisine</p>
                            <div className='cuisine-flag-marker'>
                                <img className='cuisine-flag-uf' src={require(`../../assets/img/flagicon/${cuisine.split(" ").join('').toLowerCase()}.png`).default} />
                            </div>
                            <select
                                name='cuisine'
                                className='cuisine'
                                value={cuisine}
                                onChange={(e) => (setCuisine(e.target.value))}
                            >
                                {cuisineArr?.map((cuisine, idx) => (
                                    <option
                                        key={idx}
                                        value={cuisine}
                                    >
                                        {cuisine} Cuisine
                                    </option>
                                ))}
                            </select>

                        </div>


                        <div className='input-box-wrapper'>
                            <p className='input-title-label'> Images</p>
                            <input
                                name="imgURL"
                                type="text"
                                onChange={(e) => setImgtags(e.target.value)}
                                value={imgURL}
                                placeholder="Img URL goes here..."
                            ></input >
                        </div>

                        <div className='ingredients-add-box-wrapper'>
                            <p>Ingredients</p>
                            <select
                                name='ingredients'
                                className='ingredients'
                                value={ingredients}
                                onChange={(e) => (setIngredients(e.target.value))}
                            >
                                {ingredientsListdata?.map(ingredient => (
                                    <option
                                        // onClick={addIngredients}
                                        key={ingredient.id}
                                        value={ingredient.id}
                                    >{ingredient.name}</option>
                                ))}
                            </select>
                            <button
                                onClick={(e) => addIngredients(e)}
                                className='ing-add-button'>+</button>
                        </div>
                        <div className='recipe-addeding-box'>
                            <div className='blankblock'></div>
                            {ingredientsList.map(ingredient_id => (
                                <img className='add-ing-icon' src={require(`../../assets/img/ingIcons/${ingredientsListdata[ingredient_id - 1].name.includes("oil") ? 'oil' : ingredientsListdata[ingredient_id - 1].name}.png`).default} />
                            ))}
                        </div>
                        <div>
                            {showErrors && hasSubmitted && (
                                <ul className="errors comment-error">
                                    {validationErrors.map((error) => (
                                        <li key={error}>{error}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <button type="submit" className="recipe-submit-button">
                            SUBMIT
                        </button>
                    </form>
                </div>
            </div>
            <div className='bot-container'>
                <CookBot />
            </div>
        </div>
    )
}

export default RecipeForm