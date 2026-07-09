/**
 * Script for Thiệp Cưới - Song Hỷ Đỏ
 * Handles Scroll Reveal Animations and RSVP Form Submission
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Scroll Reveal Animation using Intersection Observer API
    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-zoom");

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Slight offset for a better feel
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Add 'active' class to trigger CSS transition
                entry.target.classList.add("active");
                // Unobserve element after it's revealed once
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 2. QR Modal Logic
    const openEnvelopeBtn = document.getElementById("open-envelope-btn");
    const qrModal = document.getElementById("qr-modal");
    const closeModal = document.getElementById("close-modal");

    if (openEnvelopeBtn && qrModal && closeModal) {
        openEnvelopeBtn.addEventListener("click", () => {
            qrModal.classList.add("show");
        });

        closeModal.addEventListener("click", () => {
            qrModal.classList.remove("show");
        });

        // Close when clicking outside of content
        qrModal.addEventListener("click", (e) => {
            if (e.target === qrModal) {
                qrModal.classList.remove("show");
            }
        });
    }

    // 3. Optional: Smooth Scroll for Anchor Links (if any are added)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Welcome Overlay & Music Logic
    const welcomeOverlay = document.getElementById("welcome-overlay");
    const openBtn = document.getElementById("open-invitation");
    const bgMusic = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");
    let isPlaying = false;

    if (openBtn && welcomeOverlay && bgMusic) {
        openBtn.addEventListener("click", () => {
            welcomeOverlay.classList.add("hidden");
            musicToggle.classList.add("visible");
            bgMusic.play();
            isPlaying = true;
            
            // Remove overlay from DOM after transition
            setTimeout(() => {
                welcomeOverlay.style.display = 'none';
            }, 1000);
        });
    }

    if (musicToggle && bgMusic) {
        musicToggle.addEventListener("click", () => {
            if (isPlaying) {
                bgMusic.pause();
                musicToggle.classList.remove("rotating");
                // Optional: Change icon to pause or add slash
                musicToggle.innerHTML = '<i class="fa-solid fa-compact-disc" style="opacity:0.5;"></i>';
                isPlaying = false;
            } else {
                bgMusic.play();
                musicToggle.classList.add("rotating");
                musicToggle.innerHTML = '<i class="fa-solid fa-compact-disc"></i>';
                isPlaying = true;
            }
        });
    }

    // 5. Elegant Falling Gold Dust/Confetti
    const particlesContainer = document.getElementById("particles-container");
    if (particlesContainer) {
        function createParticle() {
            const particle = document.createElement("div");
            particle.classList.add("gold-particle");
            
            // Random horizontal starting position
            particle.style.left = Math.random() * 100 + "vw";
            
            // Random duration (slower looks more natural)
            const duration = Math.random() * 5 + 7; // 7s to 12s fall
            particle.style.animationDuration = duration + "s"; 
            
            // Random opacity
            particle.style.opacity = Math.random() * 0.5 + 0.3;
            
            // Random sizes
            const size = Math.random() * 8 + 3; // 3px to 11px
            particle.style.width = size + "px";
            particle.style.height = size + "px";
            
            // Random horizontal drift
            particle.style.setProperty('--drift', (Math.random() * 150 - 75) + 'px');
            
            particlesContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
        }
        
        setInterval(createParticle, 300);
        
        // Initial burst at different top positions so they don't all start at the top
        for(let i=0; i<30; i++) {
            setTimeout(createParticle, Math.random() * 3000);
        }
    }

    // 6. 3D Coverflow Carousel Logic
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carouselPagination = document.querySelector('.carousel-pagination');
    let currentSlide = 0;

    if (carouselItems.length > 0) {
        // Create dots
        carouselItems.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => updateCarousel(index));
            carouselPagination.appendChild(dot);
        });
        const dots = document.querySelectorAll('.dot');

        function updateCarousel(index) {
            currentSlide = index;
            
            if (currentSlide < 0) currentSlide = carouselItems.length - 1;
            if (currentSlide >= carouselItems.length) currentSlide = 0;

            // Reset classes
            carouselItems.forEach(item => item.className = 'carousel-item');
            dots.forEach(dot => dot.classList.remove('active'));

            // Set Active
            carouselItems[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');

            // Set Prev & Next
            const prev1 = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
            const next1 = (currentSlide + 1) % carouselItems.length;
            carouselItems[prev1].classList.add('prev-1');
            carouselItems[next1].classList.add('next-1');

            if (carouselItems.length >= 5) {
                const prev2 = (currentSlide - 2 + carouselItems.length) % carouselItems.length;
                const next2 = (currentSlide + 2) % carouselItems.length;
                carouselItems[prev2].classList.add('prev-2');
                carouselItems[next2].classList.add('next-2');
            }
        }

        prevBtn.addEventListener('click', () => updateCarousel(currentSlide - 1));
        nextBtn.addEventListener('click', () => updateCarousel(currentSlide + 1));

        // Initial Call
        updateCarousel(0);
        
        // Auto play (optional, disabled for better UX unless requested)
        // setInterval(() => updateCarousel(currentSlide + 1), 3500);
    }


    // 7. Lightbox Image Gallery
    const lightboxModal = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeLightbox = document.getElementById("close-lightbox");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");
    
    if (lightboxModal && lightboxImg && closeLightbox) {
        const galleryImages = document.querySelectorAll('.carousel-item img');
        let currentLightboxIndex = 0;

        function updateLightboxImage(index) {
            if (index < 0) currentLightboxIndex = galleryImages.length - 1;
            else if (index >= galleryImages.length) currentLightboxIndex = 0;
            else currentLightboxIndex = index;
            
            lightboxImg.src = galleryImages[currentLightboxIndex].src;
        }

        galleryImages.forEach((img, index) => {
            img.style.cursor = "zoom-in";
            img.addEventListener('click', () => {
                currentLightboxIndex = index;
                updateLightboxImage(currentLightboxIndex);
                lightboxModal.classList.add("show");
            });
        });
        
        if (lightboxPrev) {
            lightboxPrev.addEventListener("click", (e) => {
                e.stopPropagation(); // Ngăn sự kiện click truyền ra ngoài
                updateLightboxImage(currentLightboxIndex - 1);
            });
        }
        
        if (lightboxNext) {
            lightboxNext.addEventListener("click", (e) => {
                e.stopPropagation();
                updateLightboxImage(currentLightboxIndex + 1);
            });
        }
        
        closeLightbox.addEventListener("click", () => {
            lightboxModal.classList.remove("show");
        });
        
        // Close when clicking outside the image
        lightboxModal.addEventListener("click", (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.remove("show");
            }
        });
    }

    // 8. Scroll to Top Button
    const scrollToTopBtn = document.getElementById("scroll-to-top");
    if (scrollToTopBtn) {
        window.addEventListener("scroll", () => {
            // Show after scrolling past 80% of viewport height (hero section)
            if (window.scrollY > window.innerHeight * 0.8) {
                scrollToTopBtn.classList.add("visible");
            } else {
                scrollToTopBtn.classList.remove("visible");
            }
        });

        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
