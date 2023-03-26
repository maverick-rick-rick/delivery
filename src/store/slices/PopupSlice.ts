import { createSlice } from '@reduxjs/toolkit';

interface PopupSliceType  {
    condition: boolean
}

const popupState: PopupSliceType = {
	condition: false
};


const PopupSlice = createSlice({
	name: "PopupSlice",
	initialState: popupState,
	reducers: {
		popupToggle: (state) => {
			state.condition = !state.condition;
		},
	},
});

export const { popupToggle } = PopupSlice.actions;

export default PopupSlice.reducer;