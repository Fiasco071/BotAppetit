import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipes } from '../../store/recipe'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { getAllIngredients } from '../../store/ingredient';
import './index.css'

const Test = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(state => Object.values(state.ingredients))
  const [ingList, setIngList ] = useState(ingredients)

  const onEnd = (result) => {
    console.log(result)
    setIngList(reorder(ingList, result.source?.index, result.destination?.index))
  }

  const reorder = (list, startIdx, endIdx) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIdx, 1);
    result.splice(endIdx, 0 ,removed)

    return result
  }

  useEffect(() => {
    dispatch(getAllIngredients())
    setIngList(ingredients)
  }, [dispatch])

  return (
    <div className='testroom'>

      <DragDropContext onDragEnd={onEnd}>
      <Droppable
          droppableId='ingInventory'
        >
          {(provided, snapshot) => (
            <div className='testroom'
              ref={provided.innerRef}
            >
              {ingList?.map((ing, idx) => (
                <Draggable
                  draggableId={`${ing.id}`}
                  key={ing.id}
                  index={idx}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div>

                      <img className='dnd-ing-icons' src={require(`../../assets/img/ingIcons/${ing?.name.includes("oil") ? 'oil' : ing?.name}.png`).default} />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable
          droppableId='robot-pocket'
        >
          {(provided, snapshot) => (
            <div
              className='robot-pocket-rec'
              ref={provided.innerRef}
            >
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default Test