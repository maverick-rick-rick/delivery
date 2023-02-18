import { createSlice } from "@reduxjs/toolkit";
import { keyGenerator } from "../../utilities/keygen";
import { IPizzaStateType, ingridientType } from "../types/pizzaTypes";


const emptyFormState : IPizzaStateType = {

	id: keyGenerator(),
	title: "",
	description: "",
	imgPath: "",
	ingridients: [
		{
			value: "Pizza base",
			allergic: false,
		},
		{
			value: "",
			allergic: true,
		},
	]
}

const formState ={...emptyFormState};



export const FormCUSlice = createSlice({
	name: "FormCU",
	initialState: formState,
	reducers: {
		updateFromInput: (state, action) =>{
			return {...state, ...action.payload};
		},
		clearFormState: (state) => {
			emptyFormState.id = keyGenerator();
			return {...state, ...emptyFormState}
		},
		addNewInrgidient: (state, action) => {
			return {...state, ingridients: action.payload}
		},
		updateIngridient: (state, action) => {
			return {...state, ingridients: [...[], action.payload]}
		}

	},
});

export const { updateFromInput, clearFormState, addNewInrgidient, updateIngridient } = FormCUSlice.actions;
export default FormCUSlice.reducer;
