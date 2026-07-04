/* =============================================
   SRE / SysAdmin Portfolio — JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ========== Particle Background ==========
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.4 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 229, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            particles = [];
            return;
        }
        
        let density = window.innerWidth < 768 ? 20000 : 12000;
        const count = Math.min(Math.floor((canvas.width * canvas.height) / density), window.innerWidth < 768 ? 60 : 120);
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 229, 255, ${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (particles.length > 0) {
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    document.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });


    // ========== Navbar Scroll Effect ==========
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Scrolled state
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    });


    // ========== Mobile Nav Toggle ==========
    const navToggle = document.getElementById('nav-toggle');
    const navLinksContainer = document.getElementById('nav-links');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });


    // ========== Terminal Typing Effect ==========
    const commands = [
        { cmd: 'cat /etc/profile/just3tee', output: [
            '<span style="color:#00e676">╔══════════════════════════════════════╗</span>',
            '<span style="color:#00e676">║</span>  <span style="color:#00e5ff;font-weight:bold">Thi Tan Thinh (3tee)</span>              <span style="color:#00e676">║</span>',
            '<span style="color:#00e676">║</span>  System Admin @ Sacombank           <span style="color:#00e676">║</span>',
            '<span style="color:#00e676">║</span>  Ho Chi Minh City, Vietnam          <span style="color:#00e676">║</span>',
            '<span style="color:#00e676">╚══════════════════════════════════════╝</span>',
            '',
            '<span style="color:#b388ff">Platform:</span>  Red Hat OpenShift (OCP)',
            '<span style="color:#b388ff">Certs:</span>     <span style="color:#00e676">3x Red Hat Certified</span>',
            '<span style="color:#b388ff">Stack:</span>     RHEL · IBM MQ · Redis · Prometheus',
            '<span style="color:#b388ff">Status:</span>    <span style="color:#00e676">● OPERATIONAL</span>',
        ]},
        { cmd: 'oc get nodes -o wide', output: [
            '<span style="color:#5a6478">NAME              STATUS   ROLES          AGE    VERSION</span>',
            'ocp-master-01     <span style="color:#00e676">Ready</span>    control-plane  200d   v4.15.3',
            'ocp-master-02     <span style="color:#00e676">Ready</span>    control-plane  200d   v4.15.3',
            'ocp-master-03     <span style="color:#00e676">Ready</span>    control-plane  200d   v4.15.3',
            'ocp-worker-01     <span style="color:#00e676">Ready</span>    worker         200d   v4.15.3',
            'ocp-worker-02     <span style="color:#00e676">Ready</span>    worker         200d   v4.15.3',
            'ocp-infra-01      <span style="color:#00e676">Ready</span>    infra          200d   v4.15.3',
            '',
            '<span style="color:#00e676">All banking services operational ✓</span>',
        ]},
        { cmd: 'uptime && promtool check rules', output: [
            '<span style="color:#b388ff">up 365 days, 23:59</span>, load average: 0.42, 0.38, 0.35',
            '',
            '<span style="color:#5a6478">Checking alert rules...</span>',
            '  core-banking.rules    <span style="color:#00e676">✓ SUCCESS</span>  12 rules',
            '  payment-gateway.rules <span style="color:#00e676">✓ SUCCESS</span>  8 rules',
            '  ibm-mq.rules          <span style="color:#00e676">✓ SUCCESS</span>  5 rules',
            '  redis-cluster.rules   <span style="color:#00e676">✓ SUCCESS</span>  6 rules',
            '',
            '<span style="color:#ffd740">Coffee level: ████████░░ 80%</span>  ☕',
        ]},
    ];

    let currentCmdIndex = 0;
    const typedCommand = document.getElementById('typed-command');
    const terminalOutput = document.getElementById('terminal-output');

    function typeCommand(cmd, callback) {
        let i = 0;
        typedCommand.textContent = '';
        terminalOutput.innerHTML = '';

        function type() {
            if (i < cmd.length) {
                typedCommand.textContent += cmd[i];
                i++;
                setTimeout(type, 30 + Math.random() * 50);
            } else {
                setTimeout(callback, 300);
            }
        }
        type();
    }

    function showOutput(lines) {
        lines.forEach((line, index) => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.className = 'output-line';
                div.innerHTML = line;
                div.style.animationDelay = `${index * 0.05}s`;
                terminalOutput.appendChild(div);
            }, index * 60);
        });
    }

    function runTerminalLoop() {
        const { cmd, output } = commands[currentCmdIndex];
        typeCommand(cmd, () => {
            showOutput(output);
            currentCmdIndex = (currentCmdIndex + 1) % commands.length;
            setTimeout(runTerminalLoop, output.length * 60 + 4000);
        });
    }

    setTimeout(runTerminalLoop, 800);


    // ========== Stats Counter Animation ==========
    function animateCounters() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            const isDecimal = target % 1 !== 0;
            const duration = 2000;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = target * eased;

                if (isDecimal) {
                    stat.textContent = current.toFixed(2);
                } else {
                    stat.textContent = Math.floor(current);
                }

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }
            requestAnimationFrame(update);
        });
    }


    // ========== Scroll Reveal (AOS-like) ==========
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));


    // ========== Skill Bar Animation ==========
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.skill-bar-fill');
                fills.forEach(fill => {
                    const width = fill.getAttribute('data-width');
                    setTimeout(() => {
                        fill.style.width = width + '%';
                    }, 300);
                });
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));


    // ========== Stats Counter trigger ==========
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) heroObserver.observe(heroStats);


    // ========== Contact Form ==========
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;

        btnText.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Simulate form submission
        setTimeout(() => {
            btnText.textContent = '✓ Sent Successfully!';
            submitBtn.style.background = 'linear-gradient(135deg, #00e676, #00c853)';

            setTimeout(() => {
                btnText.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.background = '';
                contactForm.reset();
            }, 3000);
        }, 1500);
    });


    // ========== Smooth Scroll for Nav Links ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
