const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const app = express();

// Configure the proxy settings
app.set('trust proxy', 1);

app.use(cors());

const blockedIPs = new Map();

function getClientIp(req) {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(',')[0].trim() : req.ip;
    // Handle IPv6 loopback address
    return ip === '::1' ? '127.0.0.1' : ip;
}

app.use((req, res, next) => {
    const ip = getClientIp(req);
    if (blockedIPs.has(ip)) {
        const banExpiry = blockedIPs.get(ip);
        if (Date.now() < banExpiry) {
            return res.status(403).json({ message: "Your IP has been blocked." });
        } else {
            blockedIPs.delete(ip);
        }
    }
    next();
});

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // 5 requests per minute
    message: "Too many requests from this IP, please try again later.",
    keyGenerator: (req) => getClientIp(req),
    handler: (req, res, next, options) => {
        const ip = getClientIp(req);
        console.log(`Rate limit exceeded for IP: ${ip}`);
        blockedIPs.set(ip, Date.now() + 24 * 60 * 60 * 1000); // Block for 24 hours
        res.status(429).json({ message: options.message });
    },
});

app.use(limiter);

app.get('/', (req, res) => {
    res.status(200).send('Server is running');
});

app.post('/', (req, res) => {
    res.status(200).json({ message: "Login successful" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} \nVisit: http://localhost:5000/`));
