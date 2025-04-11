/**
 * News Feed and Personal Interests Display
 * 
 * This script handles loading and displaying news posts and personal interests/hobbies
 * on the homepage.
 */

document.addEventListener("DOMContentLoaded", function() {
    // Sample news/blog posts data
    // In a real implementation, this would be fetched from an API or CMS
    const newsPosts = [
        {
            title: "The Rise of AI in Healthcare",
            category: "Technology",
            date: "June 15, 2024",
            summary: "Artificial intelligence is revolutionizing patient care and medical diagnostics, with new breakthroughs happening every month.",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%234361ee'/%3E%3Ctext x='400' y='225' font-family='Arial' font-size='32' fill='white' text-anchor='middle' dominant-baseline='middle'%3EAI in Healthcare%3C/text%3E%3C/svg%3E",
            link: "#"
        },
        {
            title: "Machine Learning Models Predict Stock Market Trends",
            category: "Finance",
            date: "May 28, 2024",
            summary: "New research shows how advanced ML algorithms can accurately predict market movements with greater precision than traditional methods.",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%234361ee'/%3E%3Ctext x='400' y='225' font-family='Arial' font-size='32' fill='white' text-anchor='middle' dominant-baseline='middle'%3EStock Market ML%3C/text%3E%3C/svg%3E",
            link: "#"
        },
        {
            title: "Web Development Trends to Watch in 2024",
            category: "Development",
            date: "April 12, 2024",
            summary: "From WebAssembly to serverless architectures, these are the technologies shaping the future of web development.",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%234361ee'/%3E%3Ctext x='400' y='225' font-family='Arial' font-size='32' fill='white' text-anchor='middle' dominant-baseline='middle'%3EWeb Development%3C/text%3E%3C/svg%3E",
            link: "#"
        }
    ];

    // Personal interests/hobbies data
    const interests = [
        {
            name: "Photography",
            icon: "fa-camera",
            description: "Capturing urban landscapes and street photography in my spare time."
        },
        {
            name: "Chess",
            icon: "fa-chess",
            description: "Strategic thinking and problem-solving through competitive chess games."
        },
        {
            name: "Hiking",
            icon: "fa-mountain",
            description: "Exploring nature trails and mountains to disconnect and recharge."
        },
        {
            name: "Cooking",
            icon: "fa-utensils",
            description: "Experimenting with fusion cuisine and perfecting traditional recipes."
        }
    ];

    // Render news posts
    function renderNewsPosts() {
        const newsContainer = document.querySelector(".news-container");
        if (!newsContainer) return;

        newsPosts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.className = "news-post";
            
            postElement.innerHTML = `
                <div class="post-image">
                    <img src="${post.image}" alt="${post.title}">
                </div>
                <div class="post-content">
                    <div class="post-meta">
                        <span class="post-category">${post.category}</span>
                        <span class="post-date">${post.date}</span>
                    </div>
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-summary">${post.summary}</p>
                    <a href="${post.link}" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            
            newsContainer.appendChild(postElement);
        });
    }

    // Render interests/hobbies
    function renderInterests() {
        const interestsContainer = document.querySelector(".interests-container");
        if (!interestsContainer) return;

        interests.forEach(interest => {
            const interestElement = document.createElement("div");
            interestElement.className = "interest-item";
            
            interestElement.innerHTML = `
                <div class="interest-icon">
                    <i class="fas ${interest.icon}"></i>
                </div>
                <div class="interest-content">
                    <h3>${interest.name}</h3>
                    <p>${interest.description}</p>
                </div>
            `;
            
            interestsContainer.appendChild(interestElement);
        });
    }

    // Initialize functions
    renderNewsPosts();
    renderInterests();

    // Add animation for elements when they come into view
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-in");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        // Observe news posts and interests
        document.querySelectorAll(".news-post, .interest-item").forEach(item => {
            observer.observe(item);
        });
    }
}); 