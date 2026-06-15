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
// ===========================
const taskTypeInput = document.getElementById('task-type');
const pageInput = document.getElementById('page-count');
const totalPriceEl = document.getElementById('total-price');
const unitPriceEl = document.getElementById('unit-price');
const qtyDisplayEl = document.getElementById('qty-display');
const unitLabelEl = document.getElementById('unit-label');
const qtyMinusBtn = document.getElementById('qty-minus');
const qtyPlusBtn = document.getElementById('qty-plus');
const waOrderBtn = document.getElementById('wa-order-btn');

// Unit label mapping
const unitLabelMap = {
    'halaman': 'Jumlah Halaman',
    'slide': 'Jumlah Slide',
    'desain': 'Jumlah Desain',
    'dokumen': 'Jumlah Dokumen',
    'surat': 'Jumlah Surat',
};

// WhatsApp message templates per layanan
const waTemplates = {
    'Makalah / Artikel': (qty, total) =>
        `Halo Tuntasin, saya ingin memesan *Jasa Pembuatan Makalah / Artikel*. Berikut detail kebutuhan saya:\n\n📜 *Jenis Tugas:* Makalah / Artikel\n📌 *Topik/Judul:* [isi di sini]\n📄 *Jumlah Halaman:* ${qty} halaman\n💰 *Estimasi Harga:* ${total}\n⏰ *Deadline:* [isi di sini]\n📝 *Catatan Tambahan:* [isi jika ada]\n\nTerima kasih!`,

    'Laporan PKL': (qty, total) =>
        `Halo Tuntasin, saya ingin memesan *Jasa Pembuatan Laporan PKL*. Berikut detail kebutuhan saya:\n\n📜 *Jenis Tugas:* Laporan PKL\n🏢 *Nama Instansi/Perusahaan:* [isi di sini]\n📄 *Jumlah Halaman:* ${qty} halaman\n💰 *Estimasi Harga:* ${total}\n⏰ *Deadline:* [isi di sini]\n📝 *Catatan Tambahan:* [isi jika ada]\n\nTerima kasih!`,

    'Proposal Penelitian': (qty, total) =>
        `Halo Tuntasin, saya ingin memesan *Jasa Pembuatan Proposal Penelitian*. Berikut detail kebutuhan saya:\n\n📜 *Jenis Tugas:* Proposal Penelitian\n📌 *Topik/Judul:* [isi di sini]\n📄 *Jumlah Halaman:* ${qty} halaman\n💰 *Estimasi Harga:* ${total}\n⏰ *Deadline:* [isi di sini]\n📝 *Catatan Tambahan:* [isi jika ada]\n\nTerima kasih!`,

    'Resume Jurnal': (qty, total) =>
        `Halo Tuntasin, saya ingin memesan *Jasa Pembuatan Resume Jurnal*. Berikut detail kebutuhan saya:\n\n📜 *Jenis Tugas:* Resume Jurnal\n📖 *Judul/Link Jurnal:* [isi di sini]\n📄 *Jumlah Halaman:* ${qty} halaman\n💰 *Estimasi Harga:* ${total}\n⏰ *Deadline:* [isi di sini]\n📝 *Catatan Tambahan:* [isi jika ada]\n\nTerima kasih!`,

    'Slide PPT': (qty, total) =>
        `Halo Tuntasin, saya ingin memesan *Jasa Pembuatan Slide PPT*. Berikut detail kebutuhan saya:\n\n📜 *Jenis Tugas:* Slide PPT\n📌 *Topik/Judul:* [isi di sini]\n📊 *Jumlah Slide:* ${qty} slide\n💰 *Estimasi Harga:* ${total}\n⏰ *Deadline:* [isi di sini]\n📝 *Catatan Tambahan:* [isi jika ada]\n\nTerima kasih!`,

    'Poster / Desain Grafis': (qty, total) =>
        `Halo Tuntasin, saya ingin memesan *Jasa Pembuatan Poster / Desain Grafis*. Berikut detail kebutuhan saya:\n\n📜 *Jenis Tugas:* Poster / Desain Grafis\n🎨 *Tema/Konten:* [isi di sini]\n📐 *Ukuran/Format:* [isi di sini]\n🔢 *Jumlah Desain:* ${qty}\n💰 *Estimasi Harga:* ${total}\n⏰ *Deadline:* [isi di sini]\n📝 *Catatan Tambahan:* [isi jika ada]\n\nTerima kasih!`,

    'Infografis': (qty, total) =>
        `Halo Tuntasin, saya ingin memesan *Jasa Pembuatan Infografis*. Berikut detail kebutuhan saya:\n\n📜 *Jenis Tugas:* Infografis\n🎨 *Tema/Konten:* [isi di sini]\n📐 *Ukuran/Format:* [isi di sini]\n🔢 *Jumlah Desain:* ${qty}\n💰 *Estimasi Harga:* ${total}\n⏰ *Deadline:* [isi di sini]\n📝 *Catatan Tambahan:* [isi jika ada]\n\nTerima kasih!`,

    'CV ATS': (qty, total) =>
        `Halo Tuntasin, saya ingin memesan *Jasa Pembuatan CV ATS*. Berikut detail kebutuhan saya:\n\n📜 *Jenis Tugas:* CV ATS\n🎓 *Posisi/Bidang Pekerjaan:* [isi di sini]\n🏫 *Pendidikan Terakhir:* [isi di sini]\n💰 *Estimasi Harga:* ${total}\n⏰ *Deadline:* [isi di sini]\n📝 *Catatan Tambahan:* [isi jika ada]\n\nTerima kasih!`,

    'Surat Lamaran Kerja': (qty, total) =>
        `Halo Tuntasin, saya ingin memesan *Jasa Pembuatan Surat Lamaran Kerja*. Berikut detail kebutuhan saya:\n\n📜 *Jenis Tugas:* Surat Lamaran Kerja\n🎓 *Posisi yang Dilamar:* [isi di sini]\n🏢 *Nama Perusahaan:* [isi di sini]\n💰 *Estimasi Harga:* ${total}\n⏰ *Deadline:* [isi di sini]\n📝 *Catatan Tambahan:* [isi jika ada]\n\nTerima kasih!`,

    'Portofolio Akademik': (qty, total) =>
        `Halo Tuntasin, saya ingin memesan *Jasa Pembuatan Portofolio Akademik*. Berikut detail kebutuhan saya:\n\n📜 *Jenis Tugas:* Portofolio Akademik\n🎓 *Bidang/Jurusan:* [isi di sini]\n💰 *Estimasi Harga:* ${total}\n⏰ *Deadline:* [isi di sini]\n📝 *Catatan Tambahan:* [isi jika ada]\n\nTerima kasih!`,
};

