import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import {
	POPUP_CONFIRMATION,
	POPUP_CU_FORM,
} from "../../constants/popupConstants";
import { popupStateElement } from "../../store/types/popupsTypes";
import Preloader from "../elements/Preloader";

const PopupWithCUForm = React.lazy(() => import("./PopupWithCUForm"));
const ConfirmationPopup = React.lazy(() => import("./ConfirmationPopup"));

function PopupsController() {
	const popups: popupStateElement[] = useSelector(
		(state: any) => state.popupsState
	);

	return (
		<div>
			{popups.map((popup: popupStateElement) => {
				return (
					popup.isOpen && (
						<Suspense
							fallback={<Preloader />}
							key={popup.name}
						>
							{popup.name === POPUP_CU_FORM && (
								<PopupWithCUForm />
							)}
							{popup.name === POPUP_CONFIRMATION && (
								<ConfirmationPopup />
							)}
						</Suspense>
					)
				);
			})}
		</div>
	);
}

export default PopupsController;
