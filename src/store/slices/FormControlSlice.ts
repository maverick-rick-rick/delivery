import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { keyGenerator } from "../../utilities/keygen";
import {
	BufferIngredientType,
	IngredientType,
	IPizzaStateType,
} from "../types/pizzaTypes";

const emptyPizzaEntity: IPizzaStateType = {
	id: keyGenerator(),
	title: "",
	description: "",
	imgPath: "",
	ingredients: [
		{
			value: "Pizza base",
			allergic: false,
		},
	],
};
const emptyIngredient: IngredientType = {
	value: "",
	allergic: false,
};

const formState: IPizzaStateType = { ...emptyPizzaEntity };

const bufferIngredient: BufferIngredientType = {
	payload: { ...emptyIngredient },
	index: null,
};

const formRole = {
	role: "create",
};

const initialState = {
	formState,
	bufferIngredient,
	formRole,
};

export const FormControlSlice = createSlice({
	name: "formControl",
	initialState: initialState,
	reducers: {
		updateFromInput: (state, action) => {
			state.formState = { ...state.formState, ...action.payload };
			return state;
		},
		updateIngredientForm: (state, action) => {
			state.bufferIngredient.payload = {
				...state.bufferIngredient.payload,
				...action.payload,
			};
			return state;
		},
		setFormStateToEdit: (state, action) => {
			state.formState = action.payload;
			state.formRole = { role: "update" };
		},
		clearFormState: (state) => {
			emptyPizzaEntity.id = keyGenerator();
			state.formState = { ...state.formState, ...emptyPizzaEntity };
			state.bufferIngredient = { ...bufferIngredient };
			return state;
		},
		addNewIngredient: (state) => {
			state.formState.ingredients = [
				...state.formState.ingredients,
				{ ...state.bufferIngredient.payload },
			];
			state.bufferIngredient.payload = {
				...state.bufferIngredient.payload,
				...emptyIngredient,
			};
			return state;
		},
		removeIngredient: (state, action: PayloadAction<number>) => {
			const index = action.payload;
			state.formState.ingredients.splice(index, 1);
			return state;
		},
		bufferizeIngredient: (state, action: PayloadAction<number>) => {
			const index = action.payload;
			state.bufferIngredient.payload = {
				...state.bufferIngredient.payload,
				...state.formState.ingredients[index],
			};
			state.bufferIngredient.index = index;
			return state;
		},
		editIngredient: (state) => {
			const index = state.bufferIngredient.index;

			if (index != null) {
				state.formState.ingredients.splice(
					index,
					1,
					state.bufferIngredient.payload
				);
				state.bufferIngredient.payload = {
					...state.bufferIngredient.payload,
					...emptyIngredient,
				};
				state.bufferIngredient.index = null;
				state.formRole.role = "create";
			} else return;
		},
	},
});

export const {
	updateFromInput,
	clearFormState,
	addNewIngredient,
	updateIngredientForm,
	removeIngredient,
	bufferizeIngredient,
	editIngredient,
	setFormStateToEdit,
} = FormControlSlice.actions;
export default FormControlSlice.reducer;
