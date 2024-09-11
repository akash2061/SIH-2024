import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './MainSection.css';

const MainSection = () => {
    const [aadhar, setAadhar] = useState('');
    const [hiddenAadhar, setHiddenAadhar] = useState('');
    const [showBotModal, setShowBotModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [buttonText, setButtonText] = useState('Login');
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [lastActivityTime, setLastActivityTime] = useState(Date.now());
    const [initialActivityDetected, setInitialActivityDetected] = useState(false);
    const [verificationSuccess, setVerificationSuccess] = useState(false);
    const inactivityTimeout = 5000; // 5 seconds

    useEffect(() => {
        const handleActivity = () => {
            setLastActivityTime(Date.now());
            if (!initialActivityDetected) {
                setInitialActivityDetected(true);
            }
        };

        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);

        return () => {
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
        };
    }, [initialActivityDetected]);

    useEffect(() => {
        const checkInactivity = () => {
            if (Date.now() - lastActivityTime > inactivityTimeout) {
                if (!initialActivityDetected) {
                    setShowBotModal(true);
                }
            }
        };

        const interval = setInterval(checkInactivity, inactivityTimeout);

        return () => clearInterval(interval);
    }, [lastActivityTime, initialActivityDetected]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (showBotModal) {
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            if (aadhar.length === 12) {
                setVerificationSuccess(true);
                setButtonText('Verified Successfully !');
                setSubmissionMessage('');
            } else {
                setButtonText('Login');
                setSubmissionMessage('Please enter a valid 12-digit Aadhar number.');
            }
        }, 1500);
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
                            onChange={(e) => setHiddenAadhar(e.target.value)}
                            className="underline-input"
                        />
                    </div>
                    <button type="submit" className="submit-btn" disabled={isSubmitting || verificationSuccess}>
                        {isSubmitting ? <CircularProgress size={24} /> : buttonText}
                    </button>
                    <button className="arrow-btn">
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                </form>
            </div>
            {submissionMessage && (
                <div className="submission-message">
                    <p>{submissionMessage}</p>
                </div>
            )}
            {showBotModal && (
                <div className="bot-modal">
                    <div className="bot-modal-content">
                        <h3>Bot Detected!</h3>
                        <p>Please ensure you're not a bot.</p>
                        <button onClick={() => setShowBotModal(false)} className="modal-close-btn">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainSection;










// // import React, { useState } from 'react';
// // import './MainSection.css';

// // const MainSection = () => {
// //     const [aadhar, setAadhar] = useState('');
// //     const [hiddenAadhar, setHiddenAadhar] = useState('0000 0000 0000');

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         if (aadhar.length === 12) {
// //             console.log('Form Submitted');
// //         } else {
// //             alert('Please enter a valid 12-digit Aadhar number.');
// //         }
// //     };

// //     return (
// //         <div className="main-section">
// //             <h2 className="main-heading">Login to Aadhar</h2>
// //             <div className="card">
// //                 <form onSubmit={handleSubmit}>
// //                     <div className="form-group">
// //                         <label htmlFor="aadhar">Aadhar Number</label>
// //                         <input
// //                             type="text"
// //                             id="aadhar"
// //                             name="aadhar"
// //                             maxLength="12"
// //                             pattern="\d{12}"
// //                             value={aadhar}
// //                             onChange={(e) => setAadhar(e.target.value)}
// //                             required
// //                             className="underline-input"
// //                             placeholder='XXXX XXXX XXXX'
// //                         />
// //                     </div>
// //                     <div className="form-group hidden">
// //                         <label htmlFor="hiddenAadhar">Confirm Aadhar Number</label>
// //                         <input
// //                             type="text"
// //                             id="hiddenAadhar"
// //                             name="hiddenAadhar"
// //                             value={hiddenAadhar}
// //                             onChange={(e) => setHiddenAadhar(e.target.value)} // Allow user to change
// //                             required
// //                             className="underline-input"
// //                         />
// //                     </div>
// //                     <button type="submit" className="submit-btn">
// //                         Login
// //                     </button>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // };

// // export default MainSection;



// // import React, { useState } from 'react';
// // import './MainSection.css';

// // const MainSection = () => {
// //     const [aadhar, setAadhar] = useState('');
// //     const [hiddenAadhar, setHiddenAadhar] = useState('0000 0000 0000');

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         if (aadhar.length === 12) {
// //             console.log('Form Submitted');
// //         } else {
// //             alert('Please enter a valid 12-digit Aadhar number.');
// //         }
// //     };

// //     return (
// //         <div className="main-section">
// //             <h2 className="main-heading">Login to Aadhar</h2>
// //             <div className="card">
// //                 <form onSubmit={handleSubmit}>
// //                     <div className="form-group">
// //                         <label htmlFor="aadhar">Aadhar Number</label>
// //                         <input
// //                             type="text"
// //                             id="aadhar"
// //                             name="aadhar"
// //                             maxLength="12"
// //                             pattern="\d{12}"
// //                             value={aadhar}
// //                             onChange={(e) => setAadhar(e.target.value)}
// //                             required
// //                             className="underline-input"
// //                             placeholder='XXXX XXXX XXXX'
// //                         />
// //                     </div>
// //                     <div className="form-group hidden">
// //                         <label htmlFor="hiddenAadhar">Confirm Aadhar Number</label>
// //                         <input
// //                             type="text"
// //                             id="hiddenAadhar"
// //                             name="hiddenAadhar"
// //                             value={hiddenAadhar}
// //                             onChange={(e) => setHiddenAadhar(e.target.value)} // Allow user to change
// //                             required
// //                             className="underline-input"
// //                         />
// //                     </div>
// //                     <button type="submit" className="submit-btn">
// //                         Login
// //                     </button>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // };

// // export default MainSection;













// // import React, { useState, useEffect } from 'react';
// // import './MainSection.css';

// // const MainSection = () => {
// //     const [aadhar, setAadhar] = useState('');
// //     const [hiddenAadhar, setHiddenAadhar] = useState(''); // Honeypot field should be initially empty
// //     const [startTime, setStartTime] = useState(null);

// //     // Start the timer when the user enters the first field
// //     useEffect(() => {
// //         if (aadhar.length === 1 && !startTime) {
// //             setStartTime(Date.now());
// //         }
// //     }, [aadhar, startTime]);

// //     const handleSubmit = (e) => {
// //         e.preventDefault();

// //         // Calculate time spent on the form
// //         const timeSpent = (Date.now() - startTime) / 1000; // in seconds

// //         // Honeypot check
// //         if (hiddenAadhar) {
// //             alert('You are a bot!');
// //             return;
// //         }

// //         // Time check (adjust threshold as needed)
// //         if (timeSpent < 3) {
// //             alert('You are a bot!');
// //             return;
// //         }

// //         // Aadhar validation
// //         if (aadhar.length === 12) {
// //             console.log('Form Submitted');
// //             alert('Form Submitted Successfully!');
// //         } else {
// //             alert('Please enter a valid 12-digit Aadhar number.');
// //         }
// //     };

// //     return (
// //         <div className="main-section">
// //             <h2 className="main-heading">Login to Aadhar</h2>
// //             <div className="card">
// //                 <form onSubmit={handleSubmit}>
// //                     <div className="form-group">
// //                         <label htmlFor="aadhar">Aadhar Number</label>
// //                         <input
// //                             type="text"
// //                             id="aadhar"
// //                             name="aadhar"
// //                             maxLength="12"
// //                             pattern="\d{12}"
// //                             value={aadhar}
// //                             onChange={(e) => setAadhar(e.target.value)}
// //                             required
// //                             className="underline-input"
// //                             placeholder="XXXX XXXX XXXX"
// //                         />
// //                     </div>
// //                     <div className="form-group hidden">
// //                         <label htmlFor="hiddenAadhar">Confirm Aadhar Number</label>
// //                         <input
// //                             type="text"
// //                             id="hiddenAadhar"
// //                             name="hiddenAadhar"
// //                             value={hiddenAadhar}
// //                             onChange={(e) => setHiddenAadhar(e.target.value)} // This field should remain empty
// //                             className="underline-input"
// //                         />
// //                     </div>
// //                     <button type="submit" className="submit-btn">
// //                         Login
// //                     </button>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // };

// // export default MainSection;







// // import React, { useState, useEffect } from 'react';
// // import './MainSection.css';

// // const MainSection = () => {
// //     const [aadhar, setAadhar] = useState('');
// //     const [hiddenAadhar, setHiddenAadhar] = useState(''); // Honeypot field should be initially empty
// //     const [startTime, setStartTime] = useState(null);
// //     const [lastMouseMove, setLastMouseMove] = useState(Date.now());

// //     // Set up the timer when the user enters the first field
// //     useEffect(() => {
// //         if (aadhar.length === 1 && !startTime) {
// //             setStartTime(Date.now());
// //         }
// //     }, [aadhar, startTime]);

// //     // Track mouse movement
// //     useEffect(() => {
// //         const handleMouseMove = () => {
// //             setLastMouseMove(Date.now());
// //         };

// //         window.addEventListener('mousemove', handleMouseMove);

// //         return () => {
// //             window.removeEventListener('mousemove', handleMouseMove);
// //         };
// //     }, []);

// //     // Check if there's no mouse movement for 3 seconds
// //     useEffect(() => {
// //         const interval = setInterval(() => {
// //             if (Date.now() - lastMouseMove > 3000) {
// //                 alert('Bot');
// //                 clearInterval(interval);
// //             }
// //         }, 3000);

// //         return () => clearInterval(interval);
// //     }, [lastMouseMove]);

// //     const handleSubmit = (e) => {
// //         e.preventDefault();

// //         // Calculate time spent on the form
// //         const timeSpent = (Date.now() - startTime) / 1000; // in seconds

// //         // Honeypot check
// //         if (hiddenAadhar) {
// //             alert('You are a bot!');
// //             return;
// //         }

// //         // Time check (adjust threshold as needed)
// //         if (timeSpent < 3) {
// //             alert('You are a bot!');
// //             return;
// //         }

// //         // Aadhar validation
// //         if (aadhar.length === 12) {
// //             console.log('Form Submitted');
// //             alert('Form Submitted Successfully!');
// //         } else {
// //             alert('Please enter a valid 12-digit Aadhar number.');
// //         }
// //     };

// //     return (
// //         <div className="main-section">
// //             <h2 className="main-heading">Login to Aadhar</h2>
// //             <div className="card">
// //                 <form onSubmit={handleSubmit}>
// //                     <div className="form-group">
// //                         <label htmlFor="aadhar">Aadhar Number</label>
// //                         <input
// //                             type="text"
// //                             id="aadhar"
// //                             name="aadhar"
// //                             maxLength="12"
// //                             pattern="\d{12}"
// //                             value={aadhar}
// //                             onChange={(e) => setAadhar(e.target.value)}
// //                             required
// //                             className="underline-input"
// //                             placeholder="XXXX XXXX XXXX"
// //                         />
// //                     </div>
// //                     <div className="form-group hidden">
// //                         <label htmlFor="hiddenAadhar">Confirm Aadhar Number</label>
// //                         <input
// //                             type="text"
// //                             id="hiddenAadhar"
// //                             name="hiddenAadhar"
// //                             value={hiddenAadhar}
// //                             onChange={(e) => setHiddenAadhar(e.target.value)} // This field should remain empty
// //                             className="underline-input"
// //                         />
// //                     </div>
// //                     <button type="submit" className="submit-btn">
// //                         Login
// //                     </button>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // };

// // export default MainSection;








// import React, { useState, useEffect } from 'react';
// import './MainSection.css';

// const MainSection = () => {
//     const [aadhar, setAadhar] = useState('');
//     const [hiddenAadhar, setHiddenAadhar] = useState('');
//     const [startTime, setStartTime] = useState(null);
//     const [lastMouseMove, setLastMouseMove] = useState(Date.now());
//     const [showBotModal, setShowBotModal] = useState(false);

//     useEffect(() => {
//         if (aadhar.length === 1 && !startTime) {
//             setStartTime(Date.now());
//         }
//     }, [aadhar, startTime]);

//     useEffect(() => {
//         const handleMouseMove = () => {
//             setLastMouseMove(Date.now());
//         };

//         window.addEventListener('mousemove', handleMouseMove);

//         return () => {
//             window.removeEventListener('mousemove', handleMouseMove);
//         };
//     }, []);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             if (Date.now() - lastMouseMove > 3000) {
//                 setShowBotModal(true);
//                 clearInterval(interval);
//             }
//         }, 3000);

//         return () => clearInterval(interval);
//     }, [lastMouseMove]);

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const timeSpent = (Date.now() - startTime) / 1000;

//         if (hiddenAadhar || timeSpent < 3) {
//             setShowBotModal(true);
//             return;
//         }

//         if (aadhar.length === 12) {
//             console.log('Form Submitted');
//             alert('Form Submitted Successfully!');
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
//                             placeholder="XXXX XXXX XXXX"
//                         />
//                     </div>
//                     <div className="form-group hidden">
//                         <label htmlFor="hiddenAadhar">Confirm Aadhar Number</label>
//                         <input
//                             type="text"
//                             id="hiddenAadhar"
//                             name="hiddenAadhar"
//                             value={hiddenAadhar}
//                             onChange={(e) => setHiddenAadhar(e.target.value)}
//                             className="underline-input"
//                         />
//                     </div>
//                     <button type="submit" className="submit-btn">
//                         Login
//                     </button>
//                 </form>
//             </div>

//             {showBotModal && (
//                 <div className="modal-overlay">
//                     <div className="modal-content">
//                         <h3>You are a bot</h3>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MainSection;














// import React, { useState, useEffect } from 'react';
// import './MainSection.css';

// const MainSection = () => {
//     const [aadhar, setAadhar] = useState('');
//     const [hiddenAadhar, setHiddenAadhar] = useState('');
//     const [showBotModal, setShowBotModal] = useState(false);
//     const [lastActivityTime, setLastActivityTime] = useState(Date.now());
//     const inactivityTimeout = 5000; // 5 seconds

//     useEffect(() => {
//         const handleActivity = () => {
//             setLastActivityTime(Date.now()); // Update last activity time on mouse move or key press
//         };

//         window.addEventListener('mousemove', handleActivity);
//         window.addEventListener('keydown', handleActivity);

//         return () => {
//             window.removeEventListener('mousemove', handleActivity);
//             window.removeEventListener('keydown', handleActivity);
//         };
//     }, []);

//     useEffect(() => {
//         const checkInactivity = () => {
//             if (Date.now() - lastActivityTime > inactivityTimeout) {
//                 setShowBotModal(true); // Show bot modal if no activity detected
//             }
//         };

//         const interval = setInterval(checkInactivity, inactivityTimeout);

//         return () => clearInterval(interval); // Cleanup the interval on component unmount
//     }, [lastActivityTime]);

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (showBotModal) {
//             // Don't submit if bot modal is shown
//             return;
//         }

//         if (aadhar.length === 12) {
//             console.log('Form Submitted');
//             alert('Form Submitted Successfully!');
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
//                             placeholder="XXXX XXXX XXXX"
//                         />
//                     </div>
//                     <div className="form-group hidden">
//                         <label htmlFor="hiddenAadhar">Confirm Aadhar Number</label>
//                         <input
//                             type="text"
//                             id="hiddenAadhar"
//                             name="hiddenAadhar"
//                             value={hiddenAadhar}
//                             onChange={(e) => setHiddenAadhar(e.target.value)}
//                             className="underline-input"
//                         />
//                     </div>
//                     <button type="submit" className="submit-btn">
//                         Login
//                     </button>
//                 </form>
//             </div>
//             {showBotModal && (
//                 <div className="bot-modal">
//                     <div className="bot-modal-content">
//                         <h3>Bot Detected!</h3>
//                         <p>Please ensure you're not a bot.</p>
//                         <button onClick={() => setShowBotModal(false)} className="modal-close-btn">
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MainSection;








// import React, { useState, useEffect } from 'react';
// import CircularProgress from '@mui/material/CircularProgress';
// import './MainSection.css';

// const MainSection = () => {
//     const [aadhar, setAadhar] = useState('');
//     const [hiddenAadhar, setHiddenAadhar] = useState('');
//     const [showBotModal, setShowBotModal] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [submissionMessage, setSubmissionMessage] = useState('');
//     const [lastActivityTime, setLastActivityTime] = useState(Date.now());
//     const inactivityTimeout = 5000; // 5 seconds

//     useEffect(() => {
//         const handleActivity = () => {
//             setLastActivityTime(Date.now()); // Update last activity time on mouse move or key press
//         };

//         window.addEventListener('mousemove', handleActivity);
//         window.addEventListener('keydown', handleActivity);

//         return () => {
//             window.removeEventListener('mousemove', handleActivity);
//             window.removeEventListener('keydown', handleActivity);
//         };
//     }, []);

//     useEffect(() => {
//         const checkInactivity = () => {
//             if (Date.now() - lastActivityTime > inactivityTimeout) {
//                 setShowBotModal(true); // Show bot modal if no activity detected
//             }
//         };

//         const interval = setInterval(checkInactivity, inactivityTimeout);

//         return () => clearInterval(interval); // Cleanup the interval on component unmount
//     }, [lastActivityTime]);

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (showBotModal) {
//             // Don't submit if bot modal is shown
//             return;
//         }

//         setIsSubmitting(true); // Show loader

//         setTimeout(() => {
//             // Simulate form submission delay
//             setIsSubmitting(false);
//             if (aadhar.length === 12) {
//                 setSubmissionMessage('Form Submitted Successfully!');
//             } else {
//                 setSubmissionMessage('Please enter a valid 12-digit Aadhar number.');
//             }
//         }, 1500); // 1.5 seconds delay
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
//                             placeholder="XXXX XXXX XXXX"
//                         />
//                     </div>
//                     <div className="form-group hidden">
//                         <label htmlFor="hiddenAadhar">Confirm Aadhar Number</label>
//                         <input
//                             type="text"
//                             id="hiddenAadhar"
//                             name="hiddenAadhar"
//                             value={hiddenAadhar}
//                             onChange={(e) => setHiddenAadhar(e.target.value)}
//                             className="underline-input"
//                         />
//                     </div>
//                     <button type="submit" className="submit-btn" disabled={isSubmitting}>
//                         {isSubmitting ? <CircularProgress size={24} /> : 'Login'}
//                     </button>
//                 </form>
//             </div>
//             {submissionMessage && (
//                 <div className="submission-message">
//                     <p>{submissionMessage}</p>
//                 </div>
//             )}
//             {showBotModal && (
//                 <div className="bot-modal">
//                     <div className="bot-modal-content">
//                         <h3>Bot Detected!</h3>
//                         <p>Please ensure you're not a bot.</p>
//                         <button onClick={() => setShowBotModal(false)} className="modal-close-btn">
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MainSection;








// import React, { useState, useEffect } from 'react';
// import CircularProgress from '@mui/material/CircularProgress';
// import './MainSection.css';

// const MainSection = () => {
//     const [aadhar, setAadhar] = useState('');
//     const [hiddenAadhar, setHiddenAadhar] = useState('');
//     const [showBotModal, setShowBotModal] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [buttonText, setButtonText] = useState('Login');
//     const [submissionMessage, setSubmissionMessage] = useState('');
//     const [lastActivityTime, setLastActivityTime] = useState(Date.now());
//     const [initialActivityDetected, setInitialActivityDetected] = useState(false);
//     const inactivityTimeout = 5000; // 5 seconds

//     useEffect(() => {
//         const handleActivity = () => {
//             setLastActivityTime(Date.now()); // Update last activity time on mouse move or key press
//             if (!initialActivityDetected) {
//                 setInitialActivityDetected(true); // Mark initial activity as detected
//             }
//         };

//         window.addEventListener('mousemove', handleActivity);
//         window.addEventListener('keydown', handleActivity);

//         return () => {
//             window.removeEventListener('mousemove', handleActivity);
//             window.removeEventListener('keydown', handleActivity);
//         };
//     }, [initialActivityDetected]);

//     useEffect(() => {
//         const checkInactivity = () => {
//             if (Date.now() - lastActivityTime > inactivityTimeout) {
//                 if (!initialActivityDetected) {
//                     setShowBotModal(true); // Show bot modal if no initial activity detected
//                 }
//             }
//         };

//         const interval = setInterval(checkInactivity, inactivityTimeout);

//         return () => clearInterval(interval); // Cleanup the interval on component unmount
//     }, [lastActivityTime, initialActivityDetected]);

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (showBotModal) {
//             // Don't submit if bot modal is shown
//             return;
//         }

//         setIsSubmitting(true); // Show loader

//         setTimeout(() => {
//             // Simulate form submission delay
//             setIsSubmitting(false);
//             if (aadhar.length === 12) {
//                 setButtonText('Verified Successfully !'); // Update button text
//                 setSubmissionMessage(''); // Clear submission message
//             } else {
//                 setButtonText('Login'); // Reset button text if Aadhar is invalid
//                 setSubmissionMessage('Please enter a valid 12-digit Aadhar number.');
//             }
//         }, 1500); // 1.5 seconds delay
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
//                             placeholder="XXXX XXXX XXXX"
//                         />
//                     </div>
//                     <div className="form-group hidden">
//                         <label htmlFor="hiddenAadhar">Confirm Aadhar Number</label>
//                         <input
//                             type="text"
//                             id="hiddenAadhar"
//                             name="hiddenAadhar"
//                             value={hiddenAadhar}
//                             onChange={(e) => setHiddenAadhar(e.target.value)}
//                             className="underline-input"
//                         />
//                     </div>
//                     <button type="submit" className="submit-btn" disabled={isSubmitting}>
//                         {isSubmitting ? <CircularProgress size={24} /> : buttonText}
//                     </button>
//                 </form>
//             </div>
//             {submissionMessage && (
//                 <div className="submission-message">
//                     <p>{submissionMessage}</p>
//                 </div>
//             )}
//             {showBotModal && (
//                 <div className="bot-modal">
//                     <div className="bot-modal-content">
//                         <h3>Bot Detected!</h3>
//                         <p>Please ensure you're not a bot.</p>
//                         <button onClick={() => setShowBotModal(false)} className="modal-close-btn">
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MainSection;








