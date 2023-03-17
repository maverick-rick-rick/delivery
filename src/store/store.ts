import { configureStore } from '@reduxjs/toolkit'
import FormCUSlice from './slices/FormControlSlice';
import pizzaSlice from './slices/pizzaSlice';
import PopupSlice from './slices/PopupSlice';




export  const store = configureStore({
	reducer: {
		pizzaList: pizzaSlice,
		formState: FormCUSlice,
		popupState: PopupSlice,
	},
});