// --- Configuration ---
const targetDate = new Date("2026-04-13T00:00:00").getTime();

// --- Floating Particles ---
function initParticles() {
    const container = document.getElementById('particles-container');
    const particleTypes = ['✦', '♡', '✧', '·', '💙'];

    for (let i = 0; i < 30; i++) {
        const p = document.createElement('span');
        p.className = 'absolute text-primary/30';
        p.textContent = particleTypes[Math.floor(Math.random() * particleTypes.length)];

        const duration = 10 + Math.random() * 15;
        const delay = Math.random() * 15;
        const size = 4 + Math.random() * 8;
        const left = Math.random() * 100;

        p.style.left = `${left}%`;
        p.style.bottom = '-20px';
        p.style.fontSize = `${size}px`;
        p.style.animation = `float-up ${duration}s ${delay}s linear infinite`;

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
      <div class="bg-card/80 backdrop-blur-sm border border-primary/10 rounded-2xl p-6 text-center shadow-lg shadow-primary/5">
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

                // Trigger specific animations if needed
                if (entry.target.id === 'final-section') {
                    triggerFinalAnimations();
                }
            }
        });
    }, observerOptions);

    // Observe all scroll-reveal elements
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

function initConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['hsl(210,70%,55%)', 'hsl(210,80%,70%)', 'hsl(200,60%,85%)', 'hsl(330,50%,90%)', 'hsl(210,50%,92%)'];

    for (let i = 0; i < 60; i++) {
        const c = document.createElement('span');
        c.className = 'absolute top-0';

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

        container.appendChild(c);
    }
}

function initFloatingHearts() {
    const container = document.getElementById('hearts-container');

    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('span');
        heart.className = 'absolute text-primary/40 text-2xl';
        heart.textContent = '♡';

        const left = 10 + Math.random() * 80;
        const delay = i * 0.3;

        heart.style.left = `${left}%`;
        heart.style.bottom = '20%';
        heart.style.opacity = '0';

        // Custom animation for hearts since we don't have framer-motion
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

    // Auto-play on first interaction (browsers block true autoplay)
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

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initScrollReveal();
    initMusic();

    // Hero animations
    const heroContent = document.querySelector('.hero-content');
    const heroFooter = document.querySelector('.hero-footer');

    // Initial states are handled by CSS classes now

    setTimeout(() => {
        if (heroContent) heroContent.classList.add('visible');
    }, 300); // Slight delay for smoother entrance

    setTimeout(() => {
        if (heroFooter) heroFooter.classList.add('visible');
    }, 2000); // 2 second delay to match original React code

    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
});
