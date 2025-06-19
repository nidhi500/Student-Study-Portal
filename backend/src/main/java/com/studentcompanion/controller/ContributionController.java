package com.studentcompanion.controller;

import com.studentcompanion.model.Contribution;
import com.studentcompanion.model.User;
import com.studentcompanion.repository.ContributionRepository;
import com.studentcompanion.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contributions")
@CrossOrigin(origins = "*")
public class ContributionController {

    @Autowired
    private ContributionRepository contributionRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ Add a new contribution for the currently authenticated user
    @PostMapping("/add")
    public ResponseEntity<Contribution> addContribution(@RequestBody Contribution contribution, Authentication authentication) {
        String email = authentication.getName();  // This comes from the JWT or session
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        contribution.setUser(user);  // Link contribution to user
        Contribution saved = contributionRepository.save(contribution);
        return ResponseEntity.ok(saved);
    }

    // ✅ Fetch all contributions for the currently authenticated user
    @GetMapping("/my")
    public List<Contribution> getUserContributions(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        return contributionRepository.findByUser(user);
    }
}
