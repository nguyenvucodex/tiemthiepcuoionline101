document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openBtn');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const mainContent = document.getElementById('mainContent');

    if (openBtn && welcomeScreen) {
        openBtn.addEventListener('click', () => {
            welcomeScreen.classList.add('opened');
            
            // Play music
            const bgMusic = document.getElementById('bgMusic');
            if (bgMusic) {
                bgMusic.play().catch(e => console.log("Auto-play bị chặn bởi trình duyệt:", e));
            }

            setTimeout(() => {
                welcomeScreen.style.display = 'none';
                if (mainContent) {
                    mainContent.style.display = 'block';
                }
            }, 1000);
        });
    }

    // QR Modal Logic
    const envelopeBtn = document.getElementById('envelopeBtn');
    const qrModal = document.getElementById('qr-modal');
    const closeQrModal = document.getElementById('closeQrModal');

    if (envelopeBtn && qrModal) {
        envelopeBtn.addEventListener('click', () => {
            qrModal.classList.add('show');
        });
    }

    if (closeQrModal && qrModal) {
        closeQrModal.addEventListener('click', () => {
            qrModal.classList.remove('show');
        });
    }

    // Đóng khi click ra ngoài modal content
    window.addEventListener('click', (e) => {
        if (e.target === qrModal) {
            qrModal.classList.remove('show');
        }
    });

    // SCROLL REVEAL ANIMATION
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // LIGHTBOX ALBUM LOGIC
    const albumPhotos = [
        'album/a1.jpg', 'album/a2.jpg', 'album/a3.jpg', 
        'album/a4.jpg', 'album/a5.jpg', 'album/a6.jpg', 'album/a7.jpg'
    ];
    let currentPhotoIndex = 0;

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeLightbox = document.getElementById('closeLightbox');
    const prevPhoto = document.getElementById('prevPhoto');
    const nextPhoto = document.getElementById('nextPhoto');
    const photoItems = document.querySelectorAll('.photo-item');

    function updateLightbox() {
        if (lightboxImg && lightboxCaption) {
            lightboxImg.src = albumPhotos[currentPhotoIndex];
            lightboxCaption.textContent = `${currentPhotoIndex + 1} / ${albumPhotos.length}`;
        }
    }

    if (photoItems.length > 0 && lightbox) {
        photoItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                // Nếu click vào ô "+5", bắt đầu xem từ ảnh thứ 4 (index = 3)
                if (item.classList.contains('more-photos')) {
                    currentPhotoIndex = 3;
                } else {
                    currentPhotoIndex = index;
                }
                updateLightbox();
                lightbox.classList.add('show');
            });
        });
    }

    if (closeLightbox && lightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.classList.remove('show');
        });
    }

    if (prevPhoto) {
        prevPhoto.addEventListener('click', (e) => {
            e.stopPropagation();
            currentPhotoIndex = (currentPhotoIndex - 1 + albumPhotos.length) % albumPhotos.length;
            updateLightbox();
        });
    }

    if (nextPhoto) {
        nextPhoto.addEventListener('click', (e) => {
            e.stopPropagation();
            currentPhotoIndex = (currentPhotoIndex + 1) % albumPhotos.length;
            updateLightbox();
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('show');
        }
    });

    // BẬT/TẮT NHẠC NỀN
    const musicControl = document.getElementById('musicControl');
    const bgMusic = document.getElementById('bgMusic');

    if (musicControl && bgMusic) {
        musicControl.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                musicControl.classList.remove('paused');
            } else {
                bgMusic.pause();
                musicControl.classList.add('paused');
            }
        });
    }
});
