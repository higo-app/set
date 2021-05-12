import React from 'react'
import './styles.css';

const Modal = (props) => {
    return(
        <>
            <div className="modal is-active">
                <div className="modal-background"></div>    
                <div className="modal-content">
                    <div className="content">
                        {
                            props.message
                        }
                    </div>
                    <button className="Button" onClick={props.action}>
                        Ok
                    </button>
                </div>
            </div>  
        </>
    )
} 
export default Modal