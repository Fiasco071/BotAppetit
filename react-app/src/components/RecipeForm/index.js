import './index.css'
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { getAllIngredients } from "../../store/ingredient";
import { addARecipe, getAllRecipes, updateARecipe } from '../../store/recipe';
import CookBot from '../CookBot';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";


const RecipeForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const { id } = useParams();
    const recipe = useSelector(state => state.recipes)
    const filteredResult = recipe[id]

    const saved_ing_list = filteredResult?.ingredients?.map(ing => ing.ingdata.id)

    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    //backend errors
    const [errors, setErrors] = useState([]);

    const [errors2, setErrors2] = useState([]);
    ////Below are state variables for controlled inputs
    const [name, setName] = useState(filteredResult ? filteredResult?.name : '');
    const [cooking_time, setCT] = useState(filteredResult ? filteredResult?.cooking_time : '');
    const [servings, setServings] = useState(filteredResult ? filteredResult?.servings : '');
    const [directions, setDirections] = useState(filteredResult ? filteredResult?.directions : '');
    const [cuisine, setCuisine] = useState(filteredResult ? filteredResult?.cuisine : 'Italian');
    const [imgURL, setImgtags] = useState(filteredResult ? filteredResult?.imgURL : '');
    const [ingredients, setIngredients] = useState(1);
    //////////////////////////////////////////////////

    ///////////////////////////////////////////////////
    const testArr = []
    const directions_list = filteredResult?.directions?.split("$")
    directions_list?.forEach(direction => {
        testArr.push({ direction })
    })
    const [valueList, setValueList] = useState(testArr?.length > 0 ? testArr : [{ direction: '' }])

    

    const handleChange = (i, e) => {
        let newFormValues = [...valueList];
        newFormValues[i][e.target.name] = e.target.value;
        setValueList(newFormValues);
        setDirections(valueList.map(value => value.direction).join('$'))
    }

    const addFormFields = (e) => {
        e.preventDefault()
        setValueList([...valueList, { direction: "" }])
        setDirections(valueList.map(value => value.direction).join('$'))
    }


    const removeFormFields = (i) => {
        let newFormValues = [...valueList];
        newFormValues.splice(i, 1);
        setValueList(newFormValues)

        //deconstruct directions and update the directions with last $ removed
        const test = directions.split("$")
        test.splice(i,1)
        setDirections(test.join('$'))
    }
    ///////////////////////////////////////////////////

    const userId = useSelector(state => state.session.user.id)
    const ingredientsListdata = useSelector(state => state.ingredients)
    const [ingredientsList, setIngreList] = useState(saved_ing_list ? saved_ing_list : [])

    const ref = useRef(null)



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

        if (validationErrors.length === 0 && errors.length === 0) {
            if (id) {
                let update = await dispatch(updateARecipe(id, data));
                if (update.errors) {
                    setErrors2(update.errors)
                    // console.log('-=-=-=-=--=-=-=-=-=-hit error')
                } else if (update && !update.errors) {
                    // console.log('-=-=-=-=--=-=-=-=-==-=-=--=-=-=-=-=--=-update route')
                    setValidationErrors([]);
                    setHasSubmitted(false);
                    await history.push(`/recipes/${id}`)
                }
            } else {
                let update = await dispatch(addARecipe(data));
                if (update) {
                    setValidationErrors([]);
                    // console.log('-=-=-=-=--=-=-=-=-==-=-=--=-=-=-=-=--=-create')
                    setHasSubmitted(false);
                    history.push(`/recipes/${update.id}`)
                }
            }
        }
    };
    const addIngredients = (e) => {
        e.preventDefault();
        setIngreList([...ingredientsList, ingredients])
    }

    const clearIngBasket = () => {
        // ref.current.innerHTML=''
        setIngreList([])
    }

    const checkForName = (value) => {
        const copy = recipe
        if (id) delete copy[id]
        // console.log(Object.values(copy).filter((recipe)=> recipe.name === name).length > 0)
        return Object.values(copy).filter((recipe)=> recipe.name === value).length > 0

    }

    useEffect(() => {
        const errorslist = []
        if (name.length === 0 || name.length >= 100) errorslist.push({ 'name': 'We need a title and 100 characters or less!' })
        // if (cooking_time === '') errorslist.push({ 'cooking time': 'Cooking time needs a number!' })
        // if (servings === '') errorslist.push({ "servings": "Let's provide a serving size for this." })
        if (directions === '') errorslist.push({ "directions": "MISSING DIRECTIONS for the fleshlings." })
        if (ingredientsList.length <= 0) errorslist.push({ 'ingredients': "Maybe some ingredients for the recipe?" })
        if (checkForName(name)) errorslist.push({'name' : 'A Recipe with this name already exists!'})
        if (cooking_time <= 0 ) errorslist.push({'cooking time' : 'Cooking time needs a POSITIVE number.'})

        if (cooking_time > 600 ) errorslist.push({"cooking time" : "We need to cook, not forge vibranium. Let's try to keep cook time below 600m"})
        if (servings > 100 ) errorslist.push({'servings' : 'Are we feeding a village? Try to keep servings down below 100'})

        if (servings <= 0 ) errorslist.push({'servings' : 'Servings needs a POSITIVE number.'})
        if (directions.length >= 10000) errorslist.push({'directions' : 'directions cannot be longer than 10,000 characters'})
        setErrors(errorslist)
    }, [name, cooking_time, servings, directions, cuisine, ingredientsList])

    return (
        <div className='update-form-wrapper'>
            {errors2 && errors.length != 0 && hasSubmitted === true && (
                <div className={`angry-bot-face ${errors.length > 0 ? 'showbotface' : null}`}>
                    <div className='angry-bot-eye l'></div>
                    <div className='angry-bot-eye r'></div>
                    <div className='angry-bot-mouth'></div>
                    
                </div>
            )}
            <div className="write-recipe-icon"></div>
            <div className='recipe-form-wrapper'>
                <div className='recipe-form-box'>
                    <h2 className='form-title'>
                        {id ? 'Update this Recipe' : 'Create a new Recipe'}
                    </h2>
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


                        <p className='input-title-label'> Directions</p>
                        <button
                            onClick={(e) => addFormFields(e)}
                            className='ing-add-button directionsbutton'>+</button>


                        <div className='input-box-wrapper'>
                            <input
                                className='hidden-input-box'
                                name="directions"
                                type="text"
                                onChange={(e) => setDirections(e.target.value)}
                                value={directions}
                                placeholder="Direction goes here..."
                            ></input >

                            {/* multi add */}
                            {valueList.map((ele, idx) => (
                                <div className="multiaddbox" key={idx}>
                                    <label>{`Step ${idx + 1}`}</label>
                                    {idx ? <p className="multibox-remove" onClick={() => removeFormFields(idx)}>-</p> : null}
                                    <input type="text" name="direction" value={ele.direction || ""} onChange={e => handleChange(idx, e)} />
                                </div>
                            ))}


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
                                {Object.values(ingredientsListdata)?.map(ingredient => (
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
                            <p className='clear-button' onClick={clearIngBasket}>clear</p>
                            <div ref={ref} className='blankblock'></div>
                            {ingredientsList && ingredientsList?.map(ingredient_id => (
                                <img 
                                key={ingredient_id}
                                className='add-ing-icon' src={require(`../../assets/img/ingIcons/${ingredientsListdata[ingredient_id]?.name?.includes("oil") ? 'oil' : ingredientsListdata[ingredient_id]?.name}.png`).default} />
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
                            {id ? 'UPDATE' : 'SUBMIT'}
                        </button>
                    </form>
                </div>
            </div>
            <div className='recipe-validation-error-box'>
                {errors.length > 0 && hasSubmitted ?
                    <h2 className='error-validation-title'></h2> : <h2 className='recipe-create-greetmsg'>What are we making??</h2>
                }
                <div>
                    {errors.length > 0 && hasSubmitted && errors.map(error => (
                        <div>{Object.values(error)}</div>
                    ))}

                    {errors2.length != 0 && errors2.map(error => (
                        <div>{error}</div>
                    ))}
                </div>
            </div>
            <div className='bot-container'>
                <CookBot />
            </div>
        </div>
    )
}

export default RecipeForm