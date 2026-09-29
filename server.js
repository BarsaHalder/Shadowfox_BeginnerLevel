const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Data: Featured Projects API Endpoint
const projectsData = [
    {
        id: 1,
        title: 'B.Verse Ecosystem',
        category: 'Full-Stack Web App',
        description: 'A scalable web platform built with Node.js, Express, and modern frontend tools featuring seamless database operations.'
    },
    {
        id: 2,
        title: 'Real-Time Task Manager',
        category: 'Backend & APIs',
        description: 'RESTful API service providing secure JWT authentication, task CRUD functionality, and high-performance querying.'
    },
    {
        id: 3,
        title: 'Interactive Portfolio Dashboard',
        category: 'Frontend Architecture',
        description: 'Responsive user interface engineered with dynamic scroll observers, asynchronous data fetching, and micro-interactions.'
    }
];

// GET: Fetch Projects
app.get('/api/projects', (req, res) => {
    res.json({
        success: true,
        count: projectsData.length,
        data: projectsData
    });
});

// POST: Contact Form Submission Handler
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Basic Server-Side Validation
    if (!name || !email || !subject || !message) {
        return res.status(400).json({
            success: false,
            error: 'All fields are required to process your request.'
        });
    }

    // Process submission successfully
    console.log(`[Contact Form Received] From: ${name} (${email}) | Subject: ${subject}`);

    return res.status(200).json({
        success: true,
        message: `Thank you, ${name}! Your message has been successfully received by the backend server.`
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});