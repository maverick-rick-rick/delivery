import { configureStore } from "@reduxjs/toolkit";
import FormCUSlice from './slices/FormControlSlice';
import pizzaSlice from './slices/pizzaSlice';
import ConfirmationPopupSlice from './slices/popup/ConfirmationPopupSlice';
import PopupsSlice from './slices/popup/PopupsSlice';
import TableExpandingSlice from "./slices/table/TableExpandingSlice";
import TableHeadersSlice  from "./slices/table/TableHeadersSlice";


export  const store = configureStore({
	reducer: {
		pizzaList: pizzaSlice,
		formState: FormCUSlice,
		popupsState: PopupsSlice,
		confirmationState: ConfirmationPopupSlice,
		tableExpanding: TableExpandingSlice,
		tableHeaders: TableHeadersSlice
	},
});

