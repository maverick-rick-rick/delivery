import { createSlice } from "@reduxjs/toolkit";

const tableHeaders = {
    pizzaTable : ['Title', 'Description', 'Ingredients']
};

export const TableHeadersSlice = createSlice({
	name: "TableHeadersSlice",
	initialState: tableHeaders,
    reducers: {
        getState: (state) => {
            console.log(state);
            
        }
    }
});

export const { getState } = TableHeadersSlice.actions;

export default TableHeadersSlice.reducer;
