/**
 * Project page functionality
 * Handles filtering of project cards based on category
 */
document.addEventListener("DOMContentLoaded", function() {
    // Get all filter buttons and project cards
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    
    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            
            // Add active class to clicked button
            this.classList.add("active");
            
            // Get filter value
            const filterValue = this.getAttribute("data-filter");
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === "all") {
                    card.style.display = "block";
                } else {
                    if (card.getAttribute("data-category") === filterValue) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }
                }
            });
        });
    });
    
    // Add animation to project cards
    projectCards.forEach(card => {
        card.addEventListener("mouseenter", function() {
            this.querySelector(".project-overlay").style.opacity = "1";
        });
        
        card.addEventListener("mouseleave", function() {
            this.querySelector(".project-overlay").style.opacity = "0";
        });
    });
}); 