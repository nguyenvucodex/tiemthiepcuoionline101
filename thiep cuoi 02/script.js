document.addEventListener('DOMContentLoaded', () => {
    // Hiệu ứng lá rơi
    const leavesContainer = document.getElementById('fallingLeaves');
    const numberOfLeaves = 18; // Số lượng lá

    for (let i = 0; i < numberOfLeaves; i++) {
        createLeaf();
    }

    function createLeaf() {
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');
        
        // Random thuộc tính cho lá để tự nhiên hơn
        const size = Math.random() * 12 + 8; // Kích thước từ 8px đến 20px
        const left = Math.random() * 100; // Vị trí xuất hiện từ 0% đến 100vw
        const duration = Math.random() * 10 + 12; // Thời gian rơi 12s đến 22s
        const delay = Math.random() * 15; // Độ trễ ngẫu nhiên
        
        // Áp dụng thuộc tính
        leaf.style.width = `${size}px`;
        leaf.style.height = `${size}px`;
        leaf.style.left = `${left}vw`;
        leaf.style.animationDuration = `${duration}s`;
        leaf.style.animationDelay = `${delay}s`;
        
        leavesContainer.appendChild(leaf);
        
        // Tạo lại lá sau khi rơi xong để lặp lại hiệu ứng
        leaf.addEventListener('animationend', () => {
            leaf.remove();
            createLeaf();
        });
    }

    // Xử lý sự kiện nút "Mở thiệp"
    const openBtn = document.getElementById('openBtn');
    const welcomeScreen = document.getElementById('welcomeScreen');

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            // Thêm class để chạy hiệu ứng mở thiệp
            welcomeScreen.classList.add('opening');
            
            // Xử lý sau khi hiệu ứng kết thúc
            setTimeout(() => {
                // Ẩn hẳn màn hình chào
                welcomeScreen.style.display = 'none';
                
                // Hiển thị nội dung chính
                const mainContent = document.getElementById('mainContent');
                if(mainContent) {
                    mainContent.style.display = 'block';
                }
                
                // Bật lại thanh cuộn
                document.body.style.overflow = 'auto';
                document.body.style.overflowX = 'hidden'; // Ngăn cuộn ngang
                
                // Phát nhạc và hiển thị nút bật/tắt
                const bgMusic = document.getElementById('bgMusic');
                const musicToggle = document.getElementById('musicToggle');
                if (bgMusic && musicToggle) {
                    bgMusic.play().catch(e => console.log("Browser autoplay prevented:", e));
                    musicToggle.classList.add('show');
                }
                
                // Cuộn lên trên cùng
                window.scrollTo(0, 0);
            }, 1200); // Khớp với thời gian animation trong CSS
        });
    }

    // Xử lý Popup Hộp quà
    const giftPopup = document.getElementById('giftPopup');
    const openGiftPopupBtn = document.getElementById('openGiftPopup');
    const closeGiftPopupBtn = document.getElementById('closeGiftPopup');

    if (openGiftPopupBtn && giftPopup && closeGiftPopupBtn) {
        openGiftPopupBtn.addEventListener('click', () => {
            giftPopup.classList.add('active');
        });

        closeGiftPopupBtn.addEventListener('click', () => {
            giftPopup.classList.remove('active');
        });

        // Đóng popup khi click ra ngoài nội dung
        giftPopup.addEventListener('click', (e) => {
            if (e.target === giftPopup) {
                giftPopup.classList.remove('active');
            }
        });
    }

    // Xử lý Gợi ý lời chúc bằng AI
    const aiGenBtn = document.querySelector('.ai-gen-btn');
    const textarea = document.querySelector('.guestbook-form textarea');
    const nameInput = document.querySelector('.guestbook-form input');

    if (aiGenBtn && textarea) {
        const wishes = [
            "Chúc hai bạn trăm năm hạnh phúc, rể hiền dâu thảo, sớm sinh quý tử nhé!",
            "Chúc mừng hạnh phúc hai bạn. Chúc hai bạn mãi mãi yêu thương nhau như những ngày đầu.",
            "Một cuộc sống mới đang chờ đón hai bạn. Chúc hai bạn luôn ngập tràn tiếng cười và hạnh phúc.",
            "Gửi ngàn lời chúc tốt đẹp nhất đến hai vợ chồng. Chúc hai bạn răng long đầu bạc."
        ];

        aiGenBtn.addEventListener('click', () => {
            const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
            const name = nameInput.value ? nameInput.value : "Mình";
            textarea.value = `Gửi Phong & Miên,\n${randomWish} \nThân mến, ${name}.`;
            
            // Hiệu ứng nháy màu nhẹ
            textarea.style.transition = 'background-color 0.3s';
            textarea.style.backgroundColor = '#e6f0dc';
            setTimeout(() => {
                textarea.style.backgroundColor = '#fdfbf7';
            }, 600);
        });
    }

    // Xử lý form submit
    const guestbookForm = document.getElementById('guestbookForm');
    if (guestbookForm) {
        guestbookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Cảm ơn bạn đã gửi lời chúc tốt đẹp đến cô dâu và chú rể!');
            guestbookForm.reset();
        });
    }

    // Xử lý bật/tắt nhạc
    const bgMusic = document.getElementById('bgMusic');
    const musicToggleBtn = document.getElementById('musicToggle');
    
    if (bgMusic && musicToggleBtn) {
        musicToggleBtn.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                musicToggleBtn.classList.remove('paused');
            } else {
                bgMusic.pause();
                musicToggleBtn.classList.add('paused');
            }
        });
    }
    // Khởi tạo Swiper 3D Carousel
    const albumSwiper = new Swiper('.album-swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 35,
            stretch: 0,
            depth: 250,
            modifier: 1,
            slideShadows: true,
        },
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        }
    });

    // Xử lý Fullscreen Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxThumbnails = document.getElementById('lightboxThumbnails');
    
    // Danh sách ảnh
    const albumImages = [
        "album/a1.jpg", "album/a2.jpg", "album/a3.jpg", 
        "album/a4.jpg", "album/a5.jpg", "album/a6.jpg", "album/a7.jpg"
    ];
    let currentLightboxIndex = 0;

    // Khởi tạo thumbnails
    if (lightboxThumbnails) {
        albumImages.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.addEventListener('click', () => updateLightbox(index));
            lightboxThumbnails.appendChild(img);
        });
    }

    function updateLightbox(index) {
        currentLightboxIndex = index;
        
        // Fade effect
        lightboxImg.style.opacity = 0;
        setTimeout(() => {
            lightboxImg.src = albumImages[currentLightboxIndex];
            lightboxImg.style.opacity = 1;
        }, 200);

        lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${albumImages.length}`;
        
        // Update active thumbnail
        const thumbs = lightboxThumbnails.querySelectorAll('img');
        thumbs.forEach(t => t.classList.remove('active'));
        if(thumbs[currentLightboxIndex]) {
            thumbs[currentLightboxIndex].classList.add('active');
            thumbs[currentLightboxIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }

    // Click vào Swiper Slide để mở Lightbox
    if (document.querySelector('.album-swiper')) {
        albumSwiper.on('click', function (swiper) {
            if (swiper.clickedSlide) {
                // Lấy index thực sự của ảnh khi bật tính năng loop
                const realIndex = swiper.clickedSlide.getAttribute('data-swiper-slide-index');
                if (realIndex !== null) {
                    updateLightbox(parseInt(realIndex));
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Ngăn cuộn nền
                }
            }
        });
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto'; // Bật lại cuộn nền
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            let newIndex = currentLightboxIndex - 1;
            if (newIndex < 0) newIndex = albumImages.length - 1;
            updateLightbox(newIndex);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            let newIndex = currentLightboxIndex + 1;
            if (newIndex >= albumImages.length) newIndex = 0;
            updateLightbox(newIndex);
        });
    }

    // Hiệu ứng cuộn trang (Scroll Reveal)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Chỉ chạy 1 lần
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
});
