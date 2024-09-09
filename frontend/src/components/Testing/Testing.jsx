import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Testing.css'; // Internal CSS for this component

const Testing = () => {
    const navigate = useNavigate();

    const handleButtonClick = (userType) => {
        navigate('/app');
    };

    return (
        <div className="testing-container">
            <h1 className="testing-heading">Choose an Option</h1>
            <div className="button-container">
                <button className="testing-btn" onClick={() => handleButtonClick('user')}>
                    User
                </button>
                <button className="testing-btn" onClick={() => handleButtonClick('bot')}>
                    Bot
                </button>
            </div>
        </div>
    );
};

export default Testing;
