import React from "react";
import './StandardInput.css';

const StandardInput = ({ placeholder , handleOnchange, handleEnterKey, value, className}) => {

    return (
        <input 
            className={`main-input ${className}`}
            type="text"
            maxlength ={40}
            value={value}
            placeholder={placeholder} 
            onChange={(e)=>handleOnchange(e.target.value)}
            onKeyPress={(e) => {
                e.key === "Enter" && handleEnterKey()
            }}
        >
        </input>
    );
};

export default StandardInput;