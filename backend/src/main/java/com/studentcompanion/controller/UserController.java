package com.studentcompanion.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.studentcompanion.model.User;
import com.studentcompanion.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") // Restrict to frontend
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // 🔓 Public or Admin: Get all users
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 🔐 Get profile of currently authenticated user
@GetMapping("/profile")
public ResponseEntity<User> getProfile(Authentication authentication) {
    String email = authentication.getName();
    User user = userRepository.findByEmail(email);
    if (user == null) {
        return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(user);
}


}
