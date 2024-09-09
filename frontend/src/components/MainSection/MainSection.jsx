import React, { useState } from 'react';
import './MainSection.css';

const MainSection = () => {
    const [aadhar, setAadhar] = useState('');
    const [hiddenAadhar, setHiddenAadhar] = useState('0000 0000 0000');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (aadhar.length === 12) {
            console.log('Form Submitted');
        } else {
            alert('Please enter a valid 12-digit Aadhar number.');
        }
    };

    return (
        <div className="main-section">
            <h2 className="main-heading">Login to Aadhar</h2>
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="aadhar">Aadhar Number</label>
                        <input
                            type="text"
                            id="aadhar"
                            name="aadhar"
                            maxLength="12"
                            pattern="\d{12}"
                            value={aadhar}
                            onChange={(e) => setAadhar(e.target.value)}
                            required
                            className="underline-input"
                            placeholder='XXXX XXXX XXXX'
                        />
                    </div>
                    <div className="form-group hidden">
                        <label htmlFor="hiddenAadhar">Confirm Aadhar Number</label>
                        <input
                            type="text"
                            id="hiddenAadhar"
                            name="hiddenAadhar"
                            value={hiddenAadhar}
                            onChange={(e) => setHiddenAadhar(e.target.value)} // Allow user to change
                            required
                            className="underline-input"
                        />
                    </div>
                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MainSection;
