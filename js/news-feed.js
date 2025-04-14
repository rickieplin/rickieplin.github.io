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
            title: "Google Unveils A2A Protocol for AI Agent Collaboration",
            category: "Technology",
            date: "April 9, 2025",
            summary: "Google introduced Agent2Agent (A2A), a new open protocol designed to enable seamless communication between AI agents across platforms. Supported by over 50 tech partners, A2A aims to standardize agent interactions.",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%234361ee'/%3E%3Ctext x='400' y='225' font-family='Arial' font-size='32' fill='white' text-anchor='middle' dominant-baseline='middle'%3EAI Collaboration%3C/text%3E%3C/svg%3E",
            link: "https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/"
        },
        {
            title: "OpenAI's GPT-4o Enhances Image Creation for All Users",
            category: "AI",
            date: "March 25, 2025",
            summary: "OpenAI's GPT-4o now powers native image generation in ChatGPT, offering context-aware visuals and conversational editing. Available to all users, it's popular for creating Studio Ghibli-style art.",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%234361ee'/%3E%3Ctext x='400' y='225' font-family='Arial' font-size='32' fill='white' text-anchor='middle' dominant-baseline='middle'%3EGPT-4o%3C/text%3E%3C/svg%3E",
            link: "https://openai.com/index/introducing-4o-image-generation/"
        },
        {
            title: "Introducing the Model Context Protocol",
            category: "Technology",
            date: "November 25, 2024",
            summary: "Anthropic introduces the Model Context Protocol, a new open standard for AI model interoperability, enabling developers to build more flexible and powerful applications.",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%234361ee'/%3E%3Ctext x='400' y='225' font-family='Arial' font-size='32' fill='white' text-anchor='middle' dominant-baseline='middle'%3EModel Context Protocol%3C/text%3E%3C/svg%3E",
            link: "https://www.anthropic.com/news/model-context-protocol"
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
            name: "Workout",
            icon: "fa-dumbbell",
            description: "Maintaining physical fitness through regular strength training and cardio exercises."
        },
        {
            name: "Coding",
            icon: "fa-code",
            description: "Building personal projects and exploring new programming languages and frameworks."
        },
        {
            name: "FPS Games",
            icon: "fa-gamepad",
            description: "Enjoying competitive first-person shooter games to unwind and sharpen reflexes."
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