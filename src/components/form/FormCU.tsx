import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addNewIngredient,
	clearFormState,
	bufferizeIngredient,
	removeIngredient,
	updateFromInput,
	updateIngredientForm,
	editIngredient,
} from "../../store/slices/FormControlSlice";
import { createNewItem, updateItem } from "../../store/slices/pizzaSlice";
import { popupToggle } from "../../store/slices/PopupSlice";
import { IPizzaStateType } from "../../store/types/pizzaTypes";
import { keyGenerator } from "../../utilities/keygen";
import { Button } from "../controls/Button";
import SVGIcon from "../controls/SVGIcon";
import classes from "./../../style_modules/forms/FormCU.module.css";

export const FormCU = () => {
	const formState: any = useSelector((state: any) => state.formState);
	const state: IPizzaStateType = formState.formState;

	const dispatch = useDispatch();

	const [saveButtonRole, setSaveButtonRole] = useState("default");
	const disabledElement = useSelector((state:any) => state.formState.bufferIngredient.index);
	
	function formSubmit(e: FormEvent<HTMLFormElement | HTMLInputElement>) {
		e.preventDefault();
		switch (formState.formRole.role) {
			case "update":
				dispatch(updateItem(state));
				break;
			case "create":
			default:
				dispatch(createNewItem(state));
		}
		dispatch(popupToggle());
		dispatch(clearFormState());
	}

	function pushIngredient(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.preventDefault();
		e.stopPropagation();

		(() => {
			switch (saveButtonRole) {
				case "edit":
					setSaveButtonRole("default");
					dispatch(editIngredient());
					break;
				case "default":
				default:
					dispatch(addNewIngredient());
					break;
			}
		})();
	}
	function removeCurrentIngredient(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		index: number
	) {
		e.preventDefault();
		e.stopPropagation();

		dispatch(removeIngredient(index));
	}
	function editCurrentIngredient(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		index: number
	) {
		e.preventDefault();
		e.stopPropagation();

		dispatch(bufferizeIngredient(index));
		setSaveButtonRole("edit");
	}

	return (
		<div className={classes.form_wrapper}>
			<p className={classes.header}>Create new item</p>
			<form action="#" className="form" onSubmit={(e) => formSubmit(e)}>
				<div className={classes.form_item}>
					<input
						type="text"
						name=""
						id="form_cu_title"
						value={state.title}
						onChange={(e) =>
							dispatch(updateFromInput({ title: e.target.value }))
						}
					/>
					<label htmlFor="form_cu_title">Pizza title</label>
				</div>
				<div className={classes.form_item}>
					<textarea
						name=""
						id="form_cu_desc"
						cols={30}
						rows={10}
						value={state.description}
						onChange={(e) =>
							dispatch(
								updateFromInput({ description: e.target.value })
							)
						}
					></textarea>
					<label htmlFor="form_cu_desc">Pizza description</label>
				</div>
				<div className={classes.form_item}>
					<input
						type="text"
						name=""
						id="form_cu_img"
						value={state.imgPath}
						onChange={(e) =>
							dispatch(
								updateFromInput({ imgPath: e.target.value })
							)
						}
					/>
					<label htmlFor="form_cu_img">
						Image path ( temporarily string)
					</label>
				</div>
				<div className={`${classes.form_item} ${classes.ingredients}`}>
					<div className={classes.add_ingredient}>
						<div>
							<input
								type="text"
								name=""
								id="form_cu_new_ingr"
								value={formState.bufferIngredient.payload.value}
								onChange={(e) =>
									dispatch(
										updateIngredientForm({
											value: e.target.value,
										})
									)
								}
							/>
							<label htmlFor="form_cu_new_ingr">
								Add ingredient:
							</label>
						</div>
						<div>
							<input
								type="checkbox"
								name=""
								id="form_cu_allergen"
								checked={
									formState.bufferIngredient.payload.allergic
								}
								onChange={(e) =>
									dispatch(
										updateIngredientForm({
											allergic: e.target.checked,
										})
									)
								}
							/>
							<label htmlFor="form_cu_allergen">
								Is allergen?
							</label>
						</div>
						<Button
							icon={"save"}
							onClick={(e) => pushIngredient(e)}
						/>
					</div>
					<ul className={classes.ingredient_list}>
						{state.ingredients.length < 1 ? (
							<p>
								There is no ingredients, please, add at least
								one of them
							</p>
						) : (
							state.ingredients.map((element, index) => {

								return element.value.length === 0 ? (
									false
								) : (
									<li
										className={`${
											classes.ingredient_list_item
										} ${
											disabledElement !== null && disabledElement === index
												? "disabled"
												: ""
										}`}
										key={keyGenerator()}
									>
										<p>
											{element.value + " "}
											<span>
												{element.allergic === true ? (
													<SVGIcon icon={"danger"} />
												) : (
													false
												)}
											</span>
										</p>
										<div
											className={classes.buttons_wrapper}
										>
											<Button
												icon={"pencil"}
												onClick={(e) =>
													editCurrentIngredient(
														e,
														index
													)
												}
											/>
											<Button
												icon={"delete"}
												onClick={(e) =>
													removeCurrentIngredient(
														e,
														index
													)
												}
											/>
										</div>
									</li>
								);
							})
						)}
					</ul>
				</div>
				<div className="form_item">
					<input
						type="submit"
						value="Proceed"
						className={classes.form_submit}
						onSubmit={(e) => formSubmit(e)}
					/>
				</div>
			</form>
		</div>
	);
};
