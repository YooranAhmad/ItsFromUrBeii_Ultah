// --- Configuration ---
const targetDate = new Date("2026-04-13T00:00:00Z").getTime();

// --- Floating Particles ---
function initParticles() {
    const container = document.getElementById('particles-container');
    const particleTypes = ['✦', '♡', '✧', '·', '💙', '✨', '💫'];

    for (let i = 0; i < 35; i++) {
        const p = document.createElement('span');
        p.style.position = 'absolute';
        p.style.color = `hsla(210, 70%, 55%, ${0.15 + Math.random() * 0.2})`;
        p.textContent = particleTypes[Math.floor(Math.random() * particleTypes.length)];

        const duration = 10 + Math.random() * 15;
        const delay = Math.random() * 15;
        const size = 4 + Math.random() * 10;
        const left = Math.random() * 100;

        p.style.left = `${left}%`;
        p.style.bottom = '-20px';
        p.style.fontSize = `${size}px`;
        p.style.animation = `float-up ${duration}s ${delay}s linear infinite`;
        p.style.pointerEvents = 'none';

        container.appendChild(p);
    }
}

// --- Countdown Timer ---
function updateCountdown() {
    const container = document.getElementById('countdown-timer');
    const now = Date.now();
    const diff = targetDate - now;

    let time = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (diff > 0) {
        time = {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        };
    }

    const units = [
        { label: "Days", value: time.days },
        { label: "Hours", value: time.hours },
        { label: "Minutes", value: time.minutes },
        { label: "Seconds", value: time.seconds },
    ];

    container.innerHTML = units.map((unit, i) => `
    <div class="scroll-reveal visible" style="transition-delay: ${i * 0.15}s">
      <div class="bg-card\/80 backdrop-blur-sm border border-primary\/10 rounded-2xl p-6 text-center shadow-lg shadow-primary\/5">
        <span class="font-display text-4xl md:text-5xl font-bold text-primary block">
          ${String(unit.value).padStart(2, "0")}
        </span>
        <span class="text-muted-foreground text-sm font-body mt-2 block">
          ${unit.label}
        </span>
      </div>
    </div>
  `).join('');
}

// --- Scroll Reveal ---
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "-50px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                if (entry.target.id === 'final-section') {
                    triggerFinalAnimations();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}

// --- Final Section Animations ---
let finalAnimationsTriggered = false;
function triggerFinalAnimations() {
    if (finalAnimationsTriggered) return;
    finalAnimationsTriggered = true;

    initConfetti();
    initFloatingHearts();
}

function initConfetti(container) {
    const target = container || document.getElementById('confetti-container');
    const colors = [
        'hsl(210,70%,55%)', 'hsl(210,80%,70%)', 'hsl(200,60%,85%)',
        'hsl(330,50%,90%)', 'hsl(330,70%,75%)', 'hsl(210,50%,92%)',
        'hsl(45,90%,65%)'
    ];

    for (let i = 0; i < 60; i++) {
        const c = document.createElement('span');
        c.style.position = 'absolute';
        c.style.top = '0';

        const size = 6 + Math.random() * 8;
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 3 + Math.random() * 4;
        const color = colors[Math.floor(Math.random() * colors.length)];

        Object.assign(c.style, {
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animation: `float-up ${duration}s ${delay}s ease-out forwards`,
            animationDirection: 'reverse'
        });

        target.appendChild(c);
    }
}

function initFloatingHearts() {
    const container = document.getElementById('hearts-container');

    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('span');
        heart.style.position = 'absolute';
        heart.style.color = 'hsla(210, 70%, 55%, 0.4)';
        heart.style.fontSize = '1.5rem';
        heart.textContent = '♡';

        const left = 10 + Math.random() * 80;
        const delay = i * 0.3;

        heart.style.left = `${left}%`;
        heart.style.bottom = '20%';
        heart.style.opacity = '0';

        heart.animate([
            { opacity: 0, transform: 'translateY(100px) scale(0)' },
            { opacity: 1, transform: 'translateY(0) scale(1)', offset: 0.2 },
            { opacity: 1, transform: 'translateY(-100px) scale(0.7)', offset: 0.8 },
            { opacity: 0, transform: 'translateY(-200px) scale(0.5)' }
        ], {
            duration: 3000,
            delay: delay * 1000,
            iterations: Infinity,
            easing: 'ease-in-out'
        });

        container.appendChild(heart);
    }
}

// --- Music Control ---
function initMusic() {
    const music = document.getElementById('bg-music');
    const toggle = document.getElementById('music-toggle');
    if (!music || !toggle) return;

    let isPlaying = false;

    const toggleMusic = () => {
        if (isPlaying) {
            music.pause();
            toggle.classList.remove('playing');
        } else {
            music.play().catch(e => console.log("Music play blocked:", e));
            toggle.classList.add('playing');
        }
        isPlaying = !isPlaying;
    };

    toggle.addEventListener('click', toggleMusic);

    const startOnInteraction = () => {
        if (!isPlaying) {
            toggleMusic();
        }
        document.removeEventListener('click', startOnInteraction);
        document.removeEventListener('scroll', startOnInteraction);
    };

    document.addEventListener('click', startOnInteraction);
    document.addEventListener('scroll', startOnInteraction);
}

// --- ✨ Redesigned Love Question Modal ✨ ---
function initLoveModal() {
    const modal = document.getElementById('love-modal');
    const modalContent = document.getElementById('modal-content');
    const trigger = document.getElementById('ask-question-btn');
    const closeBtn = document.getElementById('close-modal-btn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const questionState = document.getElementById('question-state');
    const successState = document.getElementById('success-state');
    const modalConfetti = document.getElementById('modal-confetti');

    if (!modal || !trigger || !noBtn || !modalContent) return;

    let dodgeActive = false;
    let yesScale = 1;
    let dodgeCount = 0;
    let lastDodgeTime = 0;
    const dodgeCooldown = 350;

    // Fun messages when No dodges
    const dodgeMessages = [
        "Nice try! 😏",
        "Nope! 🙈",
        "Can't click me! 💨",
        "Too slow! 😝",
        "hehe~ 🏃‍♂️",
        "You know the answer! 💙",
    ];

    // Open Modal
    trigger.addEventListener('click', () => {
        modal.classList.add('active');
        questionState.classList.remove('hidden');
        successState.classList.add('hidden');

        // Reset
        yesScale = 1;
        dodgeCount = 0;
        yesBtn.style.transform = `scale(${yesScale})`;
        noBtn.style.position = 'relative';
        noBtn.style.left = '0';
        noBtn.style.top = '0';
        noBtn.textContent = 'No';
        noBtn.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        dodgeActive = true;

        // Clear old confetti
        if (modalConfetti) modalConfetti.innerHTML = '';
    });

    // Close Modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        dodgeActive = false;
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
            modal.classList.remove('active');
            dodgeActive = false;
        }
    });

    // Dodge Logic — Corner jumping with growing YES
    const handleMove = (e) => {
        if (!dodgeActive) return;

        const now = Date.now();
        if (now - lastDodgeTime < dodgeCooldown) return;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const btnRect = noBtn.getBoundingClientRect();
        const contentRect = modalContent.getBoundingClientRect();

        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;

        const deltaX = clientX - btnCenterX;
        const deltaY = clientY - btnCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const threshold = 100;

        if (distance < threshold) {
            lastDodgeTime = now;
            dodgeCount++;

            // 1. Grow YES button
            yesScale += 0.12;
            yesBtn.style.transform = `scale(${yesScale})`;
            yesBtn.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

            // 2. Change No button text for fun
            noBtn.textContent = dodgeMessages[dodgeCount % dodgeMessages.length];

            // 3. Shrink No button slightly
            const noScale = Math.max(0.7, 1 - dodgeCount * 0.05);
            noBtn.style.fontSize = `${noScale * 0.95}rem`;
            noBtn.style.opacity = Math.max(0.4, 1 - dodgeCount * 0.08);

            // 4. Corner Jump
            noBtn.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
            noBtn.style.position = 'absolute';

            const padding = 20;
            const maxX = contentRect.width - btnRect.width - padding;
            const maxY = contentRect.height - btnRect.height - padding;

            const corners = [
                { x: padding, y: padding },
                { x: maxX, y: padding },
                { x: padding, y: maxY },
                { x: maxX, y: maxY },
                { x: maxX / 2, y: padding },
                { x: maxX / 2, y: maxY },
            ];

            const randomCorner = corners[Math.floor(Math.random() * corners.length)];

            noBtn.style.left = `${randomCorner.x}px`;
            noBtn.style.top = `${randomCorner.y}px`;
            noBtn.style.margin = '0';

            // Add little sparkle at dodge position
            spawnDodgeSparkle(contentRect, randomCorner);
        }
    };

    function spawnDodgeSparkle(contentRect, pos) {
        const sparkle = document.createElement('span');
        sparkle.textContent = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.left = `${pos.x + 20}px`;
        sparkle.style.top = `${pos.y}px`;
        sparkle.style.fontSize = '1.2rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '5';
        sparkle.animate([
            { opacity: 1, transform: 'scale(1) translateY(0)' },
            { opacity: 0, transform: 'scale(0) translateY(-30px)' }
        ], { duration: 600, easing: 'ease-out', fill: 'forwards' });
        modalContent.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 700);
    }

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: false });

    // Also dodge on hover/touch of no button itself
    noBtn.addEventListener('mouseenter', (e) => handleMove(e));
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleMove(e);
    }, { passive: false });

    // Success Sequence
    yesBtn.addEventListener('click', () => {
        dodgeActive = false;
        questionState.classList.add('hidden');
        successState.classList.remove('hidden');

        // Confetti burst inside modal
        if (modalConfetti) {
            spawnModalConfetti(modalConfetti);
        }

        // Floating hearts
        spawnSuccessHearts();
    });

    function spawnModalConfetti(container) {
        const colors = [
            'hsl(210,70%,55%)', 'hsl(330,70%,75%)', 'hsl(45,90%,65%)',
            'hsl(200,60%,85%)', 'hsl(280,60%,70%)', 'hsl(150,50%,60%)'
        ];

        for (let i = 0; i < 50; i++) {
            const piece = document.createElement('span');
            piece.className = 'modal-confetti-piece';

            const size = 4 + Math.random() * 8;
            const left = Math.random() * 100;
            const delay = Math.random() * 1;
            const duration = 2 + Math.random() * 3;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const rotation = Math.random() * 720;

            Object.assign(piece.style, {
                left: `${left}%`,
                width: `${size}px`,
                height: `${size * (0.4 + Math.random() * 0.6)}px`,
                backgroundColor: color,
                borderRadius: Math.random() > 0.5 ? '50%' : '1px',
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
            });

            container.appendChild(piece);
        }
    }

    function spawnSuccessHearts() {
        const container = document.getElementById('floating-hearts-success');
        if (!container) return;

        const hearts = ['💙', '💖', '💕', '💗', '✨', '🩵'];

        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('span');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.className = 'success-floating-heart';
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.bottom = '0';
            heart.style.fontSize = `${1 + Math.random() * 1.5}rem`;

            const duration = 2 + Math.random() * 3;
            const delay = Math.random() * 2;

            heart.animate([
                { transform: 'translateY(0) scale(1) rotate(0deg)', opacity: 0 },
                { opacity: 1, offset: 0.15 },
                { opacity: 0.8, offset: 0.5 },
                { transform: `translateY(-${150 + Math.random() * 100}px) scale(0.3) rotate(${Math.random() > 0.5 ? '' : '-'}${30 + Math.random() * 60}deg)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                delay: delay * 1000,
                easing: 'ease-out',
                fill: 'forwards'
            });

            container.appendChild(heart);
        }
    }
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initScrollReveal();
    initMusic();
    initLoveModal();

    // Hero animations
    const heroContent = document.querySelector('.hero-content');
    const heroFooter = document.querySelector('.hero-footer');

    setTimeout(() => {
        if (heroContent) heroContent.classList.add('visible');
    }, 300);

    setTimeout(() => {
        if (heroFooter) heroFooter.classList.add('visible');
    }, 2000);

    // Update countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);
});
