package com.studentcompanion.controller;

import com.studentcompanion.dto.AuthRequest;
import com.studentcompanion.dto.AuthResponse;
import com.studentcompanion.model.User;
import com.studentcompanion.repository.UserRepository;
import com.studentcompanion.service.CustomUserDetailsService;
import com.studentcompanion.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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
            throw new Exception("Invalid credentials", e);
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
        
        // Check if user already exists
        if (userRepository.findByEmail(user.getEmail()) != null) {
            System.out.println("Email already exists: " + user.getEmail());
            return ResponseEntity.badRequest().body("Email already exists!");
        }

        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        // Save user
        User savedUser = userRepository.save(user);
        System.out.println("User registered successfully: " + savedUser.getName());
        
        // Generate JWT token
        final UserDetails userDetails = userDetailsService.loadUserByUsername(savedUser.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponse(jwt, savedUser.getName(), savedUser.getEmail()));
    }

    // Test endpoint to check if controller is accessible
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Auth controller is working!");
    }
}