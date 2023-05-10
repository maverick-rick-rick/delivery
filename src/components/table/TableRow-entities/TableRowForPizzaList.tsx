import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormStateToEdit } from "../../../store/slices/FormControlSlice";
import { deleteItem } from "../../../store/slices/pizzaSlice";
import { IPizzaStateType } from "../../../store/types/pizzaTypes";
import { keyGenerator } from "../../../utilities/keygen";
import { Button } from "../../elements/Button";
import { TableRowCell } from "../TableRowCell";
import { useConfirmationHandler } from "../../../hooks/useConfirmationHandler";
import classes from "./../../../style_modules/table/TableRow.module.css";
import { popupToggle } from "../../../store/slices/popup/PopupsSlice";
import { POPUP_CU_FORM } from "../../../constants/popupConstants";
import { collapseRow, expandRow } from "../../../store/slices/table/TableExpandingSlice";


type TableRowProps = {
	rowContent: IPizzaStateType;
};

export const TableRowForPizzaList = (props: TableRowProps) => {
	const { rowContent } = props;

	const expandedRow = useSelector((state: any) => state.tableExpanding.id)


	const dispatch = useDispatch();
	const deleteButtonHandler = useConfirmationHandler();

	const deleteButtonCallback = () => {
		dispatch(deleteItem(rowContent.id));
	};
	const editButtonHandler = () => {
		dispatch(setFormStateToEdit(rowContent));
		dispatch(popupToggle(POPUP_CU_FORM));
	};

	const expandHandler = (e:any) => {
		e.stopPropagation();
		dispatch(expandRow(rowContent.id));
	};
	const collapseHandler = (e:any) => {
		e.stopPropagation();
		dispatch(collapseRow());
	}

	const tableButtons = [
		<Button key={keyGenerator()} icon={"pause"} />,
		<Button
			key={keyGenerator()}
			icon={"edit"}
			onClick={editButtonHandler}
		/>,
		<Button
			key={keyGenerator()}
			icon={"delete"}
			onClick={() => deleteButtonHandler(deleteButtonCallback)}
		/>,
		<Button
			key={keyGenerator()}
			className={classes.roll_up}
			icon={"roll_up"}
			innerText={"Roll up"}
			onClick={(e) => collapseHandler(e)}
		/>,
	];

	const resultedIngredients = (() => {
		const target = rowContent.ingredients;
		const visibleElements = target.map((element) => {
			const visibleElement = (
				<p key={rowContent.id + element.value}>
					{element.value}
					<span>{element.allergic === true ? " !!!" : false}</span>
				</p>
			);
			return visibleElement;
		});
		return visibleElements;
	})();

	return (
		<div
			className={`${classes.table_row} ${
				expandedRow === rowContent.id ? classes.expanded : false
			}`}
			key={rowContent.id}
			onClick={(e) => expandHandler(e)}
		>
			<TableRowCell children={<p>{rowContent.title}</p>} />
			<TableRowCell children={<p>{rowContent.description}</p>} />
			<TableRowCell
				children={resultedIngredients}
				className={classes.ingredients_list}
			/>
			<TableRowCell
				children={tableButtons}
				className={`${classes.table_buttons} ${classes.jc_c}`}
			/>
		</div>
	);
};
