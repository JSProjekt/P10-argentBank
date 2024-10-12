import React from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import "../scss/Btns.scss";

const Btns = ({text = "Click", onClick = () => {}, to, className }) => {
    const navigate = useNavigate();
    const handleClick = (event) => {
        if(onClick) onClick(event);
        if (to) navigate(to);
    };

    return (
        <button 
        type="submit"
        className={className} 
        onClick={handleClick}
        >
        {text}
        </button>
    );
};

Button.PropTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    to: PropTypes.string,
    className: PropTypes.string,
};

export default Btns;