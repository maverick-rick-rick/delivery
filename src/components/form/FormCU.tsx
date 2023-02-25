import React, { FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewIngredient, clearFormState, updateFromInput } from '../../store/slices/FormCUSlice';
import { createNewItem } from '../../store/slices/pizzaSlice';
import { IPizzaStateType } from '../../store/types/pizzaTypes';
import { keyGenerator } from '../../utilities/keygen';
import { Button } from '../controls/Button';

type FormCUProps = {
	updateRequest?: boolean,
	objectId?: number
}


export const FormCU = (props: FormCUProps) => {

	const {updateRequest, objectId} = props;
	const state:IPizzaStateType = useSelector((state:any) => state.formState);
	const dispatch = useDispatch();

	function formSubmit(e:FormEvent<HTMLFormElement | HTMLInputElement>) {
		e.preventDefault();
		dispatch(createNewItem(state));
		dispatch(clearFormState());
	}

	// function addNewIngredient(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
	// 	e.preventDefault();
	// 	e.stopPropagation();
	// 	const target = e.target as HTMLButtonElement;
	// 	const x = target.closest('.form_add_ingr');
	// 	const result = {
	// 		value: '',
	// 		allergic: false
	// 	}
	// 	addNewIngredient(result);
		
	// }

	const lastIngredientEntity = state.ingredients[state.ingredients.length - 1];

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
						<label htmlFor="form_cu_new_ingr">Add ingredient</label>
						<input
							type="text"
							name=""
							id="form_cu_new_ingr"
							value={lastIngredientEntity.value}
						/>
						<label htmlFor="form_cu_allergen">is allergen?</label>
						<input
							type="checkbox"
							name=""
							id="form_cu_allergen"
							checked={lastIngredientEntity.allergic}
						/>
						<Button
							innerText={"Add"}
							onClick={(e) => {
								addNewIngredient(e);
							}}
						/>
					</div>
					<ul className={"form_ingr_list"}>
						{state.ingredients.map((element) => {
							return element.value.length === 0 ? (
								false
							) : (
								<li
									className={"form_ingr_list_item"}
									key={keyGenerator()}
								>
									<p>
										{element.value}{" "}
										<span>
											{element.allergic === true
												? "X"
												: false}
										</span>
									</p>
									<Button innerText={"delete"} />
								</li>
							);
						})}
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

}