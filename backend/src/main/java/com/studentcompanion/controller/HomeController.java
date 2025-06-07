package com.studentcompanion.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

    @GetMapping("/")
    @ResponseBody
    public String homePage() {
        return "✅ Logged in successfully! Welcome to the Student Companion Platform.";
    }
}
