import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './components/controls/Button';
import PopupsController from './components/popup/PopupsController';
import { Table } from './components/table/Table';
import { POPUP_CU_FORM } from './constants/popupConstants';
import { popupToggle } from './store/slices/popup/PopupsSlice';
import { IPizzaStateType } from './store/types/pizzaTypes';

function App() {
  const pizzaList:IPizzaStateType[] = useSelector((state:any)=>state.pizzaList)

  const dispatch = useDispatch();

	const popupHandler = (str : string) => {
		dispatch(popupToggle(str))
	}



  return (
		<div className="container">
			<Table tableContent={pizzaList} tableType={"pizzaList"} />
			<Button
				className={"btn_regular"}
				innerText={"Add item"}
				onClick={() => popupHandler(POPUP_CU_FORM)}
			/>
			<PopupsController />
		</div>
  );
}

export default App;
