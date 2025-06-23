package com.studentcompanion.model;

import jakarta.persistence.*;

@Entity
public class StriverTopic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String topic;

    private String link;

    private boolean attempted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // --- Getters and Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }

    public boolean isAttempted() { return attempted; }
    public void setAttempted(boolean attempted) { this.attempted = attempted; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
