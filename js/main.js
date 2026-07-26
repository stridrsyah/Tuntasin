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

// ===========================
//  Modal Detail Layanan
// ===========================
const serviceDetails = {
    'makalah': {
        icon: 'description',
        title: 'Makalah / Artikel',
        price: 'Mulai Rp 67rb',
        desc: 'Penyusunan makalah sistematis dengan standar akademik tinggi, bebas plagiarisme, siap kumpul.',
        requirements: ['Topik atau judul makalah (boleh masih kasar/belum fix)', 'Jumlah halaman & format penulisan yang diminta (misal APA/MLA)', 'Referensi wajib jika ada (jurnal, buku, dsb)', 'Deadline pengumpulan'],
        deliverables: ['File makalah lengkap (Word & PDF)', 'Struktur akademik rapi: cover, BAB, daftar pustaka', 'Bebas plagiarisme dengan cek similarity', 'Gratis 1x revisi minor'],
        wa: 'https://wa.me/628211474025?text=Halo%20Tuntasin%2C%20saya%20ingin%20memesan%20%2AJasa%20Pembuatan%20Makalah%2A.%20Berikut%20detail%20kebutuhan%20saya%3A%0A%0A%F0%9F%93%9C%20%2AJenis%20Tugas%3A%2A%20Makalah%20/%20Artikel%0A%0ATerima%20kasih%21'
    },
    'laporan-pkl': {
        icon: 'business_center',
        title: 'Laporan PKL',
        price: 'Mulai Rp 97rb',
        desc: 'Dokumentasi praktik kerja profesional, terstruktur rapi, dan bergaransi revisi.',
        requirements: ['Nama instansi/perusahaan tempat PKL', 'Data & catatan kegiatan selama praktik kerja', 'Jumlah halaman yang diminta kampus/sekolah', 'Format laporan dari institusi (jika ada template)', 'Deadline pengumpulan'],
        deliverables: ['File laporan PKL lengkap (Word & PDF)', 'Analisis data & pembahasan kegiatan kerja', 'Layout profesional sesuai standar institusi', 'Gratis revisi jika ada bagian yang tidak sesuai'],
        wa: 'https://wa.me/628211474025?text=Halo%20Tuntasin%2C%20saya%20ingin%20memesan%20%2AJasa%20Pembuatan%20Laporan%20PKL%2A.%20Berikut%20detail%20kebutuhan%20saya%3A%0A%0A%F0%9F%93%9C%20%2AJenis%20Tugas%3A%2A%20Laporan%20PKL%0A%0ATerima%20kasih%21'
    },
    'proposal': {
        icon: 'article',
        title: 'Proposal Penelitian',
        price: 'Mulai Rp 97rb',
        desc: 'Penyusunan proposal penelitian yang persuasif, logis, dan sesuai kaidah ilmiah.',
        requirements: ['Topik atau judul penelitian', 'Jumlah halaman yang diminta', 'Metodologi penelitian yang diinginkan (jika sudah punya arah)', 'Referensi wajib jika ada', 'Deadline pengumpulan'],
        deliverables: ['File proposal lengkap (Word & PDF)', 'Desain metodologi penelitian yang logis', 'Tinjauan pustaka relevan dan terkini', 'Gratis 1x revisi minor'],
        wa: 'https://wa.me/628211474025?text=Halo%20Tuntasin%2C%20saya%20ingin%20memesan%20%2AJasa%20Pembuatan%20Proposal%20Penelitian%2A.%20Berikut%20detail%20kebutuhan%20saya%3A%0A%0A%F0%9F%93%9C%20%2AJenis%20Tugas%3A%2A%20Proposal%20Penelitian%0A%0ATerima%20kasih%21'
    },
    'resume-jurnal': {
        icon: 'book',
        title: 'Resume Jurnal',
        price: 'Mulai Rp 47rb',
        desc: 'Ringkasan poin-poin penting dari jurnal ilmiah nasional maupun internasional.',
        requirements: ['Judul atau link jurnal yang akan diringkas', 'Jumlah halaman ringkasan yang diinginkan', 'Format resume (jika ada ketentuan khusus)', 'Deadline pengumpulan'],
        deliverables: ['File resume jurnal (Word & PDF)', 'Analisis kritis terhadap isi jurnal', 'Ringkasan padat & mudah dipahami', 'Gratis 1x revisi minor'],
        wa: 'https://wa.me/628211474025?text=Halo%20Tuntasin%2C%20saya%20ingin%20memesan%20%2AJasa%20Pembuatan%20Resume%20Jurnal%2A.%20Berikut%20detail%20kebutuhan%20saya%3A%0A%0A%F0%9F%93%9C%20%2AJenis%20Tugas%3A%2A%20Resume%20Jurnal%0A%0ATerima%20kasih%21'
    },
    'ppt': {
        icon: 'slideshow',
        title: 'Slide PPT / Presentasi',
        price: 'Mulai Rp 47rb',
        desc: 'Visualisasi ide yang memukau dan mudah dipahami untuk presentasi akademik.',
        requirements: ['Topik atau judul presentasi', 'Jumlah slide yang diinginkan', 'Isi materi/poin penting yang wajib ada', 'Referensi desain/tema (jika ada preferensi)', 'Deadline pengumpulan'],
        deliverables: ['File PPT siap presentasi (PPTX & PDF)', 'Desain modern & profesional', 'Catatan presenter di setiap slide', 'Gratis 1x revisi minor'],
        wa: 'https://wa.me/628211474025?text=Halo%20Tuntasin%2C%20saya%20ingin%20memesan%20%2AJasa%20Pembuatan%20Slide%20PPT%20/%20Presentasi%2A.%20Berikut%20detail%20kebutuhan%20saya%3A%0A%0A%F0%9F%93%9C%20%2AJenis%20Tugas%3A%2A%20Slide%20PPT%20/%20Presentasi%0A%0ATerima%20kasih%21'
    },
    'poster': {
        icon: 'palette',
        title: 'Poster / Desain Grafis',
        price: 'Mulai Rp 37rb',
        desc: 'Desain poster kreatif dan menarik untuk keperluan lomba atau publikasi ilmiah.',
        requirements: ['Tema atau konten yang ingin ditampilkan', 'Ukuran & format file yang dibutuhkan (A3, A4, digital, dll)', 'Logo/instansi terkait (jika perlu ditampilkan)', 'Referensi gaya desain (jika ada)', 'Deadline pengumpulan'],
        deliverables: ['File poster resolusi tinggi (JPG/PNG/PDF)', 'Desain siap cetak maupun digital', 'Layout menarik & sesuai tema', 'Gratis 1x revisi minor'],
        wa: 'https://wa.me/628211474025?text=Halo%20Tuntasin%2C%20saya%20ingin%20memesan%20%2AJasa%20Pembuatan%20Poster%20/%20Desain%20Grafis%2A.%20Berikut%20detail%20kebutuhan%20saya%3A%0A%0A%F0%9F%93%9C%20%2AJenis%20Tugas%3A%2A%20Poster%20/%20Desain%20Grafis%0A%0ATerima%20kasih%21'
    },
    'infografis': {
        icon: 'bar_chart',
        title: 'Infografis',
        price: 'Mulai Rp 67rb',
        desc: 'Menyederhanakan data atau ide kompleks jadi visual yang ringkas dan mudah dicerna.',
        requirements: ['Topik atau data yang ingin divisualkan', 'Ukuran & format file yang dibutuhkan', 'Data mentah/statistik (jika ada)', 'Referensi gaya desain (jika ada)', 'Deadline pengumpulan'],
        deliverables: ['File infografis resolusi tinggi (JPG/PNG/PDF)', 'Data tersaji terstruktur & mudah dipahami', 'Desain menarik dan informatif', 'Gratis 1x revisi minor'],
        wa: 'https://wa.me/628211474025?text=Halo%20Tuntasin%2C%20saya%20ingin%20memesan%20%2AJasa%20Pembuatan%20Infografis%2A.%20Berikut%20detail%20kebutuhan%20saya%3A%0A%0A%F0%9F%93%9C%20%2AJenis%20Tugas%3A%2A%20Infografis%0A%0ATerima%20kasih%21'
    },
    'cv-ats': {
        icon: 'badge',
        title: 'CV ATS',
        price: 'Mulai Rp 37rb',
        desc: 'CV yang dioptimalkan agar lolos sistem seleksi otomatis (ATS) perusahaan.',
        requirements: ['Posisi/bidang pekerjaan yang dituju', 'Riwayat pendidikan terakhir', 'Pengalaman kerja/organisasi (jika ada)', 'Skill & sertifikasi relevan', 'Deadline pengumpulan'],
        deliverables: ['File CV format ATS-friendly (Word & PDF)', 'Kata kunci dioptimalkan sesuai bidang', 'Struktur rapi & mudah dibaca sistem/HRD', 'Gratis 1x revisi minor'],
        wa: 'https://wa.me/628211474025?text=Halo%20Tuntasin%2C%20saya%20ingin%20memesan%20%2AJasa%20Pembuatan%20CV%20ATS%2A.%20Berikut%20detail%20kebutuhan%20saya%3A%0A%0A%F0%9F%93%9C%20%2AJenis%20Tugas%3A%2A%20CV%20ATS%0A%0ATerima%20kasih%21'
    },
    'surat-lamaran': {
        icon: 'mail',
        title: 'Surat Lamaran Kerja',
        price: 'Mulai Rp 37rb',
        desc: 'Penulisan cover letter persuasif yang menonjolkan value diri di mata HR.',
        requirements: ['Posisi yang dilamar', 'Nama perusahaan tujuan', 'CV atau ringkasan pengalaman (agar isi surat relevan)', 'Deadline pengumpulan'],
        deliverables: ['File surat lamaran (Word & PDF)', 'Gaya bahasa persuasif dan profesional', 'Disesuaikan dengan posisi & perusahaan tujuan', 'Gratis 1x revisi minor'],
        wa: 'https://wa.me/628211474025?text=Halo%20Tuntasin%2C%20saya%20ingin%20memesan%20%2AJasa%20Pembuatan%20Surat%20Lamaran%20Kerja%2A.%20Berikut%20detail%20kebutuhan%20saya%3A%0A%0A%F0%9F%93%9C%20%2AJenis%20Tugas%3A%2A%20Surat%20Lamaran%20Kerja%0A%0ATerima%20kasih%21'
    },
    'portofolio-akademik': {
        icon: 'folder_special',
        title: 'Portofolio Akademik',
        price: 'Mulai Rp 97rb',
        desc: 'Kumpulan karya dan pencapaian akademik disusun rapi dan siap dipresentasikan.',
        requirements: ['Cakupan isi portofolio (karya/prestasi apa saja)', 'Jumlah halaman yang diinginkan', 'File karya/dokumen pendukung yang ingin ditampilkan', 'Deadline pengumpulan'],
        deliverables: ['File portofolio lengkap (Word/PDF)', 'Desain profesional & rapi', 'Siap dipresentasikan ke dosen/perusahaan', 'Gratis 1x revisi minor'],
        wa: 'https://wa.me/628211474025?text=Halo%20Tuntasin%2C%20saya%20ingin%20memesan%20%2AJasa%20Pembuatan%20Portofolio%20Akademik%2A.%20Berikut%20detail%20kebutuhan%20saya%3A%0A%0A%F0%9F%93%9C%20%2AJenis%20Tugas%3A%2A%20Portofolio%20Akademik%0A%0ATerima%20kasih%21'
    },
    'website-portofolio': {
        icon: 'badge',
        title: 'Website Portofolio',
        price: 'Mulai Rp 157rb',
        desc: 'Website portofolio online untuk menampilkan karya, CV, dan profil profesional kamu secara digital.',
        requirements: ['Isi/konten yang ingin ditampilkan (karya, CV, profil, dll)', 'Jumlah halaman website yang diinginkan', 'Preferensi warna/tema (jika ada)', 'Foto/logo pendukung (jika ada)', 'Deadline pengumpulan'],
        deliverables: ['Website portofolio online dan bisa diakses siapa saja', 'Desain personal branding yang menarik', 'Tampilan responsif di HP & laptop', 'Panduan singkat cara mengelola/update konten'],
        wa: 'https://wa.me/628211474025?text=Halo%20Tuntasin%2C%20saya%20ingin%20memesan%20%2AJasa%20Pembuatan%20Website%20Portofolio%2A.%20Berikut%20detail%20kebutuhan%20saya%3A%0A%0A%F0%9F%93%9C%20%2AJenis%20Tugas%3A%2A%20Website%20Portofolio%0A%0ATerima%20kasih%21'
    }
};

function buildDetailListItem(text) {
    const li = document.createElement('li');
    li.className = 'flex items-start gap-2 text-sm text-on-surface-variant';
    li.innerHTML = '<span class="material-symbols-outlined text-primary text-base mt-0.5 flex-shrink-0">check_circle</span><span>' + text + '</span>';
    return li;
}

function openServiceDetail(slug) {
    const data = serviceDetails[slug];
    if (!data) return;

    document.getElementById('service-detail-icon').textContent = data.icon;
    document.getElementById('service-detail-title').textContent = data.title;
    document.getElementById('service-detail-price').textContent = data.price;
    document.getElementById('service-detail-desc').textContent = data.desc;
    document.getElementById('service-detail-wa-link').href = data.wa;

    const reqList = document.getElementById('service-detail-requirements');
    reqList.innerHTML = '';
    data.requirements.forEach(item => reqList.appendChild(buildDetailListItem(item)));

    const delList = document.getElementById('service-detail-deliverables');
    delList.innerHTML = '';
    data.deliverables.forEach(item => delList.appendChild(buildDetailListItem(item)));

    const modal = document.getElementById('service-detail-modal');
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

function closeServiceDetail() {
    document.getElementById('service-detail-modal').classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}

document.getElementById('service-detail-backdrop').addEventListener('click', closeServiceDetail);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeServiceDetail();
});

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