package com.studentcompanion.controller;

import com.studentcompanion.dto.QuizSubmissionDTO;
import com.studentcompanion.model.CareerGoal;
import com.studentcompanion.model.QuizQuestion;
import com.studentcompanion.model.StriverTopic;
import com.studentcompanion.model.User;
import com.studentcompanion.repository.QuizQuestionRepository;
import com.studentcompanion.repository.StriverTopicRepository;
import com.studentcompanion.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.concurrent.atomic.AtomicInteger;

import java.util.*;

@RestController
@RequestMapping("/api/career")
@CrossOrigin(origins = "*")
public class CareerController {

    @Autowired private QuizQuestionRepository quizQuestionRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private StriverTopicRepository striverTopicRepository;


    // 🧠 Get placement preparation progress (Striver sheet) for user
    @GetMapping("/placement/progress")
    public ResponseEntity<?> getStriverProgress(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName());

        if (user == null) {
            return ResponseEntity.status(401).body(Collections.singletonMap("error", "User not found"));
        }

        List<StriverTopic> topics = striverTopicRepository.findByUser(user);
        if (topics.isEmpty()) {
            List<StriverTopic> defaultTopics = getDefaultStriverTopics(user);
            striverTopicRepository.saveAll(defaultTopics);
            return ResponseEntity.ok(defaultTopics);
        }

        return ResponseEntity.ok(topics);
    }

    // ✅ Mark Striver topic as attempted
    @PostMapping("/placement/attempt")
    public ResponseEntity<?> markTopicAsAttempted(@RequestBody Map<String, String> payload, Authentication authentication) {
        String topic = payload.get("topic");
        String link = payload.get("link");

        if (topic == null || topic.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Topic is required"));
        }

        User user = userRepository.findByEmail(authentication.getName());

        if (user == null) {
            return ResponseEntity.status(401).body(Collections.singletonMap("error", "User not found"));
        }

        Optional<StriverTopic> existing = striverTopicRepository.findByUserAndTopic(user, topic);

        StriverTopic st = existing.orElse(new StriverTopic());
        st.setUser(user);
        st.setTopic(topic);
        st.setLink(link);
        st.setAttempted(true);

        striverTopicRepository.save(st);
        return ResponseEntity.ok().build();
    }

    // 🎯 Get current user's career goal
    @GetMapping("/goal")
    public ResponseEntity<Map<String, String>> getUserGoal(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName());
        String goal = (user != null && user.getGoal() != null) ? user.getGoal().name() : "NOT_SET";
        return ResponseEntity.ok(Collections.singletonMap("goal", goal));
    }

    // 🔧 Helper to return a default list of placement topics
    private List<StriverTopic> getDefaultStriverTopics(User user) {
        return List.of(
                createTopic(user, "Arrays - Easy", "https://leetcode.com/tag/array/"),
                createTopic(user, "Two Pointers", "https://leetcode.com/tag/two-pointers/"),
                createTopic(user, "Binary Search", "https://leetcode.com/tag/binary-search/"),
                createTopic(user, "Sliding Window", "https://leetcode.com/tag/sliding-window/"),
                createTopic(user, "Linked List", "https://leetcode.com/tag/linked-list/"),
                createTopic(user, "Stacks", "https://leetcode.com/tag/stack/"),
                createTopic(user, "Queues", "https://leetcode.com/tag/queue/"),
                createTopic(user, "Trees", "https://leetcode.com/tag/tree/"),
                createTopic(user, "Graphs", "https://leetcode.com/tag/graph/")
        );
    }

    private StriverTopic createTopic(User user, String topic, String link) {
        StriverTopic st = new StriverTopic();
        st.setUser(user);
        st.setTopic(topic);
        st.setLink(link);
        st.setAttempted(false);
        return st;
    }
}
