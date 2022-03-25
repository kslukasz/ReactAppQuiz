import React, { useState, useEffect } from 'react';
import ShowList from './ShowList.js';
import FiltratedList from './FiltratedList.js'
import Header from './Header.js';
import ButtonsFilter from './ButtonsFilter.js'
import Title from './Title.js';
import './App.css';

const App = () => {
  const [list, setList] = useState([]);
  const [buttons, setButtons] = useState({
    noFilter: true,
    newOne: null,
    priority: null,
    search: "",
  });
  const [storageTest, setStorageTest] = useState(false)

  const handleAddElement = (element) => {
    if ((element.content).trim() !== "") {
      const copyList = [...list];
      copyList.unshift(element);
      setList(copyList);
      saveLocalStorage(copyList);
    }
  }

  const handleClickDelete = (element) => {
    const copyList = [...list];
    const index = copyList.findIndex((e) => e.id === element);
    copyList.splice(index, 1);
    setList(copyList);
    saveLocalStorage(copyList);
  }

  const handleCheckbox = (element) => {
    const copyList = [...list];
    const index = copyList.findIndex((e) => e.id === element);
    copyList[index].checked = !copyList[index].checked;
    setList(copyList);
    saveLocalStorage(copyList);
  }

  const handleFilter = (element) => {
    setButtons(element);
  }

  const handleSearch = (element) => {
    const copyButtons = { ...buttons };
    copyButtons.search = element.target.value
    setButtons(copyButtons);
  }

  function testLocalStorage() {
    try {
      localStorage.setItem("test", "test");
      localStorage.removeItem("test");
      return true;
    } catch (event) {
      return false;
    }
  }

  function saveLocalStorage(copyList) {
    if (storageTest) {
      localStorage.setItem("dataList", JSON.stringify(copyList))
    }
  }


  useEffect(() => {
    const testResult = testLocalStorage();
    const storageList = JSON.parse(localStorage.getItem("dataList"));
    if (testResult && storageList !== null) {
      setList(storageList);
    }
    setStorageTest(testResult);
  }, [])

  return (
    <>
      <div className="box">
        <Header
          listLength={list.length}
          handleAddElement={handleAddElement} />
        <ButtonsFilter
          handleFilter={handleFilter}
          handleSearch={handleSearch}
          buttons={buttons} />
      </div>
      <Title content="Zadania do wykonia" />
      <ShowList
        checked={false}
        list={FiltratedList(list, buttons)}
        handleCheckbox={handleCheckbox}
        handleClickDelete={handleClickDelete} />
      <Title content="Zadania wykonane" />
      <ShowList
        checked={true}
        list={FiltratedList(list, buttons)}
        handleCheckbox={handleCheckbox}
        handleClickDelete={handleClickDelete} />
    </>
  );
}

export default App;
