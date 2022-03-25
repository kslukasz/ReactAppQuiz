import React from 'react';
import Task from './Task.js'
const ShowList = (props) => {
  // console.log(props.list)
  const copyList = props.list.map(function (element) {    
    if (element.checked === props.checked) {     
      return (        
        <Task key={element.id}
        element={element}
        handleCheckbox={() => { props.handleCheckbox(element.id) }}
        handleClickDelete={() => { props.handleClickDelete(element.id) }}
        />       
      )
    } else return null
  })
  return copyList
}

export default ShowList;
