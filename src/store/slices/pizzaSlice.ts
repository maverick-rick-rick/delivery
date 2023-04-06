import { createSlice } from "@reduxjs/toolkit";
import { IPizzaStateType } from "../types/pizzaTypes";

const pizzaState: IPizzaStateType[] = [
	{
		id: 0,
		title: "Hawaian",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut amet tempora maxime?",
		imgPath: "dolor",
		ingredients: [
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
		id: 1,
		title: "Margarita",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut amet tempora maxime?",
		imgPath: "dolor",
		ingredients: [
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
		id: 2,
		title: "Carbonara",
		description:
			"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut amet tempora maxime?",
		imgPath: "dolor",
		ingredients: [
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
			{
				value: "banana",
				allergic: false,
			},
			{
				value: "grease",
				allergic: false,
			},
		],
	},
];

const findElementByID = (state: IPizzaStateType[], payload: number) => {
	return state.findIndex((element) => element.id === payload);
};

export const pizzaSlice = createSlice({
	name: "pizzaList",
	initialState: pizzaState,
	reducers: {
		returnState(state) {
			return state;
		},
		createNewItem(state, action) {
			return [...state, action.payload];
		},
		deleteItem(state, action) {
			state = state.splice(findElementByID(state, action.payload), 1);
		},
		updateItem(state, action) {
			state = state.splice(
				findElementByID(state, action.payload.id),
				1,
				action.payload
			);
		},
	},
});

export const { returnState, createNewItem, deleteItem, updateItem } =
	pizzaSlice.actions;
export default pizzaSlice.reducer;
