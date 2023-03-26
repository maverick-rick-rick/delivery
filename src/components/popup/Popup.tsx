import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { popupToggle } from "../../store/slices/PopupSlice";
import { Button } from "../controls/Button";
import classes from "./../../style_modules/popup/Popup.module.css";

interface Props {
	children?: React.ReactNode | string | undefined;
}

function Popup(props: Props) {
	const { children } = props;

	const dispatch = useDispatch();
	const [confirmation, setConfirmation] = useState(false);

	const closePopup = () => {
		dispatch(popupToggle());
		setConfirmation(false);
	};

	

	const handleWrapper = (e: React.MouseEvent<HTMLDivElement>) => {
		const target = e.target as HTMLDivElement;
		if (!target.classList.contains(`${classes.wrapper}`)) {
			e.stopPropagation();
			return false;
		} else {
			setConfirmation(true);
		}
	};

	const handleConfirmation = (e: React.MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLButtonElement;
		const targetRole = target.dataset.role;
		switch (targetRole) {
			case 'confirm':
				closePopup();
				break;
			case 'reject':
			default:
				setConfirmation(false);
				break;
		}
		
	};

	const state = useSelector((state: any) => state.popupState);

	return (
		<div
			className={`${classes.wrapper} ${
				state.condition !== true ? "hidden" : ""
			}`}
			onMouseDown={handleWrapper}
		>
			<div className={classes.popup}>
				<div className={classes.content}>
					{!children
						? "There is no content to display in this popup"
						: children}
				</div>
				<Button
					className={classes.close}
					icon={"close"}
					onClick={() => setConfirmation(true)}
				/>
				<div
					className={`${classes.confirmation_wrapper} ${
						!confirmation ? "hidden" : ""
					}`}
				>
					<div className={classes.confirmation}>
						<h6>Do you want to close without changing?</h6>
						<Button
							className={classes.btn_close}
							innerText={"Close"}
							data-role={"confirm"}
							onClick={handleConfirmation}
						/>
						<Button
							className={classes.btn_cancel}
							innerText={"Cancel"}
							data-role={"reject"}
							onClick={handleConfirmation}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Popup;
