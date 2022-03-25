import React from 'react';

function Search(props) {
  
  return (     
    <div className='boxinput'>
    <input className={`input ${props.buttons.search === "" ? null : "active"}`} type="text" value={props.buttons.search} onChange={props.handleSearch} />
    </div>  

   );
}

export default Search;