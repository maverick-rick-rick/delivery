import React from "react";
import { IPizzaStateType } from "../../store/types/pizzaTypes";
import { keyGenerator } from "../../utilities/keygen";
import { TableRowEmpty } from "./TableRow-entities/TableRowEmpty";
import { TableRowForPizzaList } from "./TableRow-entities/TableRowForPizzaList";

type TablePros = {
	tableContent: IPizzaStateType[] | string[];
	tableType: string;
};

// functions which checks equality table content to some type

function isType1(obj: any): obj is IPizzaStateType {
    return true;
}



export const Table = (props: TablePros) => {
	const { tableContent, tableType } = props;

	return (
		<div className={"table"}>
			{tableContent.length === 0 ? (
				<TableRowEmpty />
			) : (
				tableContent.map((element, index) => {
					switch (tableType) {
						case "pizzaList":
							return	isType1(element) ? <TableRowForPizzaList key={element.id} rowContent={element}/> : <TableRowEmpty key={keyGenerator()} />

						default:
							return <TableRowEmpty key={keyGenerator()} />;
					}
				})
			)}
		</div>
	);
};
