/**
 * Minecraft-style preloader functionality for Lin Pei's portfolio website
 * Controls the loading animation, block-based progress bar, and welcome message
 * Only shows on the first visit to the home page
 */
document.addEventListener("DOMContentLoaded", function() {
    // Get preloader elements
    const preloader = document.querySelector(".preloader");
    const progressBlocksContainer = document.querySelector(".progress-blocks-container");
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
    
    // Create blocks for the progress bar
    const totalBlocks = 20;
    const blocks = [];
    
    // Create the initial blocks
    for (let i = 0; i < totalBlocks; i++) {
        const block = document.createElement("div");
        block.className = "progress-block";
        progressBlocksContainer.appendChild(block);
        blocks.push(block);
    }
    
    // Play a "block place" sound effect
    const playBlockSound = function() {
        // Create a simple beep sound
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        oscillator.type = "square";
        oscillator.frequency.value = 150 + Math.random() * 100;
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        gainNode.gain.value = 0.1;
        oscillator.start();
        setTimeout(function() {
            oscillator.stop();
        }, 100);
    };
    
    // Set initial percentage
    let loadingPercentage = 0;
    let lastBlockIndex = -1;
    
    // Simulate loading progress
    const interval = setInterval(function() {
        // Increment loading percentage
        loadingPercentage += Math.floor(Math.random() * 3) + 1;
        
        // Ensure we don't exceed 100%
        if (loadingPercentage > 100) {
            loadingPercentage = 100;
            clearInterval(interval);
            
            // Show welcome message when loading reaches 100%
            if (welcomeMessage) {
                welcomeMessage.classList.add("visible");
                
                // Play a special completion sound
                try {
                    const context = new (window.AudioContext || window.webkitAudioContext)();
                    const oscillator = context.createOscillator();
                    const gainNode = context.createGain();
                    
                    oscillator.type = "sine";
                    oscillator.frequency.value = 440;
                    oscillator.connect(gainNode);
                    gainNode.connect(context.destination);
                    
                    gainNode.gain.value = 0.2;
                    oscillator.start();
                    
                    // Play a little melody
                    setTimeout(() => { oscillator.frequency.value = 523.25; }, 200);
                    setTimeout(() => { oscillator.frequency.value = 659.25; }, 400);
                    setTimeout(() => {
                        oscillator.stop();
                    }, 600);
                } catch (e) {
                    console.error("Could not play audio", e);
                }
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
        
        // Calculate which blocks should be active
        const activeBlockIndex = Math.floor(loadingPercentage / 100 * totalBlocks);
        
        // Activate blocks if needed
        if (activeBlockIndex > lastBlockIndex) {
            for (let i = lastBlockIndex + 1; i <= activeBlockIndex; i++) {
                if (i < blocks.length) {
                    setTimeout(function() {
                        blocks[i].classList.add("active");
                        try {
                            playBlockSound();
                        } catch (e) {
                            console.error("Could not play audio", e);
                        }
                    }, (i - lastBlockIndex - 1) * 100);
                }
            }
            lastBlockIndex = activeBlockIndex;
        }
        
        // Update percentage text
        if (percentageText) {
            percentageText.textContent = `${loadingPercentage}%`;
        }
    }, 200);
    
    // Fallback to ensure preloader is hidden even if loading simulation fails
    window.addEventListener("load", function() {
        setTimeout(function() {
            if (preloader && !preloader.classList.contains("hidden")) {
                // Force complete loading
                blocks.forEach(block => block.classList.add("active"));
                
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