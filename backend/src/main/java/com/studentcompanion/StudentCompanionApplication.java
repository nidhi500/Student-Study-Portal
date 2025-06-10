package com.studentcompanion;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StudentCompanionApplication {
    public static void main(String[] args) {
        System.out.println("Loading Spring Boot app...");
        SpringApplication.run(StudentCompanionApplication.class, args);
    }
}