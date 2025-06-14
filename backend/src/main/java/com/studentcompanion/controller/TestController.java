package com.studentcompanion.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
public class TestController {

    // Accessible to any authenticated user
    @GetMapping("/hello")
    public String sayHello() {
        return "✅ Hello, authenticated user!";
    }

    // Accessible only to ROLE_ADMIN
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminOnly() {
        return "🛡️ Hello, Admin!";
    }
}