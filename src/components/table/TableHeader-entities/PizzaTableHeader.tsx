import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableRowCell } from "../TableRowCell";
import classes from "./../../../style_modules/table/TableRow.module.css";
import { Button } from "../../elements/Button";
import { POPUP_CU_FORM } from "../../../constants/popupConstants";
import { keyGenerator } from "../../../utilities/keygen";
import { popupToggle } from "../../../store/slices/popup/PopupsSlice";

function PizzaTableHeader() {
	const state = useSelector((state: any) => state.tableHeaders.pizzaTable);
    const dispatch = useDispatch();

	const popupHandler = (str: string) => {
		dispatch(popupToggle(str));
	};

	return (
		<div className={`${classes.table_row} ${classes.table_header}`}>
			{state.map((element: any) => {
				return <TableRowCell children={element} key={keyGenerator()} />;
			})}
			<TableRowCell
				children={
					<Button
						className={classes.btn_create}
						innerText={"Add new item"}
						onClick={() => popupHandler(POPUP_CU_FORM)}
					/>
				}
			/>
		</div>
	);
}

export default PizzaTableHeader;
