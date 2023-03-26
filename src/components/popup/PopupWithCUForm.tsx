import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearFormState } from '../../store/slices/FormControlSlice';
import { FormCU } from '../form/FormCU';
import Popup from './Popup';

interface Props {
    
}

function PopupWithCUForm(props: Props) {
    const {} = props

    const popupState = useSelector((state:any) => state.popupState.condition);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!popupState) {
            dispatch(clearFormState());
		}
    })

    return (
        <Popup>
            <FormCU />
        </Popup>
    )
}

export default PopupWithCUForm
