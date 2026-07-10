document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("open-btn");
    const splashScreen = document.getElementById("splash-screen");
    const mainContent = document.getElementById("main-content");
    const floatingBg = document.querySelector(".floating-bg");

    // 1. Tạo hiệu ứng chữ hỷ và trái tim bay lơ lửng ở màn hình mở đầu
    const createFloatingItems = () => {
        // Có thể dùng các icon có sẵn trong thư mục decor
        const icons = ['decor/chu_hi.png', 'decor/trai_tim1.png', 'decor/trai_tim3.png'];
        const totalItems = 25; // Số lượng icon bay

        for (let i = 0; i < totalItems; i++) {
            const img = document.createElement("img");
            // Chọn ngẫu nhiên icon
            img.src = icons[Math.floor(Math.random() * icons.length)];
            img.classList.add("floating-item");
            
            // Random kích thước (từ 15px đến 35px)
            const size = Math.random() * 20 + 15; 
            img.style.width = `${size}px`;
            
            // Random vị trí xuất phát theo chiều ngang
            img.style.left = `${Math.random() * 100}vw`;
            
            // Random thời gian bay (từ 10s đến 25s)
            img.style.animationDuration = `${Math.random() * 15 + 10}s`; 
            
            // Random độ trễ bắt đầu (để không bay lên cùng lúc)
            img.style.animationDelay = `${Math.random() * 10}s`;
            
            floatingBg.appendChild(img);
        }
    };
    
    // Chạy hàm tạo hiệu ứng
    createFloatingItems();

    // 2. Xử lý khi nhấn nút Mở thiệp
    openBtn.addEventListener("click", () => {
        // Ẩn splash screen với hiệu ứng mờ dần (có transition trong CSS)
        splashScreen.classList.add("hidden");
        
        // Hiện nội dung chính
        mainContent.classList.remove("hidden");
        
        // Timeout đợi hiệu ứng mờ dần của splash screen kết thúc trước khi ẩn hẳn khỏi DOM
        setTimeout(() => {
            splashScreen.style.display = "none";
        }, 1000); // Khớp với transition duration trong CSS
        
        // Bật nhạc nền và hiển thị nút điều khiển
        const bgMusic = document.getElementById("bg-music");
        const musicControl = document.getElementById("music-control");
        
        if (musicControl) {
            musicControl.classList.remove("hidden");
        }
        
        if (bgMusic) {
            bgMusic.play().catch(error => {
                console.log("Trình duyệt chặn tự động phát nhạc:", error);
            });
        }
    });

    // 3. Khởi tạo hiệu ứng lướt ảnh 3D (Coverflow) cho Album
    const albumSwiper = new Swiper('.album-swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 25, // Độ nghiêng của các ảnh hai bên
            stretch: 0,
            depth: 250, // Độ xa gần (3D depth)
            modifier: 1,
            slideShadows: true, // Hiệu ứng đổ bóng lên ảnh phía sau
        },
        loop: true, // Cho phép lướt vòng tròn liên tục
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChange: function () {
                // Cập nhật số thứ tự ảnh đang xem
                const currentSlideEl = document.getElementById('current-slide');
                if (currentSlideEl) {
                    currentSlideEl.innerText = this.realIndex + 1;
                }
            }
        }
    });

    // 4. Logic cho tính năng Lightbox (Phóng to ảnh)
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".lightbox-close");
    const nextBtn = document.querySelector(".lightbox-next");
    const prevBtn = document.querySelector(".lightbox-prev");
    
    // Mảng chứa link ảnh gốc
    const images = [
        'album/a1.jpg', 'album/a2.jpg', 'album/a3.jpg', 
        'album/a4.jpg', 'album/a5.jpg', 'album/a6.jpg', 'album/a7.jpg'
    ];
    let currentLightboxIndex = 0;

    // Lắng nghe sự kiện click trên toàn bộ Swiper
    albumSwiper.on('click', function () {
        if (this.clickedSlide) {
            // Lấy index gốc (chính xác kể cả khi đang lặp ảnh loop)
            const clickedRealIndex = this.clickedSlide.getAttribute('data-swiper-slide-index');
            if (clickedRealIndex !== null) {
                currentLightboxIndex = parseInt(clickedRealIndex);
                openLightbox(currentLightboxIndex);
            }
        }
    });

    function openLightbox(index) {
        lightboxImg.src = images[index];
        lightbox.classList.remove("hidden");
    }

    closeBtn.addEventListener("click", () => {
        lightbox.classList.add("hidden");
    });

    nextBtn.addEventListener("click", () => {
        currentLightboxIndex = (currentLightboxIndex + 1) % images.length;
        lightboxImg.src = images[currentLightboxIndex];
    });

    prevBtn.addEventListener("click", () => {
        currentLightboxIndex = (currentLightboxIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentLightboxIndex];
    });

    // Đóng khi click ra ngoài ảnh
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add("hidden");
        }
    });

    // 5. Logic Đếm ngược thời gian (Countdown)
    const targetDate = new Date("August 2, 2026 18:00:00").getTime();
    const countdownEl = document.getElementById("countdown");

    if (countdownEl) {
        setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                countdownEl.innerHTML = "Đã đến giờ G!";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownEl.innerHTML = `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
        }, 1000);
    }

    // 6. Logic mở Phong Bao (Mã QR)
    const qrModal = document.getElementById("qr-modal");
    const openQrBtn = document.getElementById("open-qr-btn");
    const closeQrBtn = document.querySelector(".qr-close");

    if (openQrBtn && qrModal) {
        // Mở popup
        openQrBtn.addEventListener("click", () => {
            qrModal.classList.remove("hidden");
        });

        // Đóng bằng nút x
        if (closeQrBtn) {
            closeQrBtn.addEventListener("click", () => {
                qrModal.classList.add("hidden");
            });
        }

        // Đóng khi click ra vùng đen
        qrModal.addEventListener("click", (e) => {
            if (e.target === qrModal) {
                qrModal.classList.add("hidden");
            }
        });
    }

    // 7. Logic bật/tắt nhạc
    const bgMusic = document.getElementById("bg-music");
    const musicControl = document.getElementById("music-control");
    const musicIcon = document.querySelector(".music-icon");

    if (musicControl && bgMusic) {
        musicControl.addEventListener("click", () => {
            if (bgMusic.paused) {
                bgMusic.play();
                musicIcon.classList.remove("paused");
            } else {
                bgMusic.pause();
                musicIcon.classList.add("paused");
            }
        });
    }
});
