import React from "react";
import { useDispatch } from "react-redux";
import { setFormStateToEdit } from "../../../store/slices/FormControlSlice";
import { deleteItem } from "../../../store/slices/pizzaSlice";
import { popupToggle } from "../../../store/slices/PopupSlice";
import { IPizzaStateType } from "../../../store/types/pizzaTypes";
import { keyGenerator } from "../../../utilities/keygen";
import { Button } from "../../controls/Button";
import { TableRowItem } from "../TableRowItem";

import classes from "./../../../style_modules/table/TableRow.module.css";

type TableRowProps = {
	rowContent: IPizzaStateType;
};

export const TableRowForPizzaList = (props: TableRowProps) => {
	const { rowContent } = props;

	const dispatch = useDispatch();

	const deleteButtonCallback = () => dispatch(deleteItem(rowContent.id));
	const editButtonCallback = () => {
		dispatch(setFormStateToEdit(rowContent));
		dispatch(popupToggle());
	};
	

	const tableButtons = [
		<Button key={keyGenerator()} icon={"pause"} />,
		<Button key={keyGenerator()} icon={"edit"} onClick={editButtonCallback}/>,
		<Button
			key={keyGenerator()}
			icon={"delete"}
			onClick={deleteButtonCallback}
		/>,
	];

	const resultedIngredients = (() => {
		const target = rowContent.ingredients;

		const icon = (
			<svg key={rowContent.id + "icon"}>
				<use href="./images/icons/sprite.svg#finger_down"></use>
			</svg>
		);

		const ending = (
			<div className={classes.ending} key={rowContent.id + 'ending'}>
				<span>···</span>
			</div>
		);

		const visibleElements = target.map((element) => {
			const visibleElement = (
				<div key={rowContent.id + element.value}>
					{element.value}
					<span>{element.allergic === true ? " !!!" : false}</span>
				</div>
			);
			return visibleElement;
		});

		if (target.length > 2) {
			return [...visibleElements, ending, icon];
		} else {
			return visibleElements;
		}
	})();

	return (
		<div className={classes.table_row} key={rowContent.id}>
			<TableRowItem children={rowContent.title} />
			<TableRowItem children={rowContent.description} />
			<TableRowItem
				children={resultedIngredients}
				className={classes.ingredients_list}
			/>
			<TableRowItem
				children={tableButtons}
				className={classes.table_buttons}
			/>
		</div>
	);
};


