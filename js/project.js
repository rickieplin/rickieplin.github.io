/**
 * Modern Project page functionality
 * Handles filtering of project cards with animations and intersection observer for reveal effects
 */
document.addEventListener("DOMContentLoaded", function() {
    // Get all filter buttons and project cards
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    
    // Make sure all project cards are visible initially
    projectCards.forEach(card => {
        card.style.display = "block";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
    });
    
    // Initialize isotope layout if available
    let iso;
    try {
        // Check if Isotope is loaded
        if (typeof Isotope !== "undefined") {
            const projectsGrid = document.querySelector(".projects-container");
            iso = new Isotope(projectsGrid, {
                itemSelector: ".project-card",
                layoutMode: "fitRows",
                transitionDuration: "0.6s",
                stagger: 30
            });
        }
    } catch (e) {
        console.log("Isotope not available, using basic filtering");
    }
    
    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            
            // Add active class to clicked button
            this.classList.add("active");
            
            // Get filter value
            const filterValue = this.getAttribute("data-filter");
            
            // Apply filtering with animation
            if (iso) {
                // Use Isotope if available
                if (filterValue === "all") {
                    iso.arrange({ filter: "*" });
                } else {
                    iso.arrange({ filter: `[data-category*="${filterValue}"]` });
                }
            } else {
                // Basic filtering with CSS animations
                projectCards.forEach(card => {
                    card.style.opacity = "0";
                    card.style.transform = "translateY(20px)";
                    
                    setTimeout(() => {
                        if (filterValue === "all") {
                            card.style.display = "block";
                            setTimeout(() => {
                                card.style.opacity = "1";
                                card.style.transform = "translateY(0)";
                            }, 50);
                        } else {
                            if (card.getAttribute("data-category").includes(filterValue)) {
                                card.style.display = "block";
                                setTimeout(() => {
                                    card.style.opacity = "1";
                                    card.style.transform = "translateY(0)";
                                }, 50);
                            } else {
                                card.style.display = "none";
                            }
                        }
                    }, 300);
                });
            }
        });
    });
    
    // Set up project cards with transition styles
    projectCards.forEach(card => {
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        
        // Add hover interactions
        card.addEventListener("mouseenter", function() {
            this.querySelector(".project-overlay").style.opacity = "1";
        });
        
        card.addEventListener("mouseleave", function() {
            this.querySelector(".project-overlay").style.opacity = "0";
        });
    });
    
    // Optional: Implement a simpler animation that doesn't hide content initially
    if ("IntersectionObserver" in window) {
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("has-animated");
                    projectObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });
        
        // Add the animation class but keep cards visible
        projectCards.forEach(card => {
            card.classList.add("project-animation");
            projectObserver.observe(card);
        });
        
        // Add CSS for the animation
        const style = document.createElement("style");
        style.textContent = `
            .project-animation {
                transition: transform 0.8s ease, box-shadow 0.8s ease;
            }
            .project-animation.has-animated {
                transform: translateY(-5px);
                box-shadow: var(--shadow-md);
            }
        `;
        document.head.appendChild(style);
    }
}); 