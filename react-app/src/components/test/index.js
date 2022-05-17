import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { getAllIngredients } from '../../store/ingredient';
import './index.css'

const Test = ({ingredients}) => {
  // const dispatch = useDispatch();
  // const ingredients = useSelector(state => Object.values(state.ingredients))


  // useEffect(() => {
  //   dispatch(getAllIngredients())
  // }, [dispatch])

  const columnsFromBackend = {
    ["box1"]: {
      name: "IngBox",
      items: ingredients.map(ing => {
        return { id: `${ing.id}`, name: ing.name }
      })
    },
    ["box2"]: {
      name: "RobotPouch",
      items: []
    }
  };

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

  const [columns, setColumns] = useState(columnsFromBackend);

  return (
    <>
    <div className='bubble-thought-search'>
      {columns.box2.items.map(ing => (
        <img className='dnd-ing-icons' src={require(`../../assets/img/ingIcons/${ing.name.toLowerCase().includes("oil") ? 'oil' : ing.name}.png`).default} />
      ))}
    </div>
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
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
        })}
      </DragDropContext>
    </div>
    </>
  );
}

export default Test;
