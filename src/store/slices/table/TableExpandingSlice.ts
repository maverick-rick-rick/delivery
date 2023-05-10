import { createSlice } from "@reduxjs/toolkit";

const expandedState = {id: undefined}

export const TableExpandingSlice = createSlice({
	name: "TableExpandingSlice",
	initialState: expandedState,
    reducers: {
        expandRow(state, action) {
           state.id = action.payload;
        },
        collapseRow(state){
            state.id = undefined;
        }
    }

});

export const { expandRow, collapseRow } = TableExpandingSlice.actions;

export default TableExpandingSlice.reducer;