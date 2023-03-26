import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './components/controls/Button';
import PopupWithCUForm from './components/popup/PopupWithCUForm';
import { Table } from './components/table/Table';
import { popupToggle } from './store/slices/PopupSlice';
import { IPizzaStateType } from './store/types/pizzaTypes';

function App() {
  const pizzaList:IPizzaStateType[] = useSelector((state:any)=>state.pizzaList)

  const dispatch = useDispatch();




  return (
		<div className="container">
			<Table tableContent={pizzaList} tableType={"pizzaList"} />
			<Button
				className={'btn_regular'}
				innerText={"Add item"}
				onClick={() => dispatch(popupToggle())}
			/>
			<PopupWithCUForm />	
		</div>
  );
}

export default App;
