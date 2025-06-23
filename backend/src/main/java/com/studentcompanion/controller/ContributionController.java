package com.studentcompanion.controller;

import com.studentcompanion.model.Contribution;
import com.studentcompanion.model.User;
import com.studentcompanion.repository.ContributionRepository;
import com.studentcompanion.repository.UserRepository;
import com.studentcompanion.model.CareerGoal;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/contributions")
@CrossOrigin(origins = "*")
public class ContributionController {
@Autowired
private ContributionRepository contributionRepository;

@Autowired
private UserRepository userRepository;

// @Autowired
// private CommentRepository commentRepository;

@PostMapping("/add")
public ResponseEntity<?> addContribution(@RequestBody Contribution contribution, Authentication authentication) {
    try {
        String email = (authentication != null) ? authentication.getName() : "agrawalnidhi241@gmail.com";
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found for email: " + email);
        }

        contribution.setUser(user);
        contribution.setCreatedAt(LocalDateTime.now());

        Contribution saved = contributionRepository.save(contribution);
        return ResponseEntity.ok(saved);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.internalServerError().body("❌ Server Error: " + e.getMessage());
    }
}

@GetMapping("/my")
public ResponseEntity<?> getUserContributions(Authentication authentication) {
    try {
        String email = (authentication != null) ? authentication.getName() : "agrawalnidhi241@gmail.com";
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        List<Contribution> list = contributionRepository.findByUser(user);
        return ResponseEntity.ok(list);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.internalServerError().body("❌ Failed to fetch contributions: " + e.getMessage());
    }
}

@GetMapping("/{id}/upvotes")
public ResponseEntity<?> getUpvotes(@PathVariable Long id) {
Contribution c = contributionRepository.findById(id).orElseThrow();
return ResponseEntity.ok(c.getUpvotes());
}

@GetMapping("/{id}/downvotes")
public ResponseEntity<?> getDownvotes(@PathVariable Long id) {
Contribution c = contributionRepository.findById(id).orElseThrow();
return ResponseEntity.ok(c.getDownvotes());
}

@GetMapping("/{id}/bookmarks")
public ResponseEntity<?> getBookmarks(@PathVariable Long id) {
Contribution c = contributionRepository.findById(id).orElseThrow();
return ResponseEntity.ok(c.getBookmarks());
}


}