import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const initialState: { confirmation: boolean | null } = { confirmation: null };


const ConfirmationPopupSlice = createSlice(
    {
	name: "ConfirmationPopupSlice",
    initialState: initialState,
    reducers: {
        setConfirmationState : (state, action : PayloadAction<boolean>) => {
            state.confirmation = action.payload;
        },
        resetConfirmationState : (state) => {
            state.confirmation = null;
        }
    }
}
);

export const { setConfirmationState, resetConfirmationState } =
	ConfirmationPopupSlice.actions;

export default ConfirmationPopupSlice.reducer;