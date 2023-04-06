import React from 'react'
import { useDispatch } from 'react-redux';
import { setConfirmationState } from '../../store/slices/popup/ConfirmationPopupSlice';
import { Button } from '../controls/Button';
import classes from './../../style_modules/popup/ConfirmationPopup.module.css'


function ConfirmationPopup() {
    
	const dispatch = useDispatch();

	const confirmationHandler = (e : React.MouseEvent<HTMLButtonElement>) => {
		const target = e.target as HTMLElement;
		switch (target.dataset.role) {
			case 'confirm':
				dispatch(setConfirmationState(true));
				break;
			case 'reject':
			default:
				dispatch(setConfirmationState(false));
				break;
		}
	}

    return (
		<div className={classes.wrapper} onClick={(e) => e.stopPropagation()}>
			<div className={classes.confirmation}>
				<h6>Do you confirm this action?</h6>
				<div className={classes.buttons}>
					<Button
						className={classes.btn_confirm}
						innerText={"Confirm"}
						data-role={"confirm"}
						onClick={confirmationHandler}
					/>
					<Button
						className={classes.btn_reject}
						innerText={"Reject"}
						data-role={"reject"}
						onClick={confirmationHandler}
					/>
				</div>
			</div>
		</div>
	);
}

export default ConfirmationPopup
