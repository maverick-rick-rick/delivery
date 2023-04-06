import React from "react";
import { useDispatch } from "react-redux";
import { POPUP_CU_FORM } from "../../constants/popupConstants";
import { popupToggle } from "../../store/slices/popup/PopupsSlice";
import { Button } from "../controls/Button";
import classes from "./../../style_modules/popup/Popup.module.css";

interface Props {
	children?: React.ReactNode | string | undefined;
}

function Popup(props: Props) {
	const { children } = props;

	const dispatch = useDispatch();

	const handleClose = (e: React.MouseEvent) => {
		const target = e.target as HTMLElement;
		const trigger = target.dataset.role;

		trigger ? dispatch(popupToggle(POPUP_CU_FORM)) : e.stopPropagation();

		
		
		
	};

	return (
		<div
			className={`${classes.wrapper}`}
			onMouseDown={handleClose}
			data-role={"close"}
		>
			<div className={classes.popup}>
				<div className={classes.content}>
					{!children
						? "There is no content to display in this popup"
						: children}
				</div>
				<Button
					data-role={"close"}
					className={classes.close}
					icon={"close"}
					onClick={() => handleClose}
				/>
			</div>
		</div>
	);
}

export default Popup;
