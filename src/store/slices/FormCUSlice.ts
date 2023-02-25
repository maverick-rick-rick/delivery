import { createSlice } from "@reduxjs/toolkit";
import { keyGenerator } from "../../utilities/keygen";
import { IPizzaStateType, ingredientType } from "../types/pizzaTypes";


const emptyFormState : IPizzaStateType = {

	id: keyGenerator(),
	title: "",
	description: "",
	imgPath: "",
	ingredients: [
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
		addNewIngredient: (state, action) => {
			return {...state, ingredients: action.payload}
		},
		updateIngredient: (state, action) => {
			return {...state, ingredients: [...[], action.payload]}
		}

	},
});

export const { updateFromInput, clearFormState, addNewIngredient, updateIngredient } = FormCUSlice.actions;
export default FormCUSlice.reducer;
