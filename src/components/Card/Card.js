import React from 'react'
import cx from 'classnames';
import "./styles.css"

const Card = (props) => {
    const { color, shape, number, shading } = props
    let images = []
    for(let i = 0; i < number; ++i ){
        images.push(
            <img src={`shapes/${shape} - ${shading}.svg`} className={color} alt="card"></img>
        )
    }
    return (
        <div 
        onClick={props.handleClick}
        className={cx("card", props.className, props.isSelected ? 'selected' : '')} >
            {
                images
            }
        </div>
    )
}

export default Card
