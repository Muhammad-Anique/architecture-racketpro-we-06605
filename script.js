'use strict';

/**
 * RacketPro Web - Interactive Features
 * Handles navigation, testimonials, and lead generation form logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSmoothScrolling();
    initTestimonialCarousel();
    initContactForm();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const nav = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    
    // Add scroll styling to header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = '#ffffff';
        }
    });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Simple Testimonial Carousel Logic (P1)
 */
function initTestimonialCarousel() {
    const tracks = document.querySelectorAll('.testimonial-track');
    if (!tracks.length) return;

    // For a simple CSS-based carousel, we can add auto-scroll or 
    // touch swipe listeners here if enhanced functionality is needed.
    console.log('RacketPro: Testimonial system initialized.');
}

/**
 * Leads Contact Form Handling (P0)
 * Integrated with Supabase-ready logic
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic UI Feedback
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Collect Form Data
        const formData = new FormData(contactForm);
        const data = {
            full_name: formData.get('name'),
            email: formData.get('email'),
            sport: formData.get('sport'),
            message: formData.get('message'),
            created_at: new Date().toISOString()
        };

        try {
            /* 
               Note: To connect to Supabase, you would typically use their SDK:
               const { error } = await supabase.from('leads').insert([data]);
            */
            
            // Simulating API call for demonstration
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            console.log('Lead Data Captured:', data);

            // Success State
            alert('Thank you for contacting RacketPro! We will get back to you shortly.');
            contactForm.reset();

        } catch (error) {
            console.error('Submission Error:', error);
            alert('There was an issue sending your request. Please try again or call us directly.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

/**
 * Intersection Observer for Fade-in Animations
 */
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .pricing-table').forEach(el => {
    observer.observe(el);
});