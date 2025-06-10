package com.studentcompanion.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

    // Home page - shows different content based on authentication status
    @GetMapping("/")
    @ResponseBody
    public String homePage() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        // Check if user is authenticated (not anonymous)
        if (authentication != null && authentication.isAuthenticated() 
            && !authentication.getName().equals("anonymousUser")) {
            return "✅ Logged in successfully! Welcome to the Student Companion Platform, " + authentication.getName() + "!";
        } else {
            return """
                🏠 Welcome to Student Companion Platform
                
                📋 To login: POST to /api/auth/login with email and password
                📝 To register: POST to /api/auth/register with name, email and password
                
                Public pages:
                • /login - Login page
                • /register - Registration page
                • /api/auth/test - Test endpoint
                """;
        }
    }

    // Public login page - no authentication required
    @GetMapping("/login")
    @ResponseBody
    public String loginPage() {
        return """
            📋 Login to Student Companion Platform
            
            Send POST request to: /api/auth/login
            
            Request body:
            {
                "email": "your.email@example.com",
                "password": "yourpassword"
            }
            
            You'll receive a JWT token in response.
            """;
    }

    // Public registration page - no authentication required  
    @GetMapping("/register")
    @ResponseBody
    public String registerPage() {
        return """
            📝 Register for Student Companion Platform
            
            Send POST request to: /api/auth/register
            
            Request body:
            {
                "name": "Your Name",
                "email": "your.email@example.com",
                "password": "yourpassword"
            }
            
            You'll receive a JWT token in response.
            """;
    }
}