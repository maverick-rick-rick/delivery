import { createSlice } from "@reduxjs/toolkit";
import { IPizzaStateType } from "../types/pizzaTypes";

const pizzaState: IPizzaStateType[] = [
	{
		id: 1,
		title: "Hawaian",
		description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut amet tempora maxime?",
		imgPath: "dolor",
		ingridients: [
			{
				value: "ham",
				allergic: false,
			},
			{
				value: "tomato",
				allergic: false,
			},
			{
				value: "crab",
				allergic: true,
			},
		],
	},
	{
		id: 2,
		title: "Margarita",
		description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut amet tempora maxime?",
		imgPath: "dolor",
		ingridients: [
			{
				value: "ham",
				allergic: false,
			},
			{
				value: "tomato",
				allergic: false,
			},
			{
				value: "garlic",
				allergic: false,
			},
		],
	},
	{
		id: 3,
		title: "Carbonara",
		description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut amet tempora maxime?",
		imgPath: "dolor",
		ingridients: [
			{
				value: "ham",
				allergic: false,
			},
			{
				value: "tomato",
				allergic: false,
			},
			{
				value: "peanut",
				allergic: true,
			},
		],
	},
];

export const pizzaSlice = createSlice({
	name: "pizzaList",
	initialState: pizzaState,
	reducers: {
		returnState(state) {
			return state;
		},
		createNewItem(state, action){
			return [...state, action.payload]
		}
	},
});

export const { returnState, createNewItem } = pizzaSlice.actions;
export default pizzaSlice.reducer;
