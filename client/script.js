const API_URL = 'http://localhost:5000';

// 1. Fetch dynamic project cards from backend API on page load
window.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('projectsContainer');
    try {
        const response = await fetch(`${API_URL}/api/projects`);
        const result = await response.json();
        
        if (result.success && result.data.length > 0) {
            container.innerHTML = '';
            result.data.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
                    <span style="font-size: 0.75rem; color: var(--accent-color); font-weight: 600; text-transform: uppercase;">${project.category}</span>
                    <h3 style="margin-top: 0.5rem;">${project.title}</h3>
                    <p>${project.description}</p>
                `;
                container.appendChild(card);
            });
        }
    } catch (err) {
        console.error('Error connecting to backend server:', err);
        container.innerHTML = `<p style="text-align: center; color: #ef4444; grid-column: span 3;">Could not load projects. Make sure the Node.js server is running!</p>`;
    }
});

// 2. Scroll Spy to dynamically update active navigation button states
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY;

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// 3. Handle Contact Form Submission & Post data to backend API
const contactForm = document.getElementById('contactForm');
const formResponse = document.getElementById('formResponse');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.innerHTML = 'Sending to Server... <i class="fa-solid fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    try {
        const response = await fetch(`${API_URL}/api/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        formResponse.style.display = 'block';
        if (result.success) {
            formResponse.style.background = 'rgba(34, 197, 94, 0.1)';
            formResponse.style.border = '1px solid #22c55e';
            formResponse.style.color = '#22c55e';
            formResponse.innerText = result.message;
            contactForm.reset();
        } else {
            formResponse.style.background = 'rgba(239, 68, 68, 0.1)';
            formResponse.style.border = '1px solid #ef4444';
            formResponse.style.color = '#ef4444';
            formResponse.innerText = result.error || 'Validation failed on server.';
        }
    } catch (err) {
        formResponse.style.display = 'block';
        formResponse.style.background = 'rgba(239, 68, 68, 0.1)';
        formResponse.style.border = '1px solid #ef4444';
        formResponse.style.color = '#ef4444';
        formResponse.innerText = 'Connection error: Unable to reach the backend server.';
    } finally {
        submitBtn.innerHTML = 'Send Message to Backend';
        submitBtn.disabled = false;
    }
});