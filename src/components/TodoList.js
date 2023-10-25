import React, { useState, useEffect } from "react";
import "./TodoList.css";

function TodoList() {
  const [items, setItems] = useState([]);
  const [newItems, setNewItems] = useState("");
  const [updatedText, setUpdatedText] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  //adding data from local storage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem("todolist");
    if (savedData) {
      setItems(JSON.parse(savedData));
    }
  }, []);

  const addItem = () => {
    if (newItems) {
      // setItems([
      //   ...items,
      //   { text: newItems, completed: false, bookmark: false },
      // ]);
      // setNewItems("");
      const newItem = { text: newItems, completed: false, bookmark: false };
      const updatedItems = [ ...items, newItem ];
      setItems(updatedItems);
      setNewItems("");
      //saving the updated items to local storage
      localStorage.setItem("todolist", JSON.stringify(updatedItems));
    }
  };

  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    //saving the updated items to local storage
    localStorage.setItem("todolist", JSON.stringify(updatedItems));
  };

  const editHandler = (index) => {
    setUpdatedText(items[index].text);
    setEditIndex(index);
  };

  const saveEdit = (index) => {
    const updatedItems = [...items];
    updatedItems[index].text = updatedText;
    setItems(updatedItems);
    setEditIndex(-1);
    setUpdatedText("");
    //saving the updated items to local storage
    localStorage.setItem("todolist", JSON.stringify(updatedItems));
  };
  // //local storage
  // useEffect(()=>{
  //   let savedTodo = JSON.parse(localStorage.getItem('todolist'));
  //   if(savedTodo){
  //     setToDos(savedTodo)
  //   }
  // },[])

  const completeTaskHandler = (index) => {
    const updatedItems = [...items];
    updatedItems[index].completed = !updatedItems[index].completed;
    setItems(updatedItems);
    //saving the updated items to local storage
    localStorage.setItem("todolist", JSON.stringify(updatedItems));
  };
  const priorityHandler = (index) => {
    // let myObj = {
    //   text: items[index].text,
    //   completed: items[index].completed,
    //   bookmark: !items[index].bookmark,
    // };

    // if(myObj.bookmark){
    //   const updatedItems = [myObj, ...items];
    //   updatedItems.splice(index+1, 1);
    //   setItems(updatedItems);
    //   items[0].bookmark=!items[0].bookmark;
    /*
    const updatedItems = [...items];
    const itemToMove = updatedItems[index];
    //here we are setting the bookmark property of the clicked item to true
    // and we are setting the new items's bookmark property rather than the actual bookmark hence actual bookmark will always be true so no need to make it false afterwards
    itemToMove.bookmark = !itemToMove.bookmark;
    updatedItems.splice(index, 1);
    //adding the item to the top
    if (itemToMove.bookmark) {
      updatedItems.unshift(itemToMove);
    }
    setItems(updatedItems);
    */
    /*Attemp2
    const updatedItems = [...items];
    const itemToMove = updatedItems[index];
    itemToMove.bookmark = !itemToMove.bookmark;
    if(itemToMove.bookmark){
      //if so then move it to the top
      updatedItems.splice(index,1);//removing the item form its current position
      updatedItems.unshift(itemToMove);
    }else{
      // if its unmarked,move it to the original position
      updatedItems.splice(index,1);
      updatedItems.push(itemToMove);
    }
    setItems(updatedItems);
    */

    const updatedItems = [...items];
    const itemToMove = updatedItems[index];
    itemToMove.bookmark = !itemToMove.bookmark;

    // Sort the items based on the bookmark property
    updatedItems.sort((a, b) => b.bookmark - a.bookmark);

    setItems(updatedItems);
    //saving the updated items to local storage
    localStorage.setItem("todolist", JSON.stringify(updatedItems));
  };
  const handleInput = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  };
  const handleEditKeyDown = (e, index) => {
    if (e.key === "Enter") {
      saveEdit(index);
    }
  };
  return (
    <div className="container">
      <h1 className="title">Todo List</h1>
      <div className="input">
        <input
          type="text"
          value={newItems}
          onChange={(e) => setNewItems(e.target.value)}
          placeholder="Add new task"
          onKeyDown={handleInput}
        />
        <div className="button" onClick={addItem}>
          Add
        </div>
      </div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <div className="tasks">
              <div className="left">
                <i
                  className={
                    item.completed
                      ? "fa-regular fa-circle-check complete-check"
                      : "fa-regular fa-circle"
                  }
                  onClick={() => completeTaskHandler(index)}
                ></i>
                {editIndex === index ? (
                  <div>
                    <input
                      className="edit-input"
                      type="text"
                      value={updatedText}
                      onChange={(e) => setUpdatedText(e.target.value)}
                      onKeyDown={(e) => handleEditKeyDown(e, index)}
                    />
                  </div>
                ) : (
                  <p className="actual-task">{item.text}</p>
                )}
              </div>
              <div className="right">
                <i
                  class="fa-regular fa-star"
                  onClick={() => priorityHandler(index)}
                ></i>
                {editIndex !== index ? (
                  <i
                    class="fa-regular fa-pen-to-square edit-icon"
                    onClick={() => editHandler(index)}
                  ></i>
                ) : (
                  <i
                    class="fa-solid fa-check tick-icon"
                    onClick={() => saveEdit(index)}
                  ></i>
                )}
                <i
                  class="fa-regular fa-trash-can delete-icon"
                  onClick={() => deleteItem(index)}
                ></i>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
