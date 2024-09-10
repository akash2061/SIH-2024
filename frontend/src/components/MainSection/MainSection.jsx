// import React, { useState } from 'react';
// import './MainSection.css';

// const MainSection = () => {
//     const [aadhar, setAadhar] = useState('');
//     const [hiddenAadhar, setHiddenAadhar] = useState('0000 0000 0000');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (aadhar.length === 12) {
//             console.log('Form Submitted');
//         } else {
//             alert('Please enter a valid 12-digit Aadhar number.');
//         }
//     };

//     return (
//         <div className="main-section">
//             <h2 className="main-heading">Login to Aadhar</h2>
//             <div className="card">
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label htmlFor="aadhar">Aadhar Number</label>
//                         <input
//                             type="text"
//                             id="aadhar"
//                             name="aadhar"
//                             maxLength="12"
//                             pattern="\d{12}"
//                             value={aadhar}
//                             onChange={(e) => setAadhar(e.target.value)}
//                             required
//                             className="underline-input"
//                             placeholder='XXXX XXXX XXXX'
//                         />
//                     </div>
//                     <div className="form-group hidden">
//                         <label htmlFor="hiddenAadhar">Confirm Aadhar Number</label>
//                         <input
//                             type="text"
//                             id="hiddenAadhar"
//                             name="hiddenAadhar"
//                             value={hiddenAadhar}
//                             onChange={(e) => setHiddenAadhar(e.target.value)} // Allow user to change
//                             required
//                             className="underline-input"
//                         />
//                     </div>
//                     <button type="submit" className="submit-btn">
//                         Login
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default MainSection;



// import React, { useState } from 'react';
// import './MainSection.css';

// const MainSection = () => {
//     const [aadhar, setAadhar] = useState('');
//     const [hiddenAadhar, setHiddenAadhar] = useState('0000 0000 0000');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (aadhar.length === 12) {
//             console.log('Form Submitted');
//         } else {
//             alert('Please enter a valid 12-digit Aadhar number.');
//         }
//     };

//     return (
//         <div className="main-section">
//             <h2 className="main-heading">Login to Aadhar</h2>
//             <div className="card">
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label htmlFor="aadhar">Aadhar Number</label>
//                         <input
//                             type="text"
//                             id="aadhar"
//                             name="aadhar"
//                             maxLength="12"
//                             pattern="\d{12}"
//                             value={aadhar}
//                             onChange={(e) => setAadhar(e.target.value)}
//                             required
//                             className="underline-input"
//                             placeholder='XXXX XXXX XXXX'
//                         />
//                     </div>
//                     <div className="form-group hidden">
//                         <label htmlFor="hiddenAadhar">Confirm Aadhar Number</label>
//                         <input
//                             type="text"
//                             id="hiddenAadhar"
//                             name="hiddenAadhar"
//                             value={hiddenAadhar}
//                             onChange={(e) => setHiddenAadhar(e.target.value)} // Allow user to change
//                             required
//                             className="underline-input"
//                         />
//                     </div>
//                     <button type="submit" className="submit-btn">
//                         Login
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default MainSection;


import React, { useState, useEffect } from 'react';
import './MainSection.css';

const MainSection = () => {
    const [aadhar, setAadhar] = useState('');
    const [hiddenAadhar, setHiddenAadhar] = useState(''); // Honeypot field should be initially empty
    const [startTime, setStartTime] = useState(null);

    // Start the timer when the user enters the first field
    useEffect(() => {
        if (aadhar.length === 1 && !startTime) {
            setStartTime(Date.now());
        }
    }, [aadhar, startTime]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Calculate time spent on the form
        const timeSpent = (Date.now() - startTime) / 1000; // in seconds

        // Honeypot check
        if (hiddenAadhar) {
            alert('You are a bot!');
            return;
        }

        // Time check (adjust threshold as needed)
        if (timeSpent < 3) {
            alert('You are a bot!');
            return;
        }

        // Aadhar validation
        if (aadhar.length === 12) {
            console.log('Form Submitted');
            alert('Form Submitted Successfully!');
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
                            placeholder="XXXX XXXX XXXX"
                        />
                    </div>
                    <div className="form-group hidden">
                        <label htmlFor="hiddenAadhar">Confirm Aadhar Number</label>
                        <input
                            type="text"
                            id="hiddenAadhar"
                            name="hiddenAadhar"
                            value={hiddenAadhar}
                            onChange={(e) => setHiddenAadhar(e.target.value)} // This field should remain empty
                            className="underline-input"
                        />
                    </div>
                    <button type="submit" className="submit-btn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MainSection;
