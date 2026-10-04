// Add some dynamic interactivity and micro-animations

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mouse move parallax effect for the hero watch image
    const watchImg = document.getElementById('interactive-watch');
    
    if (watchImg) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            watchImg.style.transform = `translateY(${yAxis}px) translateX(${xAxis}px) rotate(${xAxis/5}deg)`;
            watchImg.style.animation = 'none';
        });

        // Resume animation when mouse leaves window
        document.addEventListener('mouseleave', () => {
            watchImg.style.animation = 'float 6s ease-in-out infinite';
            watchImg.style.transform = `translateY(0px) translateX(0px) rotate(0deg)`;
        });
    }

    // 2. 3D Tilt effect for product cards
    const cards = document.querySelectorAll('.js-tilt');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // 3. Contact Form Submission mock
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.style.opacity = '0.7';
            
            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.background = 'linear-gradient(90deg, #00C9FF, #92FE9D)';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }

    // 4. Scroll Animation Observer (Fade up on scroll)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-scroll');
    hiddenElements.forEach(el => observer.observe(el));
    
    // 5. Active Nav Link on Scroll
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 6. Modal Logic
    const buyBtns = document.querySelectorAll('.buy-btn');
    const modals = document.querySelectorAll('.product-modal');
    const overlay = document.getElementById('modal-overlay');
    const closeBtns = document.querySelectorAll('.close-modal');

    if (buyBtns.length > 0 && modals.length > 0) {
        buyBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                if (modals[index]) {
                    modals[index].classList.add('active');
                    overlay.classList.add('active');
                }
            });
        });

        const closeModal = () => {
            modals.forEach(m => m.classList.remove('active'));
            overlay.classList.remove('active');
        };

        closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
        overlay.addEventListener('click', closeModal);
    }
});
