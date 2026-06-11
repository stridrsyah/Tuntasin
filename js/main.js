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


// ===========================
//  Price Calculator Logic
//  - No education level multiplier
//  - +/- quantity buttons
//  - Dynamic unit label
//  - Price breakdown display
// ===========================
const taskTypeSelect = document.getElementById('task-type');
const pageInput = document.getElementById('page-count');
const totalPriceEl = document.getElementById('total-price');
const unitPriceEl = document.getElementById('unit-price');
const qtyDisplayEl = document.getElementById('qty-display');
const unitLabelEl = document.getElementById('unit-label');
const qtyMinusBtn = document.getElementById('qty-minus');
const qtyPlusBtn = document.getElementById('qty-plus');

// Unit label mapping based on option groups / values
const unitLabels = {
    '2000': 'Jumlah Halaman',
    '2500': 'Jumlah Halaman',
    '1500': 'Jumlah Halaman',
    '2000': 'Jumlah Slide',
    '5000': 'Jumlah Desain',
    '10000': 'Jumlah Dokumen',
    '10000': 'Jumlah Surat',
    '50000': 'Jumlah Dokumen',
};

function formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

function updatePrice() {
    const basePrice = parseInt(taskTypeSelect.value);
    const qty = Math.max(1, parseInt(pageInput.value) || 1);
    const total = basePrice * qty;

    totalPriceEl.textContent = formatRupiah(total);
    unitPriceEl.textContent = formatRupiah(basePrice);
    qtyDisplayEl.textContent = '× ' + qty;

    // Update unit label
    if (unitLabels[String(basePrice)]) {
        unitLabelEl.textContent = unitLabels[String(basePrice)];
    } else {
        unitLabelEl.textContent = 'Jumlah Unit';
    }
}

// +/- buttons
qtyMinusBtn.addEventListener('click', () => {
    const current = parseInt(pageInput.value) || 1;
    if (current > 1) {
        pageInput.value = current - 1;
        updatePrice();
    }
});

qtyPlusBtn.addEventListener('click', () => {
    const current = parseInt(pageInput.value) || 1;
    pageInput.value = current + 1;
    updatePrice();
});

taskTypeSelect.addEventListener('change', () => {
    pageInput.value = 1;
    updatePrice();
});

pageInput.addEventListener('input', updatePrice);

// Init
updatePrice();


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
        // Kalkulasi offset memperhitungkan gap (24px = gap-xl)
        const cardGap = 24;
        const cardWidth = isMobile()
            ? track.parentElement.offsetWidth
            : (track.parentElement.offsetWidth - cardGap * 2) / 3;
        const offset = currentIndex * (cardWidth + cardGap);
        track.style.transform = `translateX(-${offset}px)`;
        updateDots();
    }

    function next() {
        const steps = total - visible() + 1;
        goTo((currentIndex + 1) % steps);
    }

    function startAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(next, 2800);
    }

    function stopAuto() {
        clearInterval(autoTimer);
    }

    track.parentElement.addEventListener('mouseenter', stopAuto);
    track.parentElement.addEventListener('mouseleave', startAuto);

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

    window.addEventListener('resize', () => {
        buildDots();
        currentIndex = 0;
        goTo(0);
    });

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