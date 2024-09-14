const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const app = express();

// Configure the proxy settings properly
app.set('trust proxy', 1); // Set to the number of proxies in front of your app

app.use(cors());
app.use(express.json()); // Ensure JSON parsing middleware is used

const blockedIPs = new Map();

function getClientIp(req) {
    // Use X-Forwarded-For if present, otherwise use req.ip
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(',')[0].trim() : req.ip;
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
    keyGenerator: (req) => getClientIp(req), // Ensure rate limit key is based on real IP
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
app.listen(PORT, () => console.log(`Server running on port ${PORT} \nVisit: http://localhost:${PORT}/`));
