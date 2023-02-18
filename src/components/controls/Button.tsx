import React, { ButtonHTMLAttributes } from 'react'
 
type ButtonPropsType = {
    innerText : string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: ButtonPropsType) => {
    const { innerText, ...buttonPropsType }  = props;
    return (
        <button className={'btn'} {...buttonPropsType}>{innerText}</button>
    )
}