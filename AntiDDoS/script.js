const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const app = express();

app.use(cors());

const blockedIPs = new Map();

app.use((req, res, next) => {
    const ip = req.ip;
    if (blockedIPs.has(ip)) {
        const banExpiry = blockedIPs.get(ip);
        if (Date.now() < banExpiry) {
            return res.status(403).json({ message: "Your IP has been blocked." })
        } else {
            blockedIPs.delete(ip);
        }
    }
    next();
});
// Rate limiter
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 2, // 2 for testing.
    message: "Too many requests from this IP, please try again later.",
    handler: (req, res, next, options) => {
        const ip = req.ip;
        console.log(`Rate limit exceeded for IP: ${ip}`);

        blockedIPs.set(ip, Date.now() + 24 * 60 * 60 * 1000);
        res.status(429).json({
            message: options.message,
        });
    }
});

app.use(limiter);

// for /login page [must be updated letter]
app.post('/login', (req, res) => {
    res.status(200).json({ message: "Login successful" });
});

// Start server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} \nVisit: http://localhost:${PORT}/login`)); 
