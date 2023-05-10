import React, { ButtonHTMLAttributes } from 'react'
 
type ButtonPropsType = {
    innerText? : string,
    icon? : string
} & ButtonHTMLAttributes<HTMLButtonElement>



export const Button = (props: ButtonPropsType) => {

    const { innerText, icon, ...buttonPropsType }  = props;

    const iconPath = icon ? './images/icons/sprite.svg' : undefined;

    return (
		<button className={"btn"} {...buttonPropsType}>
			{icon ? 
                <svg>
                    <use href={`${iconPath}#${icon}`}></use> 
                </svg>
            : false}
            {innerText}
		</button>
	);
}