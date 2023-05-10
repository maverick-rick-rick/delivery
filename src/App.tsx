import React from "react";
import { useSelector } from "react-redux";
import PopupsController from "./components/popups/PopupsController";
import { PizzaListTable } from "./components/table/PizzaListTable";
import { IPizzaStateType } from "./store/types/pizzaTypes";

function App() {
	const pizzaList: IPizzaStateType[] = useSelector(
		(state: any) => state.pizzaList
	);

	return (
		<div className="container">
			<PizzaListTable tableContent={pizzaList} />
			<PopupsController />
		</div>
	);
}

export default App;
