import React from "react";

import { IPizzaStateType } from "../../store/types/pizzaTypes";
import { keyGenerator } from "../../utilities/keygen";
import { TableRowEmpty } from "./TableRow-entities/TableRowEmpty";
import { TableRowForPizzaList } from "./TableRow-entities/TableRowForPizzaList";

import classes from "./../../style_modules/table/Table.module.css";
import PizzaTableHeader from "./TableHeader-entities/PizzaTableHeader";

type TablePros = {
	tableContent: IPizzaStateType[] | string[];
};

// functions which checks equality table content to some type

function isType(obj: any): obj is IPizzaStateType {
	return true;
}

export const PizzaListTable = (props: TablePros) => {
	const { tableContent } = props;

	return (
		<div className={classes.table}>
			<PizzaTableHeader /> 
			{tableContent.length === 0 ? (
				<TableRowEmpty />
			) : (
				tableContent.map((element) => {
					return isType(element) ? (
						<TableRowForPizzaList
							key={element.id}
							rowContent={element}
						/>
					) : (
						<TableRowEmpty key={keyGenerator()} />
					);
				})
			)}
		</div>
	);
};
