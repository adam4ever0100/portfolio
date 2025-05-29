// Main JavaScript for Portfolio Website

// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const body = document.querySelector('body');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');
const header = document.querySelector('header');
const backToTop = document.querySelector('.back-to-top');
const skillBars = document.querySelectorAll('.progress');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const courseworkToggle = document.querySelector('.coursework h5');
const courseList = document.querySelector('.course-list');
const contactForm = document.getElementById('contact-form');
const typingText = document.querySelector('.typing-text');

// Theme Toggle
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
}

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        
        // Reset hamburger
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        
        // Update active link
        navItems.forEach(navItem => navItem.classList.remove('active'));
        item.classList.add('active');
    });
});

// Sticky Header & Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        backToTop.classList.add('active');
    } else {
        header.classList.remove('scrolled');
        backToTop.classList.remove('active');
    }
    
    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
    
    // Animate skill bars when in viewport
    animateSkillBars();
});

// Back to Top Button Click
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate Skill Bars when in viewport
function animateSkillBars() {
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const progress = bar.getAttribute('data-progress');
        
        if (barTop < window.innerHeight - 100) {
            bar.style.width = `${progress}%`;
        }
    });
}

// Project Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Coursework Toggle
if (courseworkToggle) {
    courseworkToggle.addEventListener('click', () => {
        courseList.classList.toggle('active');
        const icon = courseworkToggle.querySelector('i');
        
        if (courseList.classList.contains('active')) {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
        } else {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        }
    });
}

// Contact Form Submission (Demo)
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name && email && subject && message) {
            // In a real application, you would send this data to a server
            alert('Thank you for your message! This is a demo form, so no message was actually sent.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Typing Effect for Hero Section
function typeEffect() {
    const text = "Computer Science Student & Developer";
    let i = 0;
    typingText.textContent = "";
    
    function typing() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typing, 100);
        }
    }
    
    typing();
}

// Initialize animations when page loads
window.addEventListener('load', () => {
    // Animate skill bars on page load
    setTimeout(() => {
        animateSkillBars();
    }, 1000);
    
    // Start typing effect
    typeEffect();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Set initial active nav link
    const initialSection = window.location.hash || '#home';
    const initialNavItem = document.querySelector(`a[href="${initialSection}"]`);
    if (initialNavItem) {
        initialNavItem.classList.add('active');
    }
    
    // AOS-like reveal animations for sections
    const revealElements = document.querySelectorAll('.section-header, .about-content, .skills-content, .projects-grid, .timeline, .additional-content, .contact-content');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(element);
    });
});
