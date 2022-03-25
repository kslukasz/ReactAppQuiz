import React from 'react';
import Button from './Button.js';
import Search from './Search.js'
import './Buttons.css'
function ButtonsFilter(props) {  
  const copyButtons = {...props.buttons};
  const handleFilterButton = (event) => {
    // copyButtons.noFilter = null;
    // copyButtons.newOne = null;
    // copyButtons.priority = null;
    if (event === "noFilter") {
      copyButtons.noFilter = true;
      copyButtons.newOne = null;
      copyButtons.priority = null;
      copyButtons.search="";      
    } else {
      copyButtons.noFilter = null;      
      if (event === "newOne") { copyButtons.priority = null }
      else if (event === "priority") { copyButtons.newOne = null }
      if (event === "newOne" || event === "priority") {
        switch (copyButtons[event]) {
          case null:
            copyButtons[event] = "up"
            break;
          case "up":
            copyButtons[event] = "down";
            break
          case "down":
            copyButtons[event] = "up";
            break
          default:
        }
      }
    }
    props.handleFilter(copyButtons)
  }
  
  return (
    <div className="buttonbox">
      <Button 
      handleFilterButton={handleFilterButton} content={"Bez filtra"} kindOfButton={"noFilter"} copyButtons={copyButtons}/>
      <Button 
      handleFilterButton={handleFilterButton} content={"Nowe"} kindOfButton={"newOne"} copyButtons={copyButtons}/>
      <Button 
      handleFilterButton={handleFilterButton} content={"Piorytet"} kindOfButton={"priority"} copyButtons={copyButtons}/>
      <Search 
      buttons={props.buttons}
      handleSearch={props.handleSearch}/>

      {/* <button className="filter" onClick={() => handleFilterButton("noFilter")}>Bez Filtra <img src={src} className="ico" alt="Down" /></button>
      <button className="filter" onClick={() => handleFilterButton("newOne")}>Nowe <img src={src} className="ico" alt="Down" /></button>
      <button className="filter" onClick={() => handleFilterButton("priority")}>Piorytet <img src={src} className="ico" alt="Down" /></button> */}


      {/* <button className="filter">Nowe</button>
      <button className="filter">Piorytet</button> */}

    </div>
  );
}

export default ButtonsFilter;