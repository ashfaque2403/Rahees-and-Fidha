const weddingDate = new Date("March 28, 2026 10:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const gap = weddingDate - now;

    const d = Math.floor(gap / (1000 * 60 * 60 * 24));
    const h = Math.floor((gap / (1000 * 60 * 60)) % 24);
    const m = Math.floor((gap / (1000 * 60)) % 60);
    const s = Math.floor((gap / 1000) % 60);

    document.getElementById("days").innerText = d;
    document.getElementById("hours").innerText = h;
    document.getElementById("minutes").innerText = m;
    document.getElementById("seconds").innerText = s;
}, 1000);

        // --- 1. Splash Screen & Typewriter Logic ---
        document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const arabicEl = document.querySelector(".bismillah-arabic");

    const arabicText = "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم";

    setTimeout(() => {
        let i = arabicText.length;
        const speed = 60;

        const arabicInterval = setInterval(() => {
            if (i <= 0) {
                clearInterval(arabicInterval);

                // Hide preloader after Arabic finishes
                setTimeout(() => {
                    preloader.classList.add("hidden");
                }, 600);

            } else {
                i--;
                arabicEl.textContent = arabicText.substring(i);
                arabicEl.style.width = "auto";
            }
        }, speed);

    }, 800);
});
        // --- 2. Scroll Reveals (Intersection Observer) ---
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: Unobserve after revealing
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(element => {
            observer.observe(element);
        });

        // --- 3. Dynamic Parallax Falling Petals (Canvas) ---
        const canvas = document.getElementById('petal-canvas');
        const ctx = canvas.getContext('2d');
        let width, height;
        let petals = [];
        let lastScrollY = window.scrollY;

        function resizeCanvas() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Petal {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height - height; // Start above screen
                this.size = Math.random() * 4 + 2;
                this.speedY = Math.random() * 1 + 0.5;
                this.speedX = Math.random() * 1 - 0.5;
                this.rotation = Math.random() * 360;
                this.rotationSpeed = Math.random() * 2 - 1;
                // Soft cream/gold translucent color
                this.color = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.6)' : 'rgba(212, 175, 55, 0.4)';
            }

            update(scrollDelta) {
                // Natural fall + Scroll reactivity
                this.y += this.speedY + (scrollDelta * 0.3);
                this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5; // Slight sway
                this.rotation += this.rotationSpeed;

                // Reset position if it falls off screen
                if (this.y > height + 20) {
                    this.y = -20;
                    this.x = Math.random() * width;
                } else if (this.y < -50) {
                    // In case of fast upward scroll
                    this.y = height + 20;
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation * Math.PI / 180);
                
                // Draw a simple petal shape
                ctx.beginPath();
                ctx.ellipse(0, 0, this.size, this.size * 1.5, 0, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                
                ctx.restore();
            }
        }

        // Initialize 50 petals
        for (let i = 0; i < 50; i++) {
            petals.push(new Petal());
        }

        function animatePetals() {
            ctx.clearRect(0, 0, width, height);
            
            let currentScrollY = window.scrollY;
            let scrollDelta = currentScrollY - lastScrollY;
            lastScrollY = currentScrollY;

            petals.forEach(petal => {
                petal.update(scrollDelta);
                petal.draw();
            });

            requestAnimationFrame(animatePetals);
        }

        animatePetals();

const music = document.getElementById("bg-music");

// Try autoplay on load
window.addEventListener("load", () => {
    music.play().catch(() => {
        console.log("Autoplay blocked, waiting for user interaction");
    });
});

// Play on first user interaction (fix for mobile)
document.addEventListener("click", () => {
    music.play();
}, { once: true });        


