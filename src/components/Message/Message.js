import React from 'react'
import './styles.css'

const Message = (props) => {
    if(!props.message)
        return(
            <>
            </>
        )
    return(
        <>
            <div className="message">
                {
                    props.message
                }
            </div>
        </>
    )
}

export default Message