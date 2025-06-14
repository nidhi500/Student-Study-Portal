package com.studentcompanion.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;
import java.util.Collections;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studentcompanion.dto.AuthRequest;
import com.studentcompanion.dto.AuthResponse;
import com.studentcompanion.model.User;
import com.studentcompanion.repository.UserRepository;
import com.studentcompanion.service.CustomUserDetailsService;
import com.studentcompanion.util.JwtUtil;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Email validation pattern
    private static final Pattern EMAIL_PATTERN = 
        Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) throws Exception {
        System.out.println("Login attempt for email: " + authRequest.getEmail());
        
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getEmail(), 
                            authRequest.getPassword()
                    )
            );
            System.out.println("Authentication successful for: " + authRequest.getEmail());
        } catch (BadCredentialsException e) {
    System.out.println("Bad credentials for: " + authRequest.getEmail());
    return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(Collections.singletonMap("message", "Invalid email or password"));
}


        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);
        
        User user = userRepository.findByEmail(authRequest.getEmail());
        System.out.println("Login successful, returning token for: " + user.getName());

        return ResponseEntity.ok(new AuthResponse(jwt, user.getName(), user.getEmail()));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        System.out.println("Registration attempt for email: " + user.getEmail());
        
        // Validate input
        Map<String, String> validationErrors = validateRegistrationInput(user);
        if (!validationErrors.isEmpty()) {
            System.out.println("Validation errors for registration: " + validationErrors);
            return ResponseEntity.badRequest().body(validationErrors);
        }

        // Check if user already exists
        if (userRepository.findByEmail(user.getEmail()) != null) {
    System.out.println("Email already exists: " + user.getEmail());
    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(Collections.singletonMap("message", "Email already exists"));
}

        try {
            // Encode password
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            
            // Save user
            User savedUser = userRepository.save(user);
            System.out.println("User registered successfully: " + savedUser.getName());
            
            // Generate JWT token for immediate login
            final UserDetails userDetails = userDetailsService.loadUserByUsername(savedUser.getEmail());
            final String jwt = jwtUtil.generateToken(userDetails);

            return ResponseEntity.ok(new AuthResponse(jwt, savedUser.getName(), savedUser.getEmail()));
            
        } catch (Exception e) {
            System.err.println("Error during registration: " + e.getMessage());
           return ResponseEntity
    .status(HttpStatus.BAD_REQUEST)
    .body(Collections.singletonMap("message", "Email already exists"));
        }
    }

    /**
     * Validates registration input data
     * @param user User object to validate
     * @return Map of field errors (empty if valid)
     */
    private Map<String, String> validateRegistrationInput(User user) {
        Map<String, String> errors = new HashMap<>();

        // Validate name
        if (user.getName() == null || user.getName().trim().isEmpty()) {
            errors.put("name", "Name is required");
        } else if (user.getName().trim().length() < 2) {
            errors.put("name", "Name must be at least 2 characters long");
        } else if (user.getName().trim().length() > 50) {
            errors.put("name", "Name must be less than 50 characters");
        }

        // Validate email
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            errors.put("email", "Email is required");
        } else if (!EMAIL_PATTERN.matcher(user.getEmail().trim()).matches()) {
            errors.put("email", "Please enter a valid email address");
        } else if (user.getEmail().trim().length() > 100) {
            errors.put("email", "Email must be less than 100 characters");
        }

        // Validate password
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            errors.put("password", "Password is required");
        } else if (user.getPassword().length() < 6) {
            errors.put("password", "Password must be at least 6 characters long");
        } else if (user.getPassword().length() > 100) {
            errors.put("password", "Password must be less than 100 characters");
        } else if (!isPasswordStrong(user.getPassword())) {
            errors.put("password", "Password must contain at least one letter and one number");
        }

        return errors;
    }

    /**
     * Checks if password meets strength requirements
     * @param password Password to check
     * @return true if password is strong enough
     */
    private boolean isPasswordStrong(String password) {
        // At least one letter and one number
        boolean hasLetter = password.matches(".*[a-zA-Z].*");
        boolean hasNumber = password.matches(".*[0-9].*");
        return hasLetter && hasNumber;
    }

    // Test endpoint to check if controller is accessible
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Auth controller is working!");
    }
}