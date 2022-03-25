import React, { Component } from 'react';
import './game.css';

class Game extends Component {
  state = {
    userAnswer: [],
    emptyChoice: false,
  }
  handleClick = (element) => {
    const copyUserAnswer = this.state.userAnswer;
    copyUserAnswer[this.props.currentPage - 1] = Number(element.target.dataset.name)
    this.setState({
      userAnswer: copyUserAnswer,
      emptyChoice: false
    })
  }
  addClass = (element) => {
    if (element === this.state.userAnswer[this.props.currentPage - 1]) {
      return "active"
    } else return null
  }
  handleNextQuest = () => {    
    const { currentPage, updateCurrentPage, updateAnswerFromGame } = this.props;    
    if (this.state.userAnswer[currentPage-1] === undefined){
      this.setState({
        emptyChoice: true
      })
    } else{
    const copyCurrentPage = currentPage + 1;
    updateCurrentPage(copyCurrentPage);
    updateAnswerFromGame(this.state.userAnswer);
    }
  }
  componentDidMount() {
    const copyUserAnswer = [];
    copyUserAnswer.length = this.props.quest.length;
    this.setState({
      userAnswer: copyUserAnswer
    });
  }
  render() {
    const { quest, currentPage } = this.props;
    const task = quest[currentPage - 1];
    // console.log(this.props.quest);
    return (
      <>
        <div className='quest'>
          <div className='title'>{task.title}</div>
          <div data-name="1" className={`answer ${this.addClass(1)}`} onClick={this.handleClick}>{task.answer1}</div>
          <div data-name="2" className={`answer ${this.addClass(2)}`} onClick={this.handleClick}>{task.answer2}</div>
          <div data-name="3" className={`answer ${this.addClass(3)}`} onClick={this.handleClick}>{task.answer3}</div>
          <div data-name="4" className={`answer ${this.addClass(4)}`} onClick={this.handleClick}>{task.answer4}</div>
        </div>
        <div><hr /></div>
        <div>
          <button className='next' onClick={this.handleNextQuest}>Dalej</button>
          {this.state.emptyChoice ? <span className='click'>Zaznacz coś</span> : null}
        </div>
      </>
    );
  }
}

export default Game;