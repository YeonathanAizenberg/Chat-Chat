import React from "react";
import { Button } from "react-bootstrap";
import './StandardButton.css';

const StandardButton = ({text, handleOnClick, className}) => {

    return (
        <Button onClick={()=>handleOnClick()} className={className}>
            {text}
        </Button>
    );
};

export default StandardButton;