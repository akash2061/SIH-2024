// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import App from './App';
// import Testing from './components/Testing/Testing';
// import './index.css'; // Your main styles

// ReactDOM.render(
//     <Router>
//         <Routes>
//             <Route path="/" element={<Testing />} />
//             <Route path="/app" element={<App />} />
//         </Routes>
//     </Router>,
//     document.getElementById('root')
// );

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Testing from './components/Testing/Testing';
import './index.css'; // Your main styles

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Testing />} />
                <Route path="/app" element={<App />} />
            </Routes>
        </Router>
    </React.StrictMode>
);


