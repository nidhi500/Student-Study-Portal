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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studentcompanion.dto.AuthRequest;
import com.studentcompanion.dto.AuthResponse;
import com.studentcompanion.dto.RegistrationRequest;
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

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");

    // ---------- LOGIN ----------
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
        } catch (BadCredentialsException e) {
    System.out.println("Bad credentials for: " + authRequest.getEmail());
    return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(Collections.singletonMap("message", "Invalid email or password"));
}


        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);
        User user = userRepository.findByEmail(authRequest.getEmail());

        return ResponseEntity.ok(new AuthResponse(jwt, user.getName(), user.getEmail()));
    }

    // ---------- REGISTER ----------
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistrationRequest request) {
        Map<String, String> errors = validateRegistrationInput(request);
        if (!errors.isEmpty()) {
            return ResponseEntity.badRequest().body(errors);
        }

        // Check if user already exists
        if (userRepository.findByEmail(request.getEmail()) != null) {
    System.out.println("Email already exists: " + request.getEmail());
    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(Collections.singletonMap("message", "Email already exists"));
}

        try {
            User user = new User();
            user.setName(request.getName());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));

            User savedUser = userRepository.save(user);

            UserDetails userDetails = userDetailsService.loadUserByUsername(savedUser.getEmail());
            String jwt = jwtUtil.generateToken(userDetails);

            return ResponseEntity.ok(new AuthResponse(jwt, savedUser.getName(), savedUser.getEmail()));
        } catch (Exception e) {
            System.err.println("Error during registration: " + e.getMessage());
           return ResponseEntity
    .status(HttpStatus.BAD_REQUEST)
    .body(Collections.singletonMap("message", "Email already exists"));
        }
    }

    // ---------- INPUT VALIDATION ----------
    private Map<String, String> validateRegistrationInput(RegistrationRequest request) {
        Map<String, String> errors = new HashMap<>();

        if (request.getName() == null || request.getName().trim().isEmpty()) {
            errors.put("name", "Name is required");
        } else if (request.getName().length() < 2) {
            errors.put("name", "Name must be at least 2 characters");
        }

        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            errors.put("email", "Email is required");
        } else if (!EMAIL_PATTERN.matcher(request.getEmail()).matches()) {
            errors.put("email", "Invalid email format");
        }

        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            errors.put("password", "Password is required");
        } else if (request.getPassword().length() < 6) {
            errors.put("password", "Password must be at least 6 characters");
        } else if (!isPasswordStrong(request.getPassword())) {
            errors.put("password", "Password must contain at least one letter and one number");
        }

        return errors;
    }

    private boolean isPasswordStrong(String password) {
        return password.matches(".*[a-zA-Z].*") && password.matches(".*[0-9].*");
    }

    // ---------- TEST ----------
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Auth controller is working!");
    }
}
