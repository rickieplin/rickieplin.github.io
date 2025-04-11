/**
 * Access Control Script
 * 
 * This script prevents direct access to restricted pages via URL.
 * When a user attempts to access a restricted page, they will be redirected to the homepage.
 */

document.addEventListener("DOMContentLoaded", function() {
    // Current page path
    const currentPath = window.location.pathname;
    
    // List of restricted pages
    const restrictedPages = [
        "/project.html",  // Restricting access to project page
        "/projects.html"  // Also restrict potential alternative URL
    ];
    
    // Check if the current page is restricted
    const isRestricted = restrictedPages.some(page => {
        // Handle both absolute and relative paths
        return currentPath.endsWith(page);
    });
    
    // If the page is restricted, redirect to the homepage
    if (isRestricted) {
        console.log("Access denied: Redirecting to homepage");
        window.location.href = "index.html";
    }
}); 