/* ============================================
   BIRTHDAY WEBSITE - SCRIPT.JS
   Interactive Features & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    // ============================================
    // DOM ELEMENTS
    // ============================================
    const elements = {
        // Page 1
        page1: document.getElementById('page1'),
        nameInput: document.getElementById('nameInput'),
        startBtn: document.getElementById('startBtn'),

        // Page 2
        page2: document.getElementById('page2'),
        nameDisplay: document.getElementById('nameDisplay'),
        surpriseBtn: document.getElementById('surpriseBtn'),

        // Surprise Section
        surpriseSection: document.getElementById('surpriseSection'),
        surpriseOverlay: document.getElementById('surpriseOverlay'),
        closeSurprise: document.getElementById('closeSurprise'),
        giftBoxContainer: document.getElementById('giftBoxContainer'),
        giftBox: document.getElementById('giftBox'),
        surpriseMessage: document.getElementById('surpriseMessage'),
        heartsRain: document.getElementById('heartsRain'),

        // Wish Navigation
        prevWish: document.getElementById('prevWish'),
        nextWish: document.getElementById('nextWish'),
        wishDots: document.getElementById('wishDots'),

        // Music
        bgMusic: document.getElementById('bgMusic'),
        musicBtn: document.getElementById('musicBtn'),
        musicControls: document.getElementById('musicControls'),

        // Effects
        floatingElements: document.getElementById('floatingElements'),
        confettiContainer: document.getElementById('confettiContainer')
    };

    // State
    let userName = '';
    let currentWish = 0;
    let isPlaying = false;
    let balloonsInterval = null;
    let sparklesInterval = null;

    // ============================================
    // NAME INPUT HANDLING
    // ============================================
    elements.nameInput.addEventListener('input', function () {
        const value = this.value.trim();
        elements.startBtn.disabled = value.length === 0;

        // Add subtle animation on typing
        if (value.length > 0) {
            this.style.borderColor = 'var(--gold-main)';
        } else {
            this.style.borderColor = 'var(--pink-soft)';
        }
    });

    elements.nameInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && this.value.trim().length > 0) {
            elements.startBtn.click();
        }
    });

    // ============================================
    // START BUTTON - TRANSITION TO PAGE 2
    // ============================================
    elements.startBtn.addEventListener('click', function () {
        if (this.disabled) return;

        userName = elements.nameInput.value.trim();

        // Trigger confetti
        createConfetti();

        // Transition after confetti starts
        setTimeout(() => {
            // Update all name placeholders
            updateNamePlaceholders(userName);

            // Switch pages
            elements.page1.classList.remove('active');
            elements.page2.classList.add('active');
            elements.bgMusic.play().then(() => {
                elements.musicBtn.classList.add('playing');
                elements.musicBtn.querySelector('.music-status').textContent = 'Pause';
                isPlaying = true;
            }).catch(err => console.log('Autoplay blocked:', err));

            // Start floating effects
            startFloatingEffects();

            // Show music controls
            elements.musicControls.style.opacity = '1';
        }, 800);
    });

    // ============================================
    // UPDATE NAME PLACEHOLDERS
    // ============================================
    function updateNamePlaceholders(name) {
        // Main display
        elements.nameDisplay.textContent = name;

        // All other placeholders
        const placeholders = document.querySelectorAll('.name-placeholder');
        placeholders.forEach(el => {
            el.textContent = name;
        });
    }

    // ============================================
    // CONFETTI EFFECT
    // ============================================
    function createConfetti() {
        const colors = [
            '#ec407a', '#f48fb1', '#ffc107', '#ffecb3',
            '#ff8a80', '#ffd54f', '#f8bbd9', '#fff59d'
        ];
        const shapes = ['square', 'circle', 'rectangle'];

        for (let i = 0; i < 150; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';

                // Random properties
                const color = colors[Math.floor(Math.random() * colors.length)];
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                const left = Math.random() * 100;
                const size = Math.random() * 10 + 5;
                const duration = Math.random() * 2 + 2;
                const delay = Math.random() * 0.5;

                confetti.style.cssText = `
                    left: ${left}%;
                    width: ${size}px;
                    height: ${shape === 'rectangle' ? size * 2 : size}px;
                    background-color: ${color};
                    border-radius: ${shape === 'circle' ? '50%' : '2px'};
                    animation-duration: ${duration}s;
                    animation-delay: ${delay}s;
                `;

                elements.confettiContainer.appendChild(confetti);

                // Remove after animation
                setTimeout(() => {
                    confetti.remove();
                }, (duration + delay) * 1000);
            }, i * 20);
        }
    }

    // ============================================
    // FLOATING EFFECTS (Balloons & Sparkles)
    // ============================================
    function startFloatingEffects() {
        // Create balloons
        const balloons = ['🎈', '🎀', '🩷', '💛', '🌸'];

        function createBalloon() {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.textContent = balloons[Math.floor(Math.random() * balloons.length)];

            const left = Math.random() * 100;
            const duration = Math.random() * 8 + 8;
            const delay = Math.random() * 2;
            const size = Math.random() * 1.5 + 1.5;

            balloon.style.cssText = `
                left: ${left}%;
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
                font-size: ${size}rem;
            `;

            elements.floatingElements.appendChild(balloon);

            setTimeout(() => {
                balloon.remove();
            }, (duration + delay) * 1000);
        }

        // Initial balloons
        for (let i = 0; i < 5; i++) {
            setTimeout(createBalloon, i * 500);
        }

        // Continue creating balloons
        balloonsInterval = setInterval(createBalloon, 3000);

        // Create sparkles
        function createSparkle() {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle-float';
            sparkle.textContent = '✨';

            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const duration = Math.random() * 2 + 3;

            sparkle.style.cssText = `
                left: ${left}%;
                top: ${top}%;
                animation-duration: ${duration}s;
            `;

            elements.floatingElements.appendChild(sparkle);

            setTimeout(() => {
                sparkle.remove();
            }, duration * 2000);
        }

        // Initial sparkles
        for (let i = 0; i < 8; i++) {
            setTimeout(createSparkle, i * 300);
        }

        // Continue creating sparkles
        sparklesInterval = setInterval(createSparkle, 2000);
    }

    // ============================================
    // SURPRISE SECTION
    // ============================================
    elements.surpriseBtn.addEventListener('click', function () {
        elements.surpriseSection.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close surprise
    function closeSurpriseSection() {
        elements.surpriseSection.classList.remove('active');
        document.body.style.overflow = '';

        // Reset gift box state for next time - immediate reset after fade out
        setTimeout(() => {
            elements.giftBoxContainer.classList.remove('opened');
            elements.giftBoxContainer.style.display = 'block';
            elements.surpriseMessage.classList.remove('active');

            // Reset gift box animation
            elements.giftBox.style.animation = '';
            elements.giftBox.style.transform = '';
            elements.giftBox.style.opacity = '';

            // Clear any remaining hearts
            elements.heartsRain.innerHTML = '';
        }, 500);
    }

    elements.closeSurprise.addEventListener('click', closeSurpriseSection);
    elements.surpriseOverlay.addEventListener('click', closeSurpriseSection);

    // Gift box click
    elements.giftBox.addEventListener('click', function () {
        // Prevent multiple clicks
        if (elements.giftBoxContainer.classList.contains('opened')) return;

        // Animate gift opening
        this.style.animation = 'giftOpen 0.5s ease-out forwards';

        setTimeout(() => {
            elements.giftBoxContainer.style.display = 'none';
            elements.giftBoxContainer.classList.add('opened');
            elements.surpriseMessage.classList.add('active');

            // Start hearts rain
            createHeartsRain();
        }, 500);
    });

    // ============================================
    // HEARTS RAIN EFFECT
    // ============================================
    function createHeartsRain() {
        const hearts = ['💕', '💗', '💖', '💝', '❤️', '🩷'];

        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

                const left = Math.random() * 100;
                const duration = Math.random() * 3 + 2;
                const size = Math.random() * 1 + 0.8;

                heart.style.cssText = `
                    left: ${left}%;
                    animation-duration: ${duration}s;
                    font-size: ${size}rem;
                `;

                elements.heartsRain.appendChild(heart);

                setTimeout(() => {
                    heart.remove();
                }, duration * 1000);
            }, i * 100);
        }
    }

    // ============================================
    // WISH CAROUSEL NAVIGATION
    // ============================================
    const wishCards = document.querySelectorAll('.wish-card');
    const dots = document.querySelectorAll('.dot');

    function showWish(index) {
        // Boundary check
        if (index < 0) index = wishCards.length - 1;
        if (index >= wishCards.length) index = 0;

        currentWish = index;

        // Update cards
        wishCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    elements.prevWish.addEventListener('click', () => showWish(currentWish - 1));
    elements.nextWish.addEventListener('click', () => showWish(currentWish + 1));

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showWish(index));
    });

    // Auto-rotate wishes
    setInterval(() => {
        if (elements.surpriseMessage.classList.contains('active')) {
            showWish(currentWish + 1);
        }
    }, 5000);

    // ============================================
    // MUSIC CONTROLS
    // ============================================
    elements.musicBtn.addEventListener('click', function () {
        if (isPlaying) {
            elements.bgMusic.pause();
            this.classList.remove('playing');
            this.querySelector('.music-status').textContent = 'Play';
        } else {
            elements.bgMusic.play().catch(err => {
                console.log('Audio playback failed:', err);
                // Show message about music
                alert('🎵 To add music, replace the audio source in index.html with your own music file!');
            });
            this.classList.add('playing');
            this.querySelector('.music-status').textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    });

    // Music volume
    elements.bgMusic.volume = 0.5;

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    document.addEventListener('keydown', function (e) {
        // Escape to close surprise
        if (e.key === 'Escape' && elements.surpriseSection.classList.contains('active')) {
            closeSurpriseSection();
        }

        // Arrow keys for wish navigation
        if (elements.surpriseMessage.classList.contains('active')) {
            if (e.key === 'ArrowLeft') showWish(currentWish - 1);
            if (e.key === 'ArrowRight') showWish(currentWish + 1);
        }

        // Space to toggle music (when not in input)
        if (e.key === ' ' && document.activeElement !== elements.nameInput) {
            e.preventDefault();
            elements.musicBtn.click();
        }
    });

    // ============================================
    // TOUCH SWIPE FOR WISHES (Mobile)
    // ============================================
    let touchStartX = 0;
    let touchEndX = 0;

    elements.surpriseMessage?.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    elements.surpriseMessage?.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                showWish(currentWish + 1);
            } else {
                showWish(currentWish - 1);
            }
        }
    }

    // ============================================
    // SMOOTH SCROLL FOR SAFARI
    // ============================================
    if (CSS.supports('scroll-behavior', 'smooth') === false) {
        document.documentElement.style.scrollBehavior = 'auto';
    }

    // ============================================
    // PREVENT ZOOM ON INPUT FOCUS (iOS)
    // ============================================
    const metas = document.getElementsByTagName('meta');
    for (let i = 0; i < metas.length; i++) {
        if (metas[i].name === 'viewport') {
            metas[i].content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        }
    }

    // ============================================
    // INITIAL SETUP
    // ============================================

    // Focus name input on load
    setTimeout(() => {
        elements.nameInput.focus();
    }, 500);

    // Add gift open animation to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes giftOpen {
            0% { transform: scale(1); }
            20% { transform: scale(1.1) rotate(-5deg); }
            40% { transform: scale(1.2) rotate(5deg); }
            60% { transform: scale(1.1) rotate(-3deg); }
            80% { transform: scale(1.3) translateY(-20px); opacity: 0.5; }
            100% { transform: scale(0) translateY(-50px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Console Easter Egg
    console.log('%c🎂 Happy Birthday Website 🎂', 'font-size: 24px; color: #ec407a; font-weight: bold;');
    console.log('%cMade with 💕 for someone special!', 'font-size: 14px; color: #ffc107;');
});