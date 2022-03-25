import React from 'react';

function Button(props) {
  const src = "./data/angle-down.svg";
  let buttonClass=null;
  let icoClass=null;
  if (props.copyButtons[props.kindOfButton] !== null) {buttonClass="active"}
  if (props.kindOfButton === "noFilter") {icoClass="nodisplay"};  
  if (props.copyButtons[props.kindOfButton] === "down") {icoClass=null};
  if (props.copyButtons[props.kindOfButton] === "up") {icoClass="rotate"};
  return ( 
    <button className={`filter ${buttonClass}`} onClick={() => props.handleFilterButton(props.kindOfButton)}>{props.content}<img src={src} className={`ico ${icoClass}`} alt="?" /></button>
   );
}

export default Button;