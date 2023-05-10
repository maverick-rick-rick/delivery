import React from "react";
import { useDispatch } from "react-redux";
import { POPUP_CU_FORM } from "../../constants/popupConstants";
import { popupToggle } from "../../store/slices/popup/PopupsSlice";
import { Button } from "../elements/Button";
import classes from "./../../style_modules/popup/Popup.module.css";
import { useConfirmationHandler } from "../../hooks/useConfirmationHandler";

interface Props {
	children?: React.ReactNode | string | undefined;
	requireConfirmation: boolean;
	additionalCallback? : Function
}

function Popup(props: Props) {
	const { children, requireConfirmation, additionalCallback } = props;

	const dispatch = useDispatch();

	const handleClose = (e: React.MouseEvent) => {
		const target = e.target as HTMLElement;
		const trigger = target.dataset.role;

		trigger === "close"
			? dispatch(popupToggle(POPUP_CU_FORM))
			: e.stopPropagation();

		additionalCallback? additionalCallback() : <></>;
	};

	const handleConfirmationClose = useConfirmationHandler();

	return (
		<div
			className={`${classes.wrapper}`}
			onMouseDown={(e) => {
				requireConfirmation
					? handleConfirmationClose(handleClose, e)
					: handleClose(e);
			}}
			data-role={"close"}
		>
			<div
				className={classes.popup}
				onMouseDown={(e) => e.stopPropagation()}
			>
				<div className={classes.content}>
					{!children
						? "There is no content to display in this popup"
						: children}
				</div>
				<Button
					data-role={"close"}
					className={classes.close}
					icon={"close"}
					onClick={(e) => {
						requireConfirmation
							? handleConfirmationClose(handleClose, e)
							: handleClose(e);
					}}
				/>
			</div>
		</div>
	);
}

export default Popup;
