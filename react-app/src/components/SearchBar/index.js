import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './index.css'


const SearchBar = () => {
    const history = useHistory()

    const recipes = useSelector(state => state.recipes)
    const recipelist = Object.values(recipes).map(recipe => [recipe.id, recipe.name])

    const [filteredList, setFilteredList] = useState([])
    const [searchWord, setSearchWord] = useState("")

    useEffect(() => {
        setFilteredList(recipelist.filter(recipe => recipe[1].toLowerCase().includes(searchWord.toLowerCase())))
    }, [searchWord])

    function handleSubmit(e) {
        e.preventDefault();
        if (filteredList.length > 0) {
            history.push(`/recipes/${filteredList[0][0]}`)
        }
    }

    return (
        <div className='search-bar-box'>
            <h1 className='search-bar-title'>Search</h1>
            <form className='search-bar-form' onSubmit={e => handleSubmit(e)}>
            <input
                type="text"
                value={searchWord}
                onChange={e => setSearchWord(e.target.value)}
                className='search-bar-input'
                placeholder='Search for recipes...'
            />
            </form>
            {searchWord != '' && (
                <div>
                    <ul className='searchresult-list'>
                        {filteredList.length > 0 ? filteredList.slice(0,5).map((recipe,idx) => (
                            <li
                                key={idx}
                                value={recipe.name}
                                onClick={() => history.push(`/recipes/${recipe[0]}`)}
                            >{recipe[1].length > 20 ? `${recipe[1].slice(0,20)}...` : recipe[1]}</li>
                        )) : <><p 
                        onClick={() => history.push('/recipes/add')}
                        className='empty-search-text'>No Recipe Found... Maybe we can create the missing recipe?</p>
                        <p onClick={() => history.push('/recipes/add')} className='empty-search-click'>create</p>
                        </>}
                    </ul>
                </div>
            )}
        </div>

    )
}

export default SearchBar


