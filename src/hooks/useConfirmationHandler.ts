import { useDispatch } from "react-redux";
import { store } from "../store/store";
import { resetConfirmationState } from "../store/slices/popup/ConfirmationPopupSlice";
import { popupToggle } from "../store/slices/popup/PopupsSlice";
import { POPUP_CONFIRMATION } from "../constants/popupConstants";
import { useCallback } from "react";

export const useConfirmationHandler = () => {
	const dispatch = useDispatch();
	const handler = useCallback(
		async (callback: any) => {
			dispatch(popupToggle(POPUP_CONFIRMATION));
			await new Promise<void>((resolve) => {
				const unsubscribe = store.subscribe(() => {
					if (
						store.getState().confirmationState.confirmation !== null
					) {
						unsubscribe();
						resolve();
					}
				});
			});
			const confirmation =
				store.getState().confirmationState.confirmation;

			confirmation ? callback() : Promise.resolve(false);

			dispatch(resetConfirmationState);
			dispatch(popupToggle(POPUP_CONFIRMATION));
		},
		[dispatch]
	);

	return handler;
};
