// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
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

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// GitHub API Integration (Optional - can fetch live data)
async function fetchGitHubStats() {
    try {
        // Note: GitHub API has rate limits for unauthenticated requests
        // For production, consider using a proxy or GitHub token
        const response = await fetch('https://api.github.com/users/emms204');
        if (response.ok) {
            const data = await response.json();
            
            // Update stats if elements exist
            const repoCountEl = document.getElementById('repo-count');
            const starCountEl = document.getElementById('star-count');
            
            if (repoCountEl && data.public_repos) {
                repoCountEl.textContent = data.public_repos;
            }
            
            // Note: Getting total stars requires additional API calls
            // This is a simplified version
        }
    } catch (error) {
        console.log('GitHub API fetch failed (this is okay for static sites):', error);
        // Silently fail - the static numbers in HTML will be used
    }
}

// Skills single source of truth (used in Portfolio Overview and Skills section)
const SKILL_GROUPS = [
    {
        title: 'ML/AI Frameworks',
        icon: 'fa-brain',
        items: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'HuggingFace']
    },
    {
        title: 'AI Orchestration',
        icon: 'fa-network-wired',
        items: ['LangGraph', 'CrewAI', 'SmolAgents', 'LangChain', 'LlamaIndex', 'FAISS', 'Pinecone']
    },
    {
        title: 'Infrastructure & MLOps',
        icon: 'fa-server',
        items: [
            'AWS (EC2, EKS, Lambda, S3)',
            'Kubernetes',
            'Airflow',
            'Kubeflow',
            'SageMaker',
            'CI/CD (Jenkins, Ansible)'
        ]
    },
    {
        title: 'Languages',
        icon: 'fa-code',
        items: ['Python', 'SQL', 'TypeScript', 'Bash', 'React', 'JavaScript']
    }
];

function renderSkills() {
    const skillsGrid = document.getElementById('skills-grid');

    if (skillsGrid) {
        skillsGrid.innerHTML = '';
        SKILL_GROUPS.forEach(group => {
            const card = document.createElement('div');
            card.className = 'skill-category';

            const heading = document.createElement('h3');
            heading.className = 'skill-category-title';
            heading.innerHTML = `<i class="fas ${group.icon}"></i> ${group.title}`;

            const tags = document.createElement('div');
            tags.className = 'skill-tags';
            group.items.forEach(item => {
                const tag = document.createElement('span');
                tag.className = 'skill-tag';
                tag.textContent = item;
                tags.appendChild(tag);
            });

            card.append(heading, tags);
            skillsGrid.appendChild(card);
        });
    }
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Category Filter Functionality
function initCategoryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const categorySections = document.querySelectorAll('.category-section');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter projects
            if (filter === 'all') {
                // Show all
                categorySections.forEach(section => {
                    section.style.display = 'block';
                });
                projectCards.forEach(card => {
                    card.classList.remove('hidden');
                });
            } else {
                // Hide all first
                categorySections.forEach(section => {
                    section.style.display = 'none';
                });
                projectCards.forEach(card => {
                    card.classList.add('hidden');
                });

                // Show matching category
                const targetSection = document.getElementById(`category-${filter}`);
                if (targetSection) {
                    targetSection.style.display = 'block';
                    const cardsInSection = targetSection.querySelectorAll('.project-card');
                    cardsInSection.forEach(card => {
                        card.classList.remove('hidden');
                    });
                }
            }

            // Re-trigger animations for visible cards
            setTimeout(() => {
                document.querySelectorAll('.project-card:not(.hidden)').forEach(card => {
                    observer.observe(card);
                });
            }, 100);
        });
    });
}

// Observe project cards and skill categories
document.addEventListener('DOMContentLoaded', () => {
    // Render skills in both overview and skills section
    renderSkills();

    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .insight-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Initialize category filter
    initCategoryFilter();

    // Try to fetch GitHub stats (optional)
    fetchGitHubStats();
});

// Add parallax effect to hero section (only when hero is in view)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroHeight = hero.offsetHeight;
        const heroTop = hero.offsetTop;
        
        // Only apply parallax when hero is in viewport
        if (scrolled < heroHeight + heroTop) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        } else {
            // Reset transform when scrolled past hero to prevent overlap
            hero.style.transform = 'translateY(0)';
        }
    }
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Console message
console.log('%c👋 Hello! Thanks for checking out my portfolio!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%c🔗 GitHub: https://github.com/emms204', 'color: #8b5cf6; font-size: 12px;');
