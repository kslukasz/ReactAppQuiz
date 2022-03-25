import React, { Component } from 'react';
import Game from './Game.js'
import Result from './Result.js'
import './App.css';
const API = "data/quiz.json";

class App extends Component {
  state = {
    quest: ["", ""],
    userAnswerFromGame: [],
    currentPage: 1,
    numberOfQuestions: 5,
    loadedData: false,
    loadedError: "Ładowanie danych, poczekaj lub odśwież stronę"

  }

  createHeaderContent() { //funkcja tworzy nagłówek i wyświetla numer pytania, tylko jeśli numer strony nie jest większy od currentPage
    const { quest, currentPage } = this.state;
    if (currentPage > quest.length) {
      return "Wyniki"
    } else if (!this.state.loadedData) {
      return "Ładowanie..."
    } else {
      const result = `Pytanie ${currentPage} z ${quest.length}`;
      return result;
    }
  }
  updateCurrentPage = (page) => { //aktualizuje currentPage (z komponentu Game)
    this.setState({
      currentPage: page
    })
  }
  updateAnswerFromGame = (answers) => { // jw dla odpowiedzi użytkownika
    this.setState({
      userAnswerFromGame: answers
    })
  }
  reset = () => {
    this.setState({
      userAnswerFromGame: [],
      currentPage: 1,
      loadedData: false,
      loadedError: "Ładowanie danych, poczekaj lub odśwież stronę"
    });
    this.fetchData();
  }
  randomQuest = (allQuest, end) => { //losowanie pytań , każde pytanie jest inne
    let i = 0;
    const resultTable = [];
    while (i < end) {
      i++;
      const index = Math.floor(Math.random() * (allQuest.length));
      const element = allQuest.splice(index, 1);
      resultTable.push(element[0]);
    } return resultTable
  }
  fetchData = () => { //pobieranie danych z pliku .json
    fetch(API)
      .then(response => response.json())
      .then(data => {
        const allQuest = data.quest;
        const result = this.randomQuest(allQuest, this.state.numberOfQuestions);
        // console.log(allQuest,result)       
        this.setState({
          loadedData: true,
          quest: result
        });
      })
      .catch(() => {
        this.setState({
          loadedError: "Ups, coś poszło nie tak...", //wyświetlanie błędu
        })
      })
  }
  componentDidMount() {
    this.fetchData()
  }
  render() {
    const { quest, userAnswerFromGame, currentPage } = this.state;    
    const header = (<>
      <div className='header'>
        <div>{this.createHeaderContent()}</div>
        <div style={{ display: "none" }}>menu</div>
      </div>
      <div> <hr /></div>
    </>);
    let contentPage= "";
      if (currentPage > quest.length){
        contentPage= (<Result //render komponentu Result
          quest={quest}
          answer={userAnswerFromGame}
          reset={this.reset}
        />)
      } else if (this.state.loadedData) {
        contentPage = (<Game //render komponentu Game
          quest={quest}
          currentPage={currentPage}
          updateCurrentPage={this.updateCurrentPage}
          updateAnswerFromGame={this.updateAnswerFromGame}
        />)
      } else {contentPage = this.state.loadedError}
    return (
      <>
        <div className='contener'>
          {header}
          {contentPage}

          {/* alternatywny kod, działa tak samo ale mniej czytelny  */}
          {/* <div className='header'>
            <div>{this.createHeaderContent()}</div>
            <div style={{display:"none"}}>menu</div>
          </div>
          <div> <hr /></div>
          {(currentPage > quest.length) ?
            <Result //render komponentu Result
              quest={quest}
              answer={userAnswerFromGame}
              reset={this.reset}
            />
            : this.state.loadedData ? <Game //render komponentu Game
              quest={quest}
              currentPage={currentPage}
              updateCurrentPage={this.updateCurrentPage}
              updateAnswerFromGame={this.updateAnswerFromGame}
            />
              : this.state.loadedError} */}
        </div>
      </>
    );
  }
}

export default App;
