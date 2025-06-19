package com.studentcompanion;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

// Main application class for the Student Companion backend
@EnableJpaAuditing
@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.studentcompanion.repository")
public class StudentCompanionApplication {
    public static void main(String[] args) {
        System.out.println("Loading Spring Boot app...");
        SpringApplication.run(StudentCompanionApplication.class, args);
    }
}