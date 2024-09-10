const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const app = express();

app.use(cors());

// Rate limiter
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 1, // 1 for testing.
    message: "Too many requests from this IP, please try again later."
});

app.use(limiter);

// for /login page [must be updated letter]
app.post('/login', (req, res) => {
    res.status(200).json({ message: "Login successful" });
});

// Start server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} \nVisit: http://localhost:${PORT}/login`)); 
