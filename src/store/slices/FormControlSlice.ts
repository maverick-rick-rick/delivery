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

const formProperties = {
	role: "create",
	changed: false
};

const initialState = {
	formState,
	bufferIngredient,
	formProperties,
};

export const FormControlSlice = createSlice({
	name: "formControl",
	initialState: initialState,
	reducers: {
		updateFromInput: (state, action) => {
			state.formState = { ...state.formState, ...action.payload };
		},
		updateIngredientForm: (state, action) => {
			state.bufferIngredient.payload = {
				...state.bufferIngredient.payload,
				...action.payload,
			};
		},
		setFormStateToEdit: (state, action) => {
			state.formState = action.payload;
			state.formProperties.role = "update" ;
		},
		clearFormState: (state) => {
			emptyPizzaEntity.id = keyGenerator();
			state.formState = { ...state.formState, ...emptyPizzaEntity };
			state.bufferIngredient = { ...bufferIngredient };
			state.formProperties.changed = false;
			state.formProperties.role = "create";
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
		rewriteIngredient: (state) => {
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
			} else return;
		},
		setFormChanged: (state) => {
			state.formProperties.changed = true;
		}
	},
});

export const {
	updateFromInput,
	clearFormState,
	addNewIngredient,
	updateIngredientForm,
	removeIngredient,
	bufferizeIngredient,
	rewriteIngredient,
	setFormStateToEdit,
	setFormChanged,
} = FormControlSlice.actions;
export default FormControlSlice.reducer;
