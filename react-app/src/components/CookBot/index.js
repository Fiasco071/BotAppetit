import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllRecipes } from '../../store/recipe';
import './index.css'



const CookBot = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const [showList, setShowList] = useState(false)
    const recipes = useSelector(state => Object.values(state.recipes)[0])

    const updateFormlink = () => {
        history.push('/recipes/add')
    }

    useEffect(() => {
        dispatch(getAllRecipes())
    }, [dispatch])


    return (
        <div className='bot-wrapper'>
            <p className="bubble thought"
                onClick={updateFormlink}
            >Maybe display some ingredients icons here?</p>
            <div className='bot-head'></div>
            <div className='bot-side'></div>
            <div className='bot-face'>
                <div className='bot-face-screen'>
                    {!showList && (
                        <div className="bot-eyes"></div>
                    )}
                    <div className='recipe-list'>
                        {showList && recipes.map(recipe => (
                            <div
                            key={recipe.id}
                            onClick={() => history.push(`/recipes/${recipe.id}`)}
                            >{recipe.name}</div>
                        ))}
                    </div>
                </div>
                <div className='ing-dnd'>
                    <div className='bot-stomach-lid'></div>
                    <div className='bot-stomach-lid-side'></div>
                </div>
            </div>
            <div className="left-arm"></div>
            <div className="right-arm"></div>
            <div>
                <div className="left-leg">

                </div>
                <div className='left-foot'></div>
                <div className="right-leg"></div>
                <div className='right-foot'></div>
                <div
                    onClick={() => setShowList(!showList)}
                    className='logo'>BOT</div>
            </div>
        </div>
    );
}

export default CookBot