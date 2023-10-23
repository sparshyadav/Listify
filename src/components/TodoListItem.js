import React from "react";
import './TodoListItem.css';

export default function TodoListItem(props) {
    return (
        <li key={props.keys}>
            <div className="tasks">
                <div className="left">
                    <i class="fa-regular fa-circle"></i>
                    <p>{props.task}</p>
                </div>
                <div className="right">
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-pen-to-square"></i>
                    <i class="fa-regular fa-trash-can"></i>
                </div>
            </div>
        </li>
    )
}