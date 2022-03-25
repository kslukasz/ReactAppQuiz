import React from 'react';
import './Task.css'

function Task(props) {
  const {classPriority , id , checked , content , date } = props.element
  return ( 
       <div className="task">
          <div className={`content ${classPriority ? "red" : null }`}><input type="checkbox" className="box1" onChange={() => { props.handleCheckbox(id) }} checked={checked} /><span className="taskcontent" onClick={() => { props.handleCheckbox(id) }}>{content}</span></div>
          <div className="date"><span>Wykonaj Do: {date}</span><button onClick={() => { props.handleClickDelete(id) }} className="delete">USUŃ</button></div>
        </div>
   );
}

export default Task;