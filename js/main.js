// ===========================
//  Tuntasin - Main JavaScript
// ===========================

// Hamburger Menu
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const hamburgerIcon = document.getElementById('hamburger-icon');

hamburgerBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    if (isOpen) {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.textContent = 'menu';
    } else {
        mobileMenu.classList.remove('hidden');
        hamburgerIcon.textContent = 'close';
    }
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.textContent = 'menu';
    });
});

document.addEventListener('click', (e) => {
    if (!hamburgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.textContent = 'menu';
    }
});


// Price Calculator Logic
const taskTypeSelect = document.getElementById('task-type');
const eduBtns = document.querySelectorAll('.edu-btn');
const pageInput = document.getElementById('page-count');
const totalPriceEl = document.getElementById('total-price');
let currentMultiplier = 1.0;

function updatePrice() {
    const basePrice = parseInt(taskTypeSelect.value);
    const pages = Math.max(1, parseInt(pageInput.value) || 1);
    const total = basePrice * currentMultiplier * pages;
    totalPriceEl.textContent = 'Rp ' + total.toLocaleString('id-ID');
}

eduBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        eduBtns.forEach(b => {
            b.classList.remove('bg-primary', 'text-white', 'active');
            b.classList.add('hover:bg-surface-container');
        });
        btn.classList.add('bg-primary', 'text-white', 'active');
        btn.classList.remove('hover:bg-surface-container');
        currentMultiplier = parseFloat(btn.dataset.multiplier);
        updatePrice();
    });
});

taskTypeSelect.addEventListener('change', updatePrice);
pageInput.addEventListener('input', updatePrice);

// Stats Animation
const observerOptions = { threshold: 0.1 };
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const targets = entry.target.querySelectorAll('[data-target]');
            targets.forEach(target => {
                const goal = parseInt(target.dataset.target);
                let current = 0;
                const increment = goal / 40;
                const counter = setInterval(() => {
                    current += increment;
                    if (current >= goal) {
                        target.textContent = goal + (
                            target.textContent.includes('%') ? '%' :
                                target.textContent.includes('h') ? 'h' :
                                    target.textContent.includes('x') ? 'x' : '+'
                        );
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(current) + '+';
                    }
                }, 30);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsGrid = document.querySelector('.md\\:grid-cols-4');
if (statsGrid) statsObserver.observe(statsGrid);

// Scroll Reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('reveal-visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.animate-reveal').forEach(el => revealObserver.observe(el));

// FAQ Toggle
document.querySelectorAll('.faq-toggle').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const icon = button.querySelector('span:last-child');
        const isOpen = content.style.height && content.style.height !== '0px';

        document.querySelectorAll('.faq-content').forEach(c => c.style.height = '0px');
        document.querySelectorAll('.faq-toggle span:last-child').forEach(i => i.style.transform = 'rotate(0deg)');

        if (!isOpen) {
            content.style.height = content.scrollHeight + 'px';
            icon.style.transform = 'rotate(180deg)';
        }
    });
});

// Sticky Nav & Scroll Top
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('shadow-lg');
        scrollTopBtn.classList.remove('opacity-0', 'translate-y-10');
    } else {
        navbar.classList.remove('shadow-lg');
        scrollTopBtn.classList.add('opacity-0', 'translate-y-10');
    }
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===========================
//  Auto-play Testimonial Slider
//  - Putar otomatis setiap 4 detik
//  - Pause saat hover
//  - Dot indicator sinkron
//  - CSS transition untuk smooth loop
// ===========================
(function () {
    const track = document.querySelector('.testimonial-track');
    const dotsWrapper = document.getElementById('testimonial-dots');
    if (!track) return;

    const cards = Array.from(track.children);
    const total = cards.length;
    const isMobile = () => window.innerWidth <= 768;
    const visible = () => isMobile() ? 1 : 3;
    let currentIndex = 0;
    let autoTimer = null;

    // --- Buat dot indicators ---
    function buildDots() {
        if (!dotsWrapper) return;
        dotsWrapper.innerHTML = '';
        const steps = total - visible() + 1;
        for (let i = 0; i < steps; i++) {
            const dot = document.createElement('button');
            dot.className = 'w-2.5 h-2.5 rounded-full transition-all duration-300 ' +
                (i === 0 ? 'bg-primary scale-125' : 'bg-outline-variant');
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            dotsWrapper.appendChild(dot);
        }
    }

    function updateDots() {
        if (!dotsWrapper) return;
        Array.from(dotsWrapper.children).forEach((dot, i) => {
            dot.className = 'w-2.5 h-2.5 rounded-full transition-all duration-300 ' +
                (i === currentIndex ? 'bg-primary scale-125' : 'bg-outline-variant');
        });
    }

    function goTo(idx) {
        const steps = total - visible() + 1;
        currentIndex = (idx + steps) % steps;
        const move = currentIndex * (100 / visible());
        track.style.transform = `translateX(-${move}%)`;
        updateDots();
    }

    function next() {
        const steps = total - visible() + 1;
        goTo((currentIndex + 1) % steps);
    }

    function startAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(next, 4000);
    }

    function stopAuto() {
        clearInterval(autoTimer);
    }

    // Pause on hover
    track.parentElement.addEventListener('mouseenter', stopAuto);
    track.parentElement.addEventListener('mouseleave', startAuto);

    // Touch swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].clientX;
        stopAuto();
    }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) diff > 0 ? next() : goTo(currentIndex - 1);
        startAuto();
    }, { passive: true });

    // Rebuild on resize
    window.addEventListener('resize', () => {
        buildDots();
        goTo(0);
    });

    // Init
    buildDots();
    goTo(0);
    startAuto();
})();

// Copy Link Function
function copyLink() {
    const url = window.location.href.split('#')[0];
    navigator.clipboard.writeText(url).then(() => {
        const icon = document.getElementById('copy-icon');
        const tooltip = document.getElementById('copy-tooltip');
        icon.textContent = 'check_circle';
        tooltip.textContent = 'Link tersalin!';
        setTimeout(() => {
            icon.textContent = 'share';
            tooltip.textContent = 'Salin Link';
        }, 2000);
    }).catch(() => {
        const el = document.createElement('textarea');
        el.value = window.location.href.split('#')[0];
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        const tooltip = document.getElementById('copy-tooltip');
        tooltip.textContent = 'Link tersalin!';
        setTimeout(() => { tooltip.textContent = 'Salin Link'; }, 2000);
    });
}