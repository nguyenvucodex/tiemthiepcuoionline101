document.addEventListener('DOMContentLoaded', () => {
    
    // ---- 1. NAVBAR SCROLL EFFECT & MOBILE MENU ----
    const navbar = document.getElementById('navbar');
    const viewGallery = document.getElementById('view-gallery');
    
    viewGallery.addEventListener('scroll', () => {
        if (viewGallery.scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const headerNavWrapper = document.getElementById('header-nav-wrapper');
    if (mobileMenuBtn && headerNavWrapper) {
        mobileMenuBtn.addEventListener('click', () => {
            headerNavWrapper.classList.toggle('menu-open');
            const icon = mobileMenuBtn.querySelector('i');
            if (headerNavWrapper.classList.contains('menu-open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking a link
        const navLinks = headerNavWrapper.querySelectorAll('a, button');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                headerNavWrapper.classList.remove('menu-open');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // ---- 2. SCROLL REVEAL ANIMATION ----
    const revealElements = document.querySelectorAll('.reveal-slide-up, .reveal-slide-left, .reveal-fade');
    const observerOptions = {
        root: viewGallery, // Observe scrolling within the view-gallery container
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => scrollObserver.observe(el));


    // ---- 3. VIEW SWITCHING LOGIC ----
    const viewEditor = document.getElementById('view-editor');
    const btnBackGallery = document.getElementById('btn-back-gallery');
    const templateCards = document.querySelectorAll('.template-card');
    const inputSelectedTemplate = document.getElementById('selected-template');
    
    // Header UI toggles
    const navActions = document.getElementById('nav-actions');
    const mainNav = document.querySelector('.main-nav');
    const editorActions = document.getElementById('editor-actions');

    // Enter Editor
    const selectButtons = document.querySelectorAll('.btn-select');
    selectButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.template-card');
            const templateId = card.getAttribute('data-template');
            inputSelectedTemplate.value = templateId;
            
            // Apply template style to preview screen dynamically
            applyTemplateStyleToPreview(templateId);

            // Switch view
            viewGallery.classList.remove('active');
            viewEditor.classList.add('active');
            
            // UI Update
            navActions.classList.add('hidden');
            mainNav.classList.add('hidden');
            editorActions.classList.remove('hidden');
            navbar.classList.add('scrolled'); // Force solid header
        });
    });

    // Exit Editor
    if (btnBackGallery) {
        btnBackGallery.addEventListener('click', () => {
            viewEditor.classList.remove('active');
            viewGallery.classList.add('active');
            
            // UI Update
            editorActions.classList.add('hidden');
            navActions.classList.remove('hidden');
            mainNav.classList.remove('hidden');
            if (viewGallery.scrollTop <= 50) {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ---- 4. ACCORDION LOGIC ----
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            // Đóng các tab khác (tùy chọn)
            document.querySelectorAll('.accordion-item').forEach(item => {
                if(item !== this.parentElement) item.classList.remove('active');
            });
            // Mở tab hiện tại
            this.parentElement.classList.toggle('active');
        });
    });

    // ---- 5. LIVE PREVIEW UPDATE ----
    const pBride = document.getElementById('p-bride');
    const pGroom = document.getElementById('p-groom');
    const pDate = document.getElementById('p-date');
    const pTime = document.getElementById('p-time');
    const pLocation = document.getElementById('p-location');
    const pAddress = document.getElementById('p-address');

    const inBride = document.getElementById('in-bride');
    const inGroom = document.getElementById('in-groom');
    const inDate = document.getElementById('in-date');
    const inTime = document.getElementById('in-time');
    const inLocation = document.getElementById('in-location');
    const inAddress = document.getElementById('in-address');

    const updatePreview = () => {
        if (pBride) pBride.textContent = inBride.value || 'Cô Dâu';
        if (pGroom) pGroom.textContent = inGroom.value || 'Chú Rể';
        
        if (pDate && inDate) {
            if (inDate.value) {
                const dateObj = new Date(inDate.value);
                pDate.textContent = dateObj.toLocaleDateString('vi-VN', {
                    day: '2-digit', month: '2-digit', year: 'numeric'
                });
            } else {
                pDate.textContent = 'Ngày/Tháng/Năm';
            }
        }
        
        if (pTime) pTime.textContent = inTime ? inTime.value || '00:00' : '00:00';
        if (pLocation) pLocation.textContent = inLocation ? inLocation.value || 'Tên Địa Điểm / Nhà Hàng' : 'Tên Địa Điểm / Nhà Hàng';
        if (pAddress) pAddress.textContent = inAddress ? inAddress.value || 'Địa chỉ chi tiết' : 'Địa chỉ chi tiết';
    };

    [inBride, inGroom, inDate, inTime, inLocation, inAddress].forEach(input => {
        if (input) input.addEventListener('input', updatePreview);
    });

    function applyTemplateStyleToPreview(templateId) {
        const previewInner = document.getElementById('preview-inner');
        previewInner.style.background = '';
        previewInner.style.color = '#0F172A';
        const pNames = document.querySelector('.p-names');
        pNames.style.fontFamily = "'Cormorant Garamond', serif";
        pNames.style.fontWeight = "normal";
        pNames.style.fontStyle = "normal";
        
        if (templateId === 'tpl-songhy') {
            previewInner.style.background = 'linear-gradient(135deg, #8c2a2a 0%, #611111 100%)';
            previewInner.style.color = '#F9F2E7';
            pNames.style.fontFamily = "'Great Vibes', cursive";
            pNames.style.fontSize = "3.5rem";
        } else if (templateId === 'tpl-hoamoc') {
            previewInner.style.background = 'linear-gradient(135deg, #2E4B31 0%, #1A2E1D 100%)';
            previewInner.style.color = '#D4AF37';
            pNames.style.fontFamily = "'Playfair Display', serif";
            pNames.style.fontStyle = "italic";
            pNames.style.fontSize = "3rem";
        } else if (templateId === 'tpl-royal') {
            previewInner.style.background = 'linear-gradient(135deg, #0a1b42 0%, #050d24 100%)';
            previewInner.style.color = '#d5b882';
            pNames.style.fontFamily = "'Cormorant Garamond', serif";
            pNames.style.fontSize = "3.2rem";
        } else if (templateId === 'tpl-cute') {
            previewInner.style.background = 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)';
            previewInner.style.color = '#fff';
            pNames.style.fontFamily = "'DynaPuff', cursive";
            pNames.style.fontSize = "2.8rem";
            pNames.style.textShadow = "2px 2px 4px rgba(0,0,0,0.2)";
        } else if (templateId === 'tpl-sangtrong') {
            previewInner.style.background = 'linear-gradient(135deg, #8B0000 0%, #4A0404 100%)';
            previewInner.style.color = '#D4AF37';
            pNames.style.fontFamily = "'Playfair Display', serif";
            pNames.style.fontSize = "3.2rem";
        }
    }

    // ---- 6. PUBLISH / MODAL LOGIC ----
    const btnPublish = document.getElementById('btn-publish');
    const modal = document.getElementById('result-modal');
    const closeModal = document.querySelector('.close-modal');
    const inputGeneratedLink = document.getElementById('generated-link');
    const copyBtn = document.getElementById('copy-btn');

    if (btnPublish) {
        btnPublish.addEventListener('click', () => {
            const form = document.getElementById('editor-form');
            if (!form) return;
            const formData = new FormData(form);
            const params = new URLSearchParams();
            for (const [key, value] of formData.entries()) {
                if (value.trim() !== '') params.append(key, value.trim());
            }
            const baseUrl = window.location.origin + window.location.pathname;
            inputGeneratedLink.value = `${baseUrl}?${params.toString()}`;
            modal.classList.remove('hidden');
        });
    }

    if (closeModal) closeModal.addEventListener('click', () => modal.classList.add('hidden'));

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            inputGeneratedLink.select();
            document.execCommand('copy');
            copyBtn.textContent = 'Đã chép!';
            copyBtn.style.backgroundColor = '#10B981';
            setTimeout(() => {
                copyBtn.textContent = 'Sao chép';
                copyBtn.style.backgroundColor = '';
            }, 2000);
        });
    }

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            
            // Close all items
            faqItems.forEach(faq => {
                faq.classList.remove('open');
                faq.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // Open this item if it wasn't open
            if (!isOpen) {
                item.classList.add('open');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});