// State untuk layanan yang sedang dipilih
let selectedLabel = 'Makalah / Artikel';
let selectedUnit = 'halaman';

function formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

function updatePrice() {
    const basePrice = parseInt(taskTypeInput.value) || 15000;
    const qty = Math.max(1, parseInt(pageInput.value) || 1);
    const total = basePrice * qty;

    totalPriceEl.textContent = formatRupiah(total);
    unitPriceEl.textContent = formatRupiah(basePrice);
    qtyDisplayEl.textContent = '× ' + qty;

    // Update tombol WhatsApp dengan template yang sesuai
    updateWALink(qty, formatRupiah(total));
}

function updateWALink(qty, totalStr) {
    if (!waOrderBtn) return;
    const templateFn = waTemplates[selectedLabel];
    const message = templateFn
        ? templateFn(qty, totalStr)
        : `Halo Tuntasin, saya ingin memesan *${selectedLabel}*.\n\n💰 *Estimasi Harga:* ${totalStr}\n\nTerima kasih!`;
    waOrderBtn.href = 'https://wa.me/6287718547040?text=' + encodeURIComponent(message);
}

// Tombol +/-
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

pageInput.addEventListener('input', () => {
    // Pastikan tidak kurang dari 1
    if (parseInt(pageInput.value) < 1 || pageInput.value === '') {
        pageInput.value = 1;
    }
    updatePrice();
});


// ===========================
//  Custom Dropdown Selector
// ===========================
function initDropdown() {
    const trigger = document.getElementById('dropdown-trigger');
    const panel = document.getElementById('dropdown-panel');
    const arrow = document.getElementById('dropdown-arrow');
    const selIcon = document.getElementById('dropdown-selected-icon');
    const selLabel = document.getElementById('dropdown-selected-label');
    if (!trigger || !panel) return;

    function openDropdown() {
        panel.classList.remove('hidden');
        arrow.style.transform = 'rotate(180deg)';
        trigger.classList.add('border-primary');
        trigger.classList.remove('border-outline-variant');
    }

    function closeDropdown() {
        panel.classList.add('hidden');
        arrow.style.transform = 'rotate(0deg)';
        trigger.classList.remove('border-primary');
        trigger.classList.add('border-outline-variant');
    }

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        panel.classList.contains('hidden') ? openDropdown() : closeDropdown();
    });

    document.addEventListener('click', (e) => {
        const wrapper = document.getElementById('dropdown-wrapper');
        if (wrapper && !wrapper.contains(e.target)) closeDropdown();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDropdown();
    });

    document.querySelectorAll('.dropdown-option').forEach(option => {
        option.addEventListener('click', () => {
            // Update state
            taskTypeInput.value = option.dataset.value;
            selectedLabel = option.dataset.label;
            selectedUnit = option.dataset.unit || 'unit';

            // Update trigger display
            selIcon.textContent = option.dataset.icon;
            selLabel.textContent = option.dataset.label;

            // Update unit label
            unitLabelEl.textContent = unitLabelMap[selectedUnit] || 'Jumlah Unit';

            // Highlight baris terpilih
            document.querySelectorAll('.dropdown-option').forEach(o => {
                o.classList.remove('bg-primary/10', 'text-primary');
                o.querySelector('.option-check').classList.add('hidden');
            });
            option.classList.add('bg-primary/10', 'text-primary');
            option.querySelector('.option-check').classList.remove('hidden');

            // Reset qty dan hitung ulang
            pageInput.value = 1;
            updatePrice();

            closeDropdown();
        });
    });

    // Set opsi pertama sebagai aktif saat load
    const firstOption = document.querySelector('.dropdown-option');
    if (firstOption) {
        firstOption.classList.add('bg-primary/10', 'text-primary');
        firstOption.querySelector('.option-check').classList.remove('hidden');
    }
}

// Init semua kalkulator
initDropdown();
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

    function stopAuto() { clearInterval(autoTimer); }

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