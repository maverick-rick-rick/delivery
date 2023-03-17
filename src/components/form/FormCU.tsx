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
import { IPizzaStateType } from "../../store/types/pizzaTypes";
import { keyGenerator } from "../../utilities/keygen";
import { Button } from "../controls/Button";

type FormCUProps = {
	updateRequest?: boolean;
	objectId?: number;
};

export const FormCU = (props: FormCUProps) => {
	const { updateRequest, objectId } = props;
	const formState: any = useSelector((state: any) => state.formState);
	const state: IPizzaStateType = formState.formState;

	const dispatch = useDispatch();

	const [saveButtonRole, setSaveButtonRole] = useState("default");
	const [disabledElement, setDisabledElement] = useState(NaN);

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
		dispatch(clearFormState());
	}

	function pushNewIngredient(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.preventDefault();
		e.stopPropagation();

		const button = e.target as HTMLButtonElement;
		const submitDataset = {
			role: button.dataset.role as String,
		};
		if (submitDataset.role === undefined) {
			submitDataset.role = "default";
		}
		(() => {
			switch (submitDataset.role) {
				case "default":
				default:
					dispatch(addNewIngredient());
					break;
				case "edit":
					dispatch(editIngredient());
					setSaveButtonRole("default");
					setDisabledElement(NaN);
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
		setDisabledElement(index);
	}

	return (
		<div className="form_wrapper">
			<form action="#" className="form" onSubmit={(e) => formSubmit(e)}>
				<div className={"form_item"}>
					<label htmlFor="form_cu_title">Pizza title</label>
					<input
						type="text"
						name=""
						id="form_cu_title"
						value={state.title}
						onChange={(e) =>
							dispatch(updateFromInput({ title: e.target.value }))
						}
					/>
				</div>
				<div className={"form_item"}>
					<label htmlFor="form_cu_desc">Pizza description</label>
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
				</div>
				<div className={"form_item"}>
					<label htmlFor="form_cu_img">
						Image path ( temporarily string)
					</label>
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
				</div>
				<div className={"form_item"}>
					<div className={"form_add_ingr"}>
						<label htmlFor="form_cu_new_ingr">
							Add ingredient:
						</label>
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
						<label htmlFor="form_cu_allergen">is allergen?</label>
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
						<Button
							innerText={"Save"}
							data-role={saveButtonRole}
							onClick={(e) => pushNewIngredient(e)}
						/>
					</div>
					<ul className={"form_ingr_list"}>
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
										className={`form_ingr_list_item ${disabledElement === index ? 'disabled' : ''}`}
										key={keyGenerator()}
									>
										<p>
											{element.value + " "}
											<span>
												{element.allergic === true
													? "X"
													: false}
											</span>
										</p>
										<Button
											innerText={"edit"}
											onClick={(e) =>
												editCurrentIngredient(e, index)
											}
										/>
										<Button
											innerText={"delete"}
											onClick={(e) =>
												removeCurrentIngredient(
													e,
													index
												)
											}
										/>
									</li>
								);
							})
						)}
					</ul>
					<input
						type="submit"
						value="Proceed"
						onSubmit={(e) => formSubmit(e)}
					/>
				</div>
			</form>
		</div>
	);
};
