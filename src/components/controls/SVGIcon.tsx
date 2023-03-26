import React from 'react'

interface Props {
    icon: string
}

function SVGIcon(props: Props) {
    const {icon} = props

    return (
        <svg>
            <use href={`./images/icons/sprite.svg#${icon}`}></use>
        </svg>
    )
}

export default SVGIcon
