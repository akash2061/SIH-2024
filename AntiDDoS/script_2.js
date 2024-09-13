const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const app = express();

app.use(cors());

const blockedIPs = new Map();
const suspiciousIPs = new Map();  // Track suspicious IPs
let totalRequests = 0;
let uniqueIPs = new Set();
let lastWindowStart = Date.now();
const WINDOW_SIZE = 1 * 60 * 1000; // 1 minute
const MAX_GLOBAL_REQUESTS = 500;
const MAX_UNIQUE_IPS = 100;

const DDoSThreshold = 50; // Low number of requests to flag an IP

// Middleware to block banned IPs
app.use((req, res, next) => {
    const ip = req.ip;
    if (blockedIPs.has(ip)) {
        const unbanTime = blockedIPs.get(ip);
        if (Date.now() < unbanTime) {
            return res.status(403).json({ message: 'Your IP has been blocked due to suspicious activity.' });
        } else {
            blockedIPs.delete(ip);
        }
    }
    next();
});

// Detect suspicious IPs based on behavior
app.use((req, res, next) => {
    const ip = req.ip;

    totalRequests += 1;
    uniqueIPs.add(ip);

    // Mark IP as suspicious if it sends many requests below the threshold
    if (!suspiciousIPs.has(ip)) {
        suspiciousIPs.set(ip, { count: 1, timestamp: Date.now() });
    } else {
        const record = suspiciousIPs.get(ip);
        record.count += 1;
        suspiciousIPs.set(ip, record);

        // If the IP consistently sends a small number of requests (below the threshold), flag it
        if (record.count > DDoSThreshold && (Date.now() - record.timestamp) < WINDOW_SIZE) {
            console.log(`Suspicious IP detected: ${ip}.`);
            blockedIPs.set(ip, Date.now() + 10 * 60 * 1000);  // Ban IP for 10 minutes
        }
    }

    // Reset suspicious IPs after each window
    if (Date.now() - lastWindowStart > WINDOW_SIZE) {
        suspiciousIPs.clear();
        totalRequests = 0;
        uniqueIPs.clear();
        lastWindowStart = Date.now();
    }

    next();
});

// Define rate limiter for individual IPs
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 3,
    handler: (req, res) => {
        const ip = req.ip;
        console.log(`Rate limit exceeded for IP: ${ip}`);
        blockedIPs.set(ip, Date.now() + 10 * 60 * 1000);  // Ban IP for 10 minutes
        res.status(429).json({ message: "Too many requests, please try again later." });
    }
});

app.use(limiter);

// Sample login endpoint
app.post('/login', (req, res) => {
    res.status(200).json({ message: "Login successful" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
