
// Function to handle skill bar animations, scroll effects, and section transitions
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const modal = document.getElementById('portfolioModal');
    const portfolioLogo = document.getElementById('portfolioLogo');
    const closeModal = document.querySelector('.close-modal');

    // Open modal when clicking on the logo
    portfolioLogo.addEventListener('click', function() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });

    // Close modal when clicking the close button
    closeModal.addEventListener('click', function() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Scroll indicators
    const scrollDown = document.querySelector('.scroll-down');
    const scrollUp = document.querySelector('.scroll-up');
    // Skill bar animation
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        const progress = skill.querySelector('.skill-progress');
        const level = skill.getAttribute('data-level');
        setTimeout(() => {
            progress.style.width = level + '%';
        }, 500);
    });

    // Scroll animations
    const scrollAnimateElements = document.querySelectorAll('.scroll-animate');
    
    // Initially hide all animated elements
    scrollAnimateElements.forEach(el => {
        el.style.opacity = '0';
    });
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }

    // Add animation when scrolling
    function handleScrollAnimations() {
        scrollAnimateElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animate-up')) {
                element.classList.add('animate-up');
                // Add a slight delay between elements for a cascading effect
                const delay = Array.from(scrollAnimateElements).indexOf(element) * 200;
                setTimeout(() => {
                    element.style.opacity = '1';
                }, delay);
            }
        });
    }

    // Check on initial load
    handleScrollAnimations();
    
    // Check on scroll
    window.addEventListener('scroll', function() {
        handleScrollAnimations();
        
        // Show/hide scroll up indicator
        if (window.scrollY > 100) {
            document.body.classList.add('not-at-top');
            document.body.classList.add('scrolling-down');
        } else {
            document.body.classList.remove('not-at-top');
            document.body.classList.remove('scrolling-down');
        }
        
        // Detect scroll direction
        let currentScrollPos = window.scrollY;
        if (currentScrollPos < this.lastScrollPos) {
            document.body.classList.add('scrolling-up');
            document.body.classList.remove('scrolling-down');
        } else {
            document.body.classList.remove('scrolling-up');
            document.body.classList.add('scrolling-down');
        }
        this.lastScrollPos = currentScrollPos;
    });

    // Scroll indicator click handlers
    if (scrollDown) {
        scrollDown.addEventListener('click', function() {
            const currentSection = getCurrentSection();
            if (currentSection && currentSection.nextElementSibling) {
                currentSection.nextElementSibling.scrollIntoView({ behavior: 'smooth' });
                document.body.classList.add('scrolling-down');
                setTimeout(() => {
                    document.body.classList.remove('scrolling-down');
                }, 1000);
            }
        });
    }
    
    if (scrollUp) {
        scrollUp.addEventListener('click', function() {
            const currentSection = getCurrentSection();
            if (currentSection && currentSection.previousElementSibling) {
                currentSection.previousElementSibling.scrollIntoView({ behavior: 'smooth' });
                document.body.classList.add('scrolling-up');
                setTimeout(() => {
                    document.body.classList.remove('scrolling-up');
                }, 1000);
            }
        });
    }
    
    // Helper function to get current section in viewport
    function getCurrentSection() {
        const sections = document.querySelectorAll('section');
        let currentSection = null;
        let closestDistance = Infinity;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top);
            
            if (distance < closestDistance) {
                closestDistance = distance;
                currentSection = section;
            }
        });
        
        return currentSection;
    }
    
    // Rotating quotes functionality
    const quotes = [
        "Transforming ideas into reality",
        "Crafting digital experiences",
        "Building the future, one line at a time",
        "Where imagination meets technology",
        "Turning concepts into code",
        "Creating innovative solutions"
    ];
    
    const heroText = document.querySelector('.hero-content p');
    let currentQuoteIndex = 0;
    
    // Function to change quote with fade effect
    function rotateQuotes() {
        // Fade out
        heroText.style.opacity = '0';
        
        setTimeout(() => {
            // Move to next quote
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            // Change text
            heroText.textContent = quotes[currentQuoteIndex];
            // Fade in
            heroText.style.opacity = '1';
        }, 500); // Half a second for fade out
    }
    
    // Rotate quotes every 3 seconds
    setInterval(rotateQuotes, 3000);
});
