import React from 'react'
import cx from 'classnames';
import "./styles.css"

const Card = (props) => {
    const { color, shape, number, shading } = props
    let images = []
    for(let i = 0; i < number; ++i ){
        images.push(
            <span className={cx(color, `icon-${shape}-${shading}`)} key={`icon-${shape}-${shading}-${color}-${i}`}></span>
        )
    }
    return (
        <div 
        onClick={props.handleClick}
        className={cx("card", props.className, color, props.isSelected ? 'selected' : '')} >
            {
                images
            }
        </div>
    )
}

export default Card
