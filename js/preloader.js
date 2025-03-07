/**
 * Preloader functionality for Lin Pei's portfolio website
 * Controls the loading animation, progress bar, and welcome message
 * Only shows on the first visit to the home page
 */
document.addEventListener("DOMContentLoaded", function() {
    // Get preloader elements
    const preloader = document.querySelector(".preloader");
    const progressBar = document.querySelector(".progress");
    const percentageText = document.querySelector(".loader-percentage");
    const welcomeMessage = document.querySelector(".welcome-message");
    
    // Check if this is the first visit
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
    
    // If user has visited before, hide preloader immediately
    if (hasVisitedBefore) {
        if (preloader) {
            preloader.style.display = "none";
        }
        return; // Exit the function early
    }
    
    // Set initial percentage
    let loadingPercentage = 0;
    
    // Simulate loading progress
    const interval = setInterval(function() {
        // Increment loading percentage
        loadingPercentage += Math.floor(Math.random() * 5) + 1;
        
        // Ensure we don't exceed 100%
        if (loadingPercentage > 100) {
            loadingPercentage = 100;
            clearInterval(interval);
            
            // Show welcome message when loading reaches 100%
            if (welcomeMessage) {
                welcomeMessage.classList.add("visible");
            }
            
            // Hide preloader after a delay
            setTimeout(function() {
                if (preloader) {
                    preloader.classList.add("hidden");
                    
                    // Set localStorage to indicate user has visited before
                    localStorage.setItem("hasVisitedBefore", "true");
                }
            }, 1500);
        }
        
        // Update progress bar and percentage text
        if (progressBar) {
            progressBar.style.width = `${loadingPercentage}%`;
        }
        
        if (percentageText) {
            percentageText.textContent = `${loadingPercentage}%`;
        }
    }, 100);
    
    // Fallback to ensure preloader is hidden even if loading simulation fails
    window.addEventListener("load", function() {
        setTimeout(function() {
            if (preloader && !preloader.classList.contains("hidden")) {
                // Force complete loading
                if (progressBar) {
                    progressBar.style.width = "100%";
                }
                
                if (percentageText) {
                    percentageText.textContent = "100%";
                }
                
                if (welcomeMessage) {
                    welcomeMessage.classList.add("visible");
                }
                
                // Hide preloader
                setTimeout(function() {
                    preloader.classList.add("hidden");
                    
                    // Set localStorage to indicate user has visited before
                    localStorage.setItem("hasVisitedBefore", "true");
                }, 1000);
            }
        }, 3000); // Maximum wait time of 3 seconds
    });
});

/**
 * Utility function to reset the preloader for testing purposes
 * Can be called from the browser console: resetPreloader()
 */
function resetPreloader() {
    localStorage.removeItem("hasVisitedBefore");
    console.log("Preloader has been reset. Refresh the page to see the preloader again.");
} 