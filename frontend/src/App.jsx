import React, { useEffect, useState } from 'react';
import './App.css'; 
import CameraPopup from './components/Popups/CameraPopup';
import CursorPopup from './components/Popups/CursorPopup';
import KeyboardPopup from './components/Popups/KeyboardPopup';
import Header from './components/Header/Header';
import MainSection from './components/MainSection/MainSection';
import Footer from './components/Footer/Footer';

const App = () => {
    const [showCameraPopup, setShowCameraPopup] = useState(true);
    const [showCursorPopup, setShowCursorPopup] = useState(false);
    const [showKeyboardPopup, setShowKeyboardPopup] = useState(false);

    useEffect(() => {
        const cameraTimer = setTimeout(() => {
            setShowCameraPopup(false);
            setShowCursorPopup(true);
        }, 1000); 

        
        const cursorTimer = setTimeout(() => {
            setShowCursorPopup(false);
            setShowKeyboardPopup(true);
        }, 2000); 

        
        const keyboardTimer = setTimeout(() => {
            setShowKeyboardPopup(false);
        }, 3000); 

		
        return () => {
            clearTimeout(cameraTimer);
            clearTimeout(cursorTimer);
            clearTimeout(keyboardTimer);
        };
    }, []);

    return (
        <div className="app-container">
            {/* Main content */}
            <div className="main-content">
                <Header/>
                <MainSection/>
            </div>

            {/* Conditional rendering of pop-ups */}
            {showCameraPopup && <CameraPopup/>}
            {showCursorPopup && <CursorPopup/>}
            {showKeyboardPopup && <KeyboardPopup/>}

            <Footer/>
        </div>
    );
};

export default App;
