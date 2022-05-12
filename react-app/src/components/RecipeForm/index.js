import './index.css'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { getAllIngredients } from "../../store/ingredient";
import { addARecipe } from '../../store/recipe';

const RecipeForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    ////Below are state variables for controlled inputs
    const [name, setName] = useState();
    const [cooking_time, setCT] = useState();
    const [servings, setServings] = useState();
    const [directions, setDirections] = useState();
    const [cuisine, setCuisine] = useState();
    const [imgURL, setImgtags] = useState();
    const [ingredients, setIngredients] = useState();
    //////////////////////////////////////////////////
    

    const userId = useSelector(state => state.session.user.id)
    const ingredientsListdata = useSelector(state => Object.values(state.ingredients)[0])
    // const [ingredientsList, setIngreList] = useState([])

    const cuisineArr = [
        'Italian',
        'Thai',
        'French',
        'Japanese',
        'Lebanese',
        'Spanish',
        'German',
        'Korean',
        'South African',
        'Australian',
        'Caribbean',
        'Greek',
        'Filipino',
        'Scottish',
        'Indian',
        'Mexican',
        'Indonesian',
        'Brazilian',
        'Chinese',
        'American'
    ]

    useEffect(() => {
        dispatch(getAllIngredients())
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
            ingredients,
            author_id: userId,
        };

        if (validationErrors.length === 0) {
            let update = await dispatch(addARecipe(data));
            if (update) {
                //setContent('')
                setValidationErrors([]);
                setHasSubmitted(false);
                //edit.setShowEdit('');
                console.log(data)
                history.push('/')
            }
        }
    };
    // const addIngredients = () => {
    //     if (ingredientsList.length === 0) {
    //         let arr = [ingredients]
    //         setIngreList([...arr])
    //         console.log('-=-=---=-==-',ingredientsList)
    //     } else {
    //         let arr = [...ingredientsList, ingredients]
    //         setIngreList(arr)
    //         console.log('-=-=---=-==-',ingredientsList)
    //     }
    //     // arr.push(ingredients)
    //     // setIngreList(arr)
        
    // }

    useEffect(() => {
        const errors = [];
        // if (content.length <= 0) errors.push("We may need to think of what to write first...");
        // if (content.length >= 250) errors.push("Gather your thoughts, It's way too long...")
        setValidationErrors(errors);
    }, []);



    return (
        <div className='recipe-form-wrapper'>
            <form onSubmit={(e) => submitUpdateForm(e)}
                className='recipe-form'
            >
                <input
                    name="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Name of the dish"
                ></input >
                <input
                    name="cooking_time"
                    type="number"
                    onChange={(e) => setCT(e.target.value)}
                    value={cooking_time}
                    placeholder="30"
                ></input > mins

                <p>serving size</p>
                <input
                    name="servings"
                    type="number"
                    onChange={(e) => setServings(e.target.value)}
                    value={servings}
                    placeholder="1"
                ></input >

                <p>Directions</p>
                <input
                    name="directions"
                    type="text"
                    onChange={(e) => setDirections(e.target.value)}
                    value={directions}
                    placeholder="Direction goes here..."
                ></input >

                <p>Cuisine</p>
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
                        >{cuisine} Cuisine
                        </option>
                    ))}
                </select>


                <p>Image URL</p>
                <input
                    name="imgURL"
                    type="text"
                    onChange={(e) => setImgtags(e.target.value)}
                    value={imgURL}
                    placeholder="Img URL goes here..."
                ></input >

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
                // onClick={addIngredients}
                className='ing-add-button'>Add</button>

                <div>
                    {showErrors && hasSubmitted && (
                        <ul className="errors comment-error">
                            {validationErrors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    )}
                </div>
                <button type="submit" className="">
                    SUBMIT
                </button>
            </form>

        </div>
    )
}

export default RecipeForm