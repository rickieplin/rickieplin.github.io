/**
 * Contact form functionality
 * Handles form submission and validation
 */
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            // Get form values
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const subject = document.getElementById("subject").value;
            const message = document.getElementById("message").value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert("Please fill in all fields");
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address");
                return;
            }
            
            // In a real implementation, you would send the form data to a server
            // For this demo, we'll just show a success message
            alert("Thank you for your message! I'll get back to you soon.");
            
            // Reset the form
            contactForm.reset();
        });
    }
    
    // Add animation to form inputs
    const formInputs = document.querySelectorAll("input, textarea");
    
    formInputs.forEach(input => {
        input.addEventListener("focus", function() {
            this.parentElement.classList.add("focused");
        });
        
        input.addEventListener("blur", function() {
            if (this.value === "") {
                this.parentElement.classList.remove("focused");
            }
        });
    });
}); 