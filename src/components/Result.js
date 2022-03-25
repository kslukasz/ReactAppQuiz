import React from 'react';
import './game.css';

function Result(props) {
  const { quest, answer } = props
  let id = 0;
  let score = 0;
  const result = quest.map((element, index) => {
    id++;
    function addClass(task) {
      if (element.right === task && answer[index] === task) {
        score++;
        return "good"        
      } else if (element.right === task) {        
        return "good"
      } else if (answer[index] === task) {       
        return "bad"
      }
    }
    return (
      <div key={id + "a"}>
        <div className='quest'>
          <div className='title'>{element.title}</div>
          <div data-name="1" className={`answer ${addClass(1)}`}>{element.answer1}</div>
          <div data-name="2" className={`answer ${addClass(2)}`}>{element.answer2}</div>
          <div data-name="3" className={`answer ${addClass(3)}`}>{element.answer3}</div>
          <div data-name="4" className={`answer ${addClass(4)}`}>{element.answer4}</div>
        </div>
        <div><hr /></div>
      </div>      
    )
  })
  
  return (<>
    <div>{`Twój wynik to ${score} na ${quest.length} - ${Math.floor((score/quest.length)*100)}%`} <button className='next'onClick={props.reset}>Od początku</button> </div>
    <div><hr /></div>
    {result}
  </>);
}

export default Result;
