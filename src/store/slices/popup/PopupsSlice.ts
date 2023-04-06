import { createSlice } from "@reduxjs/toolkit";
import {
	POPUP_CONFIRMATION,
	POPUP_CU_FORM,
} from "../../../constants/popupConstants";
import { popupStateElement } from "../../types/popupsTypes";

const popupsState: popupStateElement[] = [
	{ name: POPUP_CU_FORM, isOpen: false },
	{ name: POPUP_CONFIRMATION, isOpen: false },
];

const PopupsSlice = createSlice({
	name: "PopupSlice",
	initialState: popupsState,
	reducers: {
		popupToggle: (state, action) => {
			const name = action.payload;

			const target = state.find((popup) => popup.name === name);

			target
				? (target.isOpen = !target.isOpen)
				: console.log("There is no such item in state");
		},
	},
});

export const { popupToggle } = PopupsSlice.actions;

export default PopupsSlice.reducer;
