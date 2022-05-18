import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useHistory } from 'react-router-dom'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { getAllIngredients } from '../../store/ingredient';
import './index.css'




const Test = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(state => Object.values(state.ingredients))
  const history = useHistory()
  // Race conditions is confirmed, JSX renders before dispatch calls on refresh

  const [columns, setColumns] = useState({});


  /// understand this to resolve race condition with jsx vs useEfefect
  /// useEffect is put in to a queue and held while the remainder of codes are ran
  /// so that empty values issue happne because the JSX renders first and state variable is initially set to [] and that iwlil be populated first
  // after that loads, useEffect will finish running 
  // and doing below is to better control the data flow and to avoid the above issue
  // And these line by line are being placed into a queue in order.
  useEffect(() => {
    (async () => {
      let { ingredients } = await dispatch(getAllIngredients())
      const columnsFromBackend = {
        ["box1"]: {
          name: "IngBox",
          items: ingredients.length > 0 ? ingredients.map(ing => {
            return { id: `${ing.id}`, name: ing.name }
          }) : [{ id: '123', name: 'apple' }, { id: '123456', name: 'pork' }]
        },
        ["box2"]: {
          name: "RobotPouch",
          items: []
        }
      };

      setColumns(columnsFromBackend)
    })();
  }, [dispatch])


  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (destination.droppableId == "box2") console.log(columns.box2.items);

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  const handleSearch = async () => {
    if (columns.box2.items.length > 0) {
      console.log(columns.box2.items)
      const result = columns?.box2?.items.map(item => item.name)
      const response = await fetch(`/api/recipes/searchlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "searchlist": result }),
      });
      const data = await response.json();
      console.log(data)
      history.push(`/recipes/${data['recipe_id']}`)
    }
  }


  return (
    <>
      <div 
      onClick={handleSearch}
      className='bubble-thought-search'>
        {columns?.box2?.items.map(ing => (
          <img className='dnd-ing-icons' src={require(`../../assets/img/ingIcons/${ing.name.toLowerCase().includes("oil") ? 'oil' : ing.name}.png`).default} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).length > 0 ? Object.entries(columns)?.map(([columnId, column], index) => {
            return (
              <div
                className='dnd-box-wrapper'
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
                key={columnId}
              >
                <div className='dnd-box'>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          className='dnd-active-box'
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div className='individual-ing-dnd-icon'
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}

                                    >
                                      <img className='dnd-ing-icons' src={require(`../../assets/img/ingIcons/${item.name.toLowerCase().includes("oil") ? 'oil' : item.name}.png`).default} />
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          }) : null}
        </DragDropContext>
      </div>
    </>
  );
}

export default Test;
