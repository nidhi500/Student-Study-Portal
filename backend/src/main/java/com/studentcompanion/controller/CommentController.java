package com.studentcompanion.controller;
import com.studentcompanion.model.Comment;
import com.studentcompanion.model.User;
import com.studentcompanion.repository.CommentRepository;
import com.studentcompanion.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.studentcompanion.dto.CommentRequest;

import java.time.LocalDateTime;
import java.util.List;


@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "*")
public class CommentController {

    @Autowired private CommentRepository commentRepository;
    @Autowired private UserRepository userRepository;

   
    @PostMapping("/{type}/{id}")
    public ResponseEntity<?> addComment(@PathVariable String type,
                                        @PathVariable Long id,
                                        @RequestBody CommentRequest commentRequest,
                                        Authentication authentication) {

        String email = authentication.getName();
        System.out.println("🔐 Authenticated user email: " + email);
        System.out.println("📝 Incoming comment text: " + commentRequest.getCommentText());

        User user = userRepository.findByEmail(email);
        if (user == null) {
            System.out.println("❌ User not found for email: " + email);
            return ResponseEntity.status(401).body("User not found");
        }

        if (commentRequest.getCommentText() == null || commentRequest.getCommentText().trim().isEmpty()) {
            System.out.println("❌ Comment text is null or empty");
            return ResponseEntity.badRequest().body("Comment text cannot be empty");
        }

        Comment comment = new Comment();
        comment.setUser(user);
        comment.setContextType(type.toUpperCase());
        comment.setContextId(id);
        comment.setTimestamp(LocalDateTime.now());
        comment.setCommentText(commentRequest.getCommentText());

        Comment saved = commentRepository.save(comment);
        System.out.println("✅ Comment saved: ID=" + saved.getId() + " by " + user.getEmail());

        return ResponseEntity.ok(saved);
    }


    @GetMapping("/{type}/{id}")
    public ResponseEntity<?> getComments(@PathVariable String type, @PathVariable Long id) {
        return ResponseEntity.ok(commentRepository.findByContextTypeAndContextIdOrderByTimestampDesc(type.toUpperCase(), id));
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserComments(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName());
        return ResponseEntity.ok(commentRepository.findByUser(user));
    }
}
