import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { popupToggle } from '../../store/slices/PopupSlice';
import { Button } from '../controls/Button';
import classes from './../../style_modules/popup/Popup.module.css'

interface Props {
	children?: React.ReactNode | string | undefined;
}

function Popup(props: Props) {
    const {children} = props

    const dispatch = useDispatch();

    const closePopup = () => {
        dispatch(popupToggle());
    }

    const wrapperCallback = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
		if (!target.classList.contains(`${classes.wrapper}`)) {
            e.stopPropagation();
            return false;
        } else closePopup();
        
	};

    const state = useSelector((state:any)=> state.popupState);

    return (
		<div
			className={`${classes.wrapper} ${
				state.condition !== true ? "hidden" : ""
			}`}
			onClick={wrapperCallback}
		>
			<div className={classes.popup}>
				<div className={classes.content}>
					{!children
						? "There is no content to display in this popup"
						: children}
				</div>
				<Button
					className={classes.close}
					icon={"close"}
					onClick={closePopup}
				/>
			</div>
		</div>
	);
}

export default Popup
