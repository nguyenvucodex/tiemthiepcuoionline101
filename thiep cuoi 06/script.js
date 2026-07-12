const opening = document.querySelector('#opening');
const mainInvitation = document.querySelector('#mainInvitation');
const openButton = document.querySelector('#openInvitation');
const backButton = document.querySelector('#backToCover');

const albumImages = [
  'album/a1.jpg',
  'album/a2.jpg',
  'album/a3.jpg',
  'album/a4.jpg',
  'album/a5.jpg',
  'album/a6.jpg',
  'album/a7.jpg'
];

const albumButtons = document.querySelectorAll('[data-album-index]');
const lightbox = document.querySelector('#albumLightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const lightboxCounter = document.querySelector('#lightboxCounter');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const rsvpButton = document.querySelector('.rsvp-button');
const luckyEnvelope = document.querySelector('.lucky-envelope');
const giftModal = document.querySelector('#giftModal');
const giftClose = document.querySelector('.gift-close');
const bgMusic = document.querySelector('#bgMusic');
const musicToggle = document.querySelector('#musicToggle');
let currentAlbumIndex = 0;
const sparklesContainer = document.getElementById('sparklesContainer');

function startSparkles() {
  if (!sparklesContainer) return;
  sparklesContainer.style.display = 'block';
  sparklesContainer.innerHTML = '';
  for (let i = 0; i < 25; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.animationDuration = (Math.random() * 4 + 3) + 's';
    sparkle.style.animationDelay = (Math.random() * 5) + 's';
    sparklesContainer.appendChild(sparkle);
  }
}

function stopSparkles() {
  if (sparklesContainer) {
    sparklesContainer.style.display = 'none';
    sparklesContainer.innerHTML = '';
  }
}

function fireConfetti() {
  if (typeof confetti !== 'function') return;
  const colors = ['#bd342b', '#efb15d', '#ffea7c'];

  const shoot = (count, yPos, delay) => {
    setTimeout(() => {
      confetti({
        particleCount: count,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: yPos },
        colors: colors,
        zIndex: 9999
      });
      confetti({
        particleCount: count,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: yPos },
        colors: colors,
        zIndex: 9999
      });
    }, delay);
  };

  shoot(80, 0.8, 0);
  shoot(50, 0.75, 300);
  shoot(40, 0.7, 600);
}

function openInvitation() {
  opening.classList.add('is-open');
  mainInvitation.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'auto';
  window.setTimeout(() => mainInvitation.querySelector('[tabindex], h2, p')?.focus?.(), 800);

  if (bgMusic && bgMusic.paused) {
    bgMusic.play().then(() => {
      musicToggle?.classList.add('is-playing');
    }).catch(() => {});
  }

  fireConfetti();
  startSparkles();
}

function showCover() {
  opening.classList.remove('is-open');
  mainInvitation.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = 'hidden';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  window.setTimeout(() => openButton.focus(), 300);
  stopSparkles();
}

function renderLightbox() {
  lightboxImage.src = albumImages[currentAlbumIndex];
  lightboxImage.alt = `Ảnh cưới phóng to ${currentAlbumIndex + 1}`;
  lightboxCounter.textContent = `${currentAlbumIndex + 1} / ${albumImages.length}`;
}

function openLightbox(index) {
  currentAlbumIndex = index;
  renderLightbox();
  lightbox.classList.add('is-active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove('is-active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = opening.classList.contains('is-open') ? 'auto' : 'hidden';
}

function showAlbumImage(direction) {
  currentAlbumIndex = (currentAlbumIndex + direction + albumImages.length) % albumImages.length;
  renderLightbox();
}

function openGiftModal() {
  giftModal?.classList.add('is-active');
  giftModal?.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  giftClose?.focus();
}

function closeGiftModal() {
  giftModal?.classList.remove('is-active');
  giftModal?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = opening.classList.contains('is-open') ? 'auto' : 'hidden';
}

function toggleMusic() {
  if (!bgMusic) return;
  if (bgMusic.paused) {
    bgMusic.play().then(() => {
      musicToggle?.classList.add('is-playing');
    }).catch(() => {});
  } else {
    bgMusic.pause();
    musicToggle?.classList.remove('is-playing');
  }
}

musicToggle?.addEventListener('click', toggleMusic);
openButton.addEventListener('click', openInvitation);
backButton?.addEventListener('click', showCover);

albumButtons.forEach((button) => {
  button.addEventListener('click', () => openLightbox(Number(button.dataset.albumIndex)));
});

lightboxClose?.addEventListener('click', closeLightbox);
lightboxPrev?.addEventListener('click', () => showAlbumImage(-1));
lightboxNext?.addEventListener('click', () => showAlbumImage(1));

rsvpButton?.addEventListener('click', () => {
  rsvpButton.textContent = 'CẢM ƠN QUÝ KHÁCH';
  rsvpButton.disabled = true;
});

luckyEnvelope?.addEventListener('click', openGiftModal);
giftClose?.addEventListener('click', closeGiftModal);
giftModal?.addEventListener('click', (event) => {
  if (event.target === giftModal) closeGiftModal();
});

lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  const isLightboxOpen = lightbox?.classList.contains('is-active');
  const isGiftModalOpen = giftModal?.classList.contains('is-active');

  if (isGiftModalOpen && event.key === 'Escape') closeGiftModal();
  if (isLightboxOpen && event.key === 'Escape') closeLightbox();
  if (isLightboxOpen && event.key === 'ArrowLeft') showAlbumImage(-1);
  if (isLightboxOpen && event.key === 'ArrowRight') showAlbumImage(1);
  if (!isLightboxOpen && !isGiftModalOpen && event.key === 'Escape' && opening.classList.contains('is-open')) showCover();
});

document.body.style.overflow = 'hidden';


