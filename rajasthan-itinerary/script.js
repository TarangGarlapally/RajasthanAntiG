// Interactive features for the Rajasthan Itinerary

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation
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

    // City card interactions
    const cityCards = document.querySelectorAll('.city-card');
    cityCards.forEach(card => {
        card.addEventListener('click', () => {
            const city = card.dataset.city;
            highlightCityInTimeline(city);
        });
    });

    // Highlight city in timeline
    function highlightCityInTimeline(city) {
        const timelineItems = document.querySelectorAll('.timeline-item');

        // Remove previous highlights
        timelineItems.forEach(item => {
            item.style.opacity = '0.3';
        });

        // Highlight matching city items
        timelineItems.forEach(item => {
            const badges = item.querySelectorAll('.city-badge');
            badges.forEach(badge => {
                if (badge.classList.contains(`${city}-badge`)) {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1.02)';

                    // Scroll to first matching item
                    if (item === document.querySelector(`.timeline-item [class*="${city}-badge"]`)?.closest('.timeline-item')) {
                        setTimeout(() => {
                            item.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            });
                        }, 100);
                    }
                }
            });
        });

        // Reset after 5 seconds
        setTimeout(() => {
            timelineItems.forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            });
        }, 5000);
    }

    // Animate timeline items on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item, .city-card, .tip-card, .packing-category').forEach(el => {
        observer.observe(el);
    });

    // Add parallax effect to hero
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero-section');
                if (hero && scrolled < window.innerHeight) {
                    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                    hero.style.opacity = 1 - (scrolled / window.innerHeight);
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Interactive packing checklist
    const packingItems = document.querySelectorAll('.packing-category li');
    packingItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function () {
            this.style.textDecoration = this.style.textDecoration === 'line-through' ? 'none' : 'line-through';
            this.style.opacity = this.style.opacity === '0.5' ? '1' : '0.5';
        });
    });

    // Add day counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 30);
    });

    // Print functionality
    const printButton = document.createElement('button');
    printButton.textContent = '📄 Print Itinerary';
    printButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 2rem;
        background: linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%);
        color: #0A0E27;
        border: none;
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(245, 158, 11, 0.4);
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1rem;
    `;

    printButton.addEventListener('mouseenter', () => {
        printButton.style.transform = 'translateY(-3px)';
        printButton.style.boxShadow = '0 6px 25px rgba(245, 158, 11, 0.6)';
    });

    printButton.addEventListener('mouseleave', () => {
        printButton.style.transform = 'translateY(0)';
        printButton.style.boxShadow = '0 4px 20px rgba(245, 158, 11, 0.4)';
    });

    printButton.addEventListener('click', () => {
        window.print();
    });

    document.body.appendChild(printButton);

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #E91E63, #1976D2, #F59E0B, #0D9488);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    console.log('🏰 Rajasthan Itinerary loaded successfully!');
    console.log('✨ Interactive features enabled');
});
