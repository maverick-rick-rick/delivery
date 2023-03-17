import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { FormCU } from './components/form/FormCU';
import Popup from './components/popup/Popup';
import { Table } from './components/table/Table';
import { IPizzaStateType } from './store/types/pizzaTypes';

function App() {
  const pizzaList:IPizzaStateType[] = useSelector((state:any)=>state.pizzaList)



  return (
    <div className="App">
      <Table tableContent={pizzaList} tableType={'pizzaList'} />
      <FormCU/>
      <Popup/>
    </div>
  );
}

export default App;
