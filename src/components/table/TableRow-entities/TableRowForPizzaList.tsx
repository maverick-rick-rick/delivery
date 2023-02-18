import React from "react";
import { IPizzaStateType } from "../../../store/types/pizzaTypes";
import { keyGenerator } from "../../../utilities/keygen";
import { Button } from "../../controls/Button";
import { TableRowItem } from "../TableRowItem";

type TableRowProps = {
	rowContent: IPizzaStateType;
};

function callback() {
	console.log('lorem')
}

export const TableRowForPizzaList = (props: TableRowProps) => {
	const { rowContent } = props;

	const tableButtons = [
		<Button
			key={keyGenerator()}
			innerText={"To freeze"}
			onClick={() => {callback()}}
		/>,
		<Button key={keyGenerator()} innerText={"Edit"} />,
		<Button key={keyGenerator()} innerText={"Delete"} />,
	];

	const ingridientsArray = rowContent.ingridients.map((element) => {
		return (
			<div key={rowContent.id + element.value}>
				{element.value}
				<span>{element.allergic === true ? " !!!" : false}</span>
			</div>
		);
	});

	return (
		<div className={"table_row"} key={rowContent.id}>
			<TableRowItem children={rowContent.title} />
			<TableRowItem children={rowContent.description} />
			<TableRowItem children={ingridientsArray} />
			<TableRowItem children={tableButtons} />
		</div>
	);
};
