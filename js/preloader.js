/**
 * Optimized Minecraft-style preloader with performance improvements
 * Features requestAnimationFrame for smooth animations and better error handling
 */
(function() {
    'use strict';
    
    // Performance optimization: Cache DOM queries
    const elements = {
        preloader: null,
        progressBlocksContainer: null,
        percentageText: null,
        welcomeMessage: null,
        blocks: []
    };
    
    // Configuration
    const config = {
        totalBlocks: 20,
        loadingSpeed: 16, // ms per frame (60fps)
        incrementRange: { min: 2, max: 5 },
        soundEnabled: true,
        maxLoadTime: 3000
    };
    
    // Audio context (reused for performance)
    let audioContext = null;
    
    // Initialize audio context lazily
    function getAudioContext() {
        if (!audioContext && config.soundEnabled) {
            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                config.soundEnabled = false;
                console.warn('Audio context not available');
            }
        }
        return audioContext;
    }
    
    // Optimized block sound effect
    function playBlockSound() {
        if (!config.soundEnabled) return;
        
        const context = getAudioContext();
        if (!context) return;
        
        try {
            const oscillator = context.createOscillator();
            const gainNode = context.createGain();
            
            oscillator.type = 'square';
            oscillator.frequency.value = 150 + Math.random() * 100;
            oscillator.connect(gainNode);
            gainNode.connect(context.destination);
            
            gainNode.gain.setValueAtTime(0.1, context.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
            
            oscillator.start();
            oscillator.stop(context.currentTime + 0.1);
        } catch (e) {
            // Silently fail
        }
    }
    
    // Play completion melody
    function playCompletionSound() {
        if (!config.soundEnabled) return;
        
        const context = getAudioContext();
        if (!context) return;
        
        try {
            const notes = [440, 523.25, 659.25]; // A4, C5, E5
            const duration = 0.2;
            
            notes.forEach((freq, index) => {
                const oscillator = context.createOscillator();
                const gainNode = context.createGain();
                
                oscillator.type = 'sine';
                oscillator.frequency.value = freq;
                oscillator.connect(gainNode);
                gainNode.connect(context.destination);
                
                const startTime = context.currentTime + (index * duration);
                gainNode.gain.setValueAtTime(0, startTime);
                gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
                
                oscillator.start(startTime);
                oscillator.stop(startTime + duration);
            });
        } catch (e) {
            // Silently fail
        }
    }
    
    // Create progress blocks
    function createBlocks() {
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < config.totalBlocks; i++) {
            const block = document.createElement('div');
            block.className = 'progress-block';
            fragment.appendChild(block);
            elements.blocks.push(block);
        }
        
        elements.progressBlocksContainer.appendChild(fragment);
    }
    
    // Animate block activation
    function activateBlock(index) {
        if (index < elements.blocks.length && !elements.blocks[index].classList.contains('active')) {
            elements.blocks[index].classList.add('active');
            playBlockSound();
        }
    }
    
    // Hide preloader with animation
    function hidePreloader() {
        elements.preloader.classList.add('hidden');
        localStorage.setItem('hasVisitedBefore', 'true');
        
        // Clean up audio context
        if (audioContext && audioContext.state !== 'closed') {
            audioContext.close();
        }
    }
    
    // Main loading animation using requestAnimationFrame
    function animateLoading() {
        let loadingPercentage = 0;
        let lastBlockIndex = -1;
        let lastTime = performance.now();
        let frameCount = 0;
        
        function animate(currentTime) {
            const deltaTime = currentTime - lastTime;
            
            // Only update every few frames for performance
            if (deltaTime >= config.loadingSpeed) {
                frameCount++;
                
                // Increment loading percentage
                const increment = config.incrementRange.min + 
                    Math.random() * (config.incrementRange.max - config.incrementRange.min);
                loadingPercentage = Math.min(100, loadingPercentage + increment);
                
                // Update percentage text
                if (elements.percentageText) {
                    elements.percentageText.textContent = `${Math.floor(loadingPercentage)}%`;
                }
                
                // Calculate active blocks
                const targetBlockIndex = Math.floor((loadingPercentage / 100) * config.totalBlocks);
                
                // Activate new blocks
                for (let i = lastBlockIndex + 1; i <= targetBlockIndex && i < config.totalBlocks; i++) {
                    setTimeout(() => activateBlock(i), (i - lastBlockIndex - 1) * 50);
                }
                lastBlockIndex = targetBlockIndex;
                
                lastTime = currentTime;
            }
            
            // Continue animation or complete
            if (loadingPercentage < 100) {
                requestAnimationFrame(animate);
            } else {
                completeLoading();
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Complete loading sequence
    function completeLoading() {
        // Show welcome message
        if (elements.welcomeMessage) {
            elements.welcomeMessage.classList.add('visible');
        }
        
        // Play completion sound
        playCompletionSound();
        
        // Hide preloader after delay
        setTimeout(hidePreloader, 1500);
    }
    
    // Force complete loading (fallback)
    function forceComplete() {
        elements.blocks.forEach(block => block.classList.add('active'));
        
        if (elements.percentageText) {
            elements.percentageText.textContent = '100%';
        }
        
        if (elements.welcomeMessage) {
            elements.welcomeMessage.classList.add('visible');
        }
        
        setTimeout(hidePreloader, 1000);
    }
    
    // Initialize preloader
    function init() {
        // Cache DOM elements
        elements.preloader = document.querySelector('.preloader');
        if (!elements.preloader) return;
        
        // Check if user has visited before
        if (localStorage.getItem('hasVisitedBefore')) {
            elements.preloader.style.display = 'none';
            return;
        }
        
        elements.progressBlocksContainer = document.querySelector('.progress-blocks-container');
        elements.percentageText = document.querySelector('.loader-percentage');
        elements.welcomeMessage = document.querySelector('.welcome-message');
        
        if (!elements.progressBlocksContainer) return;
        
        // Create blocks and start animation
        createBlocks();
        animateLoading();
        
        // Fallback timeout
        setTimeout(() => {
            if (elements.preloader && !elements.preloader.classList.contains('hidden')) {
                forceComplete();
            }
        }, config.maxLoadTime);
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Ensure preloader is hidden when everything is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (elements.preloader && !elements.preloader.classList.contains('hidden')) {
                forceComplete();
            }
        }, 100);
    });
    
    // Expose reset function globally
    window.resetPreloader = function() {
        localStorage.removeItem('hasVisitedBefore');
        console.log('Preloader has been reset. Refresh the page to see the preloader again.');
    };
})();