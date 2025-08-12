// Matrix Rain Effect
function createMatrixRain() {
    const matrixRain = document.getElementById('matrix-rain');
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = i * 20 + 'px';
        column.style.animationDelay = Math.random() * 8 + 's';
        column.style.animationDuration = (Math.random() * 4 + 6) + 's';
        
        // Create random characters for this column
        let columnText = '';
        for (let j = 0; j < 50; j++) {
            columnText += characters[Math.floor(Math.random() * characters.length)] + '<br>';
        }
        column.innerHTML = columnText;
        
        matrixRain.appendChild(column);
    }
}

// Typing Animation
const typewriter = new Typewriter('#typing-text', {
    strings: ['Halo, Saya <span style="color: #6366f1;">Ahmad Putra Ramadhan</span>'],
    autoStart: true,
    loop: false,
    delay: 100,
    deleteSpeed: 50,
    cursor: '|',
    html: true
});

const typewriterDesc = new Typewriter('#typing-description', {
    strings: ['Seorang Pelajar dari Smkn 20 Jakarta, saya merupakan seorang pemula di bidang Web Development'],
    autoStart: false,
    loop: false,
    delay: 50,
    deleteSpeed: 30,
    cursor: ''
});

// Start description typing after title is done
setTimeout(() => {
    typewriterDesc.start();
}, 3000);

// Fallback: If typewriter fails, ensure text is visible
setTimeout(() => {
    const typingText = document.getElementById('typing-text');
    if (typingText && !typingText.textContent.includes('Ahmad')) {
        typingText.innerHTML = 'Halo, Saya <span class="text-accent">Ahmad Putra Ramadhan</span>';
    }
}, 1000);

// Mobile menu functions
function openMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    mobileMenu.classList.remove('translate-x-full');
    mobileOverlay.classList.remove('opacity-0', 'invisible');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    mobileMenu.classList.add('translate-x-full');
    mobileOverlay.classList.add('opacity-0', 'invisible');
    document.body.style.overflow = 'auto';
}

// Back to top button visibility
window.addEventListener('scroll', () => {
    const backToTop = document.getElementById('back-to-top');
    if (window.pageYOffset > 300) {
        backToTop.classList.remove('opacity-0', 'invisible');
        backToTop.classList.add('opacity-100', 'visible');
    } else {
        backToTop.classList.add('opacity-0', 'invisible');
        backToTop.classList.remove('opacity-100', 'visible');
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Animasi skill bar on scroll
const animateSkills = () => {
    const skillBars = document.querySelectorAll('.skill-item .bg-accent');
    skillBars.forEach(skillBar => {
        const width = skillBar.style.width;
        skillBar.style.width = '0';
        setTimeout(() => {
            skillBar.style.width = width;
        }, 100);
    });
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Interactive Project Cards
const projectData = {
    project1: {
        title: 'Sistem BanAll GTA SA:MP',
        description: 'Sebuah teknologi dasar Lua yang memungkinkan player mem banned semua player di dalam server. Project ini dibuat untuk keperluan admin server GTA SA:MP dengan fitur yang mudah digunakan dan efisien.',
        image: 'images/samp.jpg',
        technologies: ['Lua', 'GTA SA:MP', 'Server Management'],
        features: [
            'Ban semua player dalam satu klik',
            'Interface admin yang user-friendly',
            'Logging system untuk tracking',
            'Permission management'
        ],
        github: 'https://github.com/ahm4d-putra/Banned-All',
        demo: '#'
    },
    project2: {
        title: 'Demonstrasi Judi Online',
        description: 'Sebuah simulasi edukasi untuk sosialisasi penanggulangan judi online. Project ini dibuat menggunakan Python dengan interface terminal yang interaktif untuk memberikan pemahaman tentang bahaya judi online.',
        image: 'images/judjud.jpg',
        technologies: ['Python', 'Terminal UI', 'Simulation'],
        features: [
            'Simulasi judi online yang realistis',
            'Sistem edukasi interaktif',
            'Statistik dan analisis',
            'Interface terminal yang menarik'
        ],
        github: 'https://github.com/ahm4d-putra/SimulasiJudol',
        demo: '#'
    }
};

// Project modal functionality
const projectModal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const modalTech = document.getElementById('modal-tech');
const modalFeatures = document.getElementById('modal-features');
const modalGithub = document.getElementById('modal-github');
const modalDemo = document.getElementById('modal-demo');
const closeModal = document.getElementById('close-modal');

function openProjectModal(projectId) {
    const project = projectData[projectId];
    
    modalTitle.textContent = project.title;
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalDescription.textContent = project.description;
    
    // Set technologies
    modalTech.innerHTML = '';
    project.technologies.forEach(tech => {
        const techTag = document.createElement('span');
        techTag.className = 'bg-accent text-white px-3 py-1 rounded-full text-sm';
        techTag.textContent = tech;
        modalTech.appendChild(techTag);
    });
    
    // Set features
    modalFeatures.innerHTML = '';
    project.features.forEach(feature => {
        const li = document.createElement('li');
        li.className = 'flex items-start gap-2';
        li.innerHTML = `<i class="fas fa-check text-accent mt-1"></i><span>${feature}</span>`;
        modalFeatures.appendChild(li);
    });
    
    // Set links
    modalGithub.href = project.github;
    modalDemo.href = project.demo;
    
    projectModal.classList.remove('opacity-0', 'invisible');
    projectModal.classList.add('opacity-100', 'visible');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    projectModal.classList.add('opacity-0', 'invisible');
    projectModal.classList.remove('opacity-100', 'visible');
    document.body.style.overflow = 'auto';
}



// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    if (window.pageYOffset > 100) {
        navbar.classList.add('shadow-xl');
        navbar.classList.remove('shadow-lg');
    } else {
        navbar.classList.remove('shadow-xl');
        navbar.classList.add('shadow-lg');
    }
});

// Scroll Reveal Animation
const scrollRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize matrix rain
    createMatrixRain();
    
    // Recreate matrix rain on window resize
    window.addEventListener('resize', () => {
        const matrixRain = document.getElementById('matrix-rain');
        matrixRain.innerHTML = '';
        createMatrixRain();
    });
    
    // Mobile menu event listeners
    const hamburger = document.getElementById('hamburger');
    const closeMenu = document.getElementById('close-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    
    if (hamburger) {
        hamburger.addEventListener('click', openMobileMenu);
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Tutup mobile menu ketika diklik link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Project modal event listeners
    const projectModal = document.getElementById('project-modal');
    const closeModal = document.getElementById('close-modal');
    
    // Event listeners for project cards
    document.querySelectorAll('[data-project]').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('view-project') && !e.target.closest('a')) {
                const projectId = card.dataset.project;
                openProjectModal(projectId);
            }
        });
    });

    document.querySelectorAll('.view-project').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = e.target.closest('[data-project]').dataset.project;
            openProjectModal(projectId);
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', closeProjectModal);
    }
    
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });
    }

    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Pesan Anda telah terkirim! Saya akan segera membalasnya.');
            contactForm.reset();
        });
    }
    
    // Hero section elements
    const heroElements = document.querySelectorAll('#home h1, #home p, #home .flex.flex-col.sm\\:flex-row');
    heroElements.forEach((el, index) => {
        el.classList.add('scroll-reveal', 'fade-up');
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.2}s`;
        scrollRevealObserver.observe(el);
    });

    // About section elements
    const aboutElements = document.querySelectorAll('#about h2, #about h3, #about p, #about .grid');
    aboutElements.forEach((el, index) => {
        el.classList.add('scroll-reveal', 'fade-up');
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        scrollRevealObserver.observe(el);
    });

    // Skills section elements
    const skillsElements = document.querySelectorAll('#skills h2, #skills p, #skills .bg-secondary');
    skillsElements.forEach((el, index) => {
        el.classList.add('scroll-reveal', 'fade-up');
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        scrollRevealObserver.observe(el);
    });

    // Projects section elements
    const projectsElements = document.querySelectorAll('#projects h2, #projects p, #projects .grid > div');
    projectsElements.forEach((el, index) => {
        el.classList.add('scroll-reveal', 'fade-up');
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.2}s`;
        scrollRevealObserver.observe(el);
    });

    // Contact section elements
    const contactElements = document.querySelectorAll('#contact h2, #contact p, #contact .grid > div');
    contactElements.forEach((el, index) => {
        el.classList.add('scroll-reveal', 'fade-up');
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        scrollRevealObserver.observe(el);
    });

    // Timeline items with slide effect
    const timelineItems = document.querySelectorAll('.relative.pl-12.pb-8');
    timelineItems.forEach((item, index) => {
        item.classList.add('scroll-reveal', 'slide-left');
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = `all 0.6s ease ${index * 0.2}s`;
        scrollRevealObserver.observe(item);
    });

    // Skill bars with scale effect
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.classList.add('scroll-reveal', 'scale-up');
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        scrollRevealObserver.observe(item);
    });
});

// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .scroll-reveal.animate-in {
        opacity: 1 !important;
    }
    
    .fade-up.animate-in {
        transform: translateY(0) !important;
    }
    
    .slide-left.animate-in {
        transform: translateX(0) !important;
    }
    
    .scale-up.animate-in {
        transform: scale(1) !important;
    }
    
    /* Additional hover effects */
    .scroll-reveal:hover {
        transform: translateY(-5px);
        transition: transform 0.3s ease;
    }
    
    /* Stagger animation for grid items */
    .grid > div:nth-child(1) { transition-delay: 0s !important; }
    .grid > div:nth-child(2) { transition-delay: 0.1s !important; }
    .grid > div:nth-child(3) { transition-delay: 0.2s !important; }
    .grid > div:nth-child(4) { transition-delay: 0.3s !important; }
`;
document.head.appendChild(style);