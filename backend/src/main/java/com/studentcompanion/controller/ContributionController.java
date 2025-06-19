package com.studentcompanion.controller;

import com.studentcompanion.model.Contribution;
import com.studentcompanion.model.User;
import com.studentcompanion.repository.ContributionRepository;
import com.studentcompanion.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/contributions")
@CrossOrigin(origins = "*")
public class ContributionController{
@Autowired
private ContributionRepository contributionRepository;

@Autowired
private UserRepository userRepository;

private final String uploadDir = "uploads/";

@PostMapping(value = "/add", consumes = "multipart/form-data")
public ResponseEntity<?> addContribution(
        @RequestParam("title") String title,
        @RequestParam("description") String description,
        @RequestParam("type") String type,
        @RequestParam("subject") String subject,
        @RequestParam("visibility") String visibility,
        @RequestParam(value = "url", required = false) String url,
        @RequestParam(value = "file", required = false) MultipartFile file,
        Authentication authentication
) {
    try {
        System.out.println("📥 Title: " + title);
        System.out.println("📥 File: " + (file != null ? file.getOriginalFilename() : "null"));

        String email = (authentication != null) ? authentication.getName() : "test@example.com";
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found for email: " + email);
        }

        Contribution contribution = new Contribution();
        contribution.setTitle(title);
        contribution.setDescription(description);
        contribution.setType(type);
        contribution.setSubject(subject);
        contribution.setVisibility(visibility);
        contribution.setUser(user);
        contribution.setCreatedAt(LocalDateTime.now());

        // File upload handling
        if (file != null && !file.isEmpty()) {
            File folder = new File(uploadDir);
            if (!folder.exists()) {
                folder.mkdirs();
            }

            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            File destination = new File(folder, filename);
            file.transferTo(destination);
            contribution.setFilePath(destination.getPath());

            System.out.println("✅ File saved at: " + destination.getPath());
        } else if (url != null && !url.isEmpty()) {
            contribution.setUrl(url);
        }

        Contribution saved = contributionRepository.save(contribution);
        return ResponseEntity.ok(saved);

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.internalServerError().body("❌ Error: " + e.getMessage());
    }
}

@GetMapping("/my")
public ResponseEntity<?> getUserContributions(Authentication authentication) {
    try {
        String email = (authentication != null) ? authentication.getName() : "test@example.com";
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        List<Contribution> list = contributionRepository.findByUser(user);
        return ResponseEntity.ok(list);
    } catch (Exception e) {
        return ResponseEntity.internalServerError().body("❌ Failed to fetch contributions: " + e.getMessage());
    }
}
}