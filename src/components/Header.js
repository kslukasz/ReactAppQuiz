import React, { useState } from 'react';
import './Header.css';

const Header = (props) => {

  const [id, setId] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(getTodayDate());
  const [classPriority, setClassPriority] = useState(false);

  function getTodayDate() {
    const date = new Date();
    const today = date.getFullYear() + "-" + (date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1) + "-" + (date.getDate() < 10 ? `0${date.getDate()}` : date.getDate());
    return today
  }

  const handlePriorityCheckbox = () => {
    setClassPriority(!classPriority)
  }

  const handleChoiceDate = (event) => {
    setDate(event.target.value)
  }

  const handleTextArea = (event) => {
    setContent(event.target.value);
    setId((props.listLength + 1) + "A");
  }

  const addTask = () => {
    const element = {
      id: id,
      checked: false,
      content: content,
      date: date,
      classPriority: classPriority,
    }
    props.handleAddElement(element);
    setId("");
    setContent("");
    setDate(getTodayDate());
    setClassPriority(false);
  }

  return (
    <div className="header">
      <textarea className="textarea" placeholder='Wpisz coś...' value={content} onChange={handleTextArea}></textarea>
      <div className="datelabel">
        <span> Do kiedy wykonać:</span>
        <input className="dateinput" type="date" min={getTodayDate()} value={date} onChange={handleChoiceDate} />
        <div className="checkbox">
          <input className="box2" type="checkbox" onChange={handlePriorityCheckbox} checked={classPriority} />
          <span style={{ color: "red" }}>Piorytet ?</span>
        </div>
      </div>
      <button className="add" onClick={addTask}
      >Dodaj zadanie</button>
    </div>
  );
}

export default Header