import React from "react";
import { FormCU } from "../form/FormCU";
import Popup from "./Popup";
import { useDispatch, useSelector } from "react-redux";
import { clearFormState } from "../../store/slices/FormControlSlice";

function PopupWithCUForm() {

	const dispatch = useDispatch();

	const formStatus = useSelector(
		(state: any) => state.formState.formProperties.changed
	);

	

	return (
		<Popup
			additionalCallback={() => dispatch(clearFormState())}
			requireConfirmation={formStatus}
		>
			<FormCU />
		</Popup>
	);
}

export default PopupWithCUForm;
