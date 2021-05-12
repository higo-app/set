import React, { useEffect } from 'react'
import cx from 'classnames';
import './styles.css'

const Message = (props) => {

    const {message, fadeAway} = props

    useEffect(() => {
        const interval = setInterval(() => {
            if(fadeAway)
                fadeAway()
        }, 3000)
        return () => clearInterval(interval);
    }, [fadeAway])

    if(!message)
        return(
            <>
            </>
        )

    return(
        <>
            <div className={cx("message", props.className)}>
                {
                    message
                }
            </div>
        </>
    )
}

export default Message