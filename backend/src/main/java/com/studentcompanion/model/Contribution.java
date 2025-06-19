package com.studentcompanion.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "contributions")
public class Contribution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

private String title;
private String description;
private String type; // Notes, Video, Link, Drive
private String subject;
private String url;
private String visibility;

private String filePath;

private LocalDateTime createdAt = LocalDateTime.now();

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "user_id")
private User user;

// Getters & Setters...
public Long getId() { return id; }

public void setId(Long id) { this.id = id; }

public String getTitle() { return title; }

public void setTitle(String title) { this.title = title; }

public String getDescription() { return description; }

public void setDescription(String description) { this.description = description; }

public String getType() { return type; }

public void setType(String type) { this.type = type; }

public String getSubject() { return subject; }

public void setSubject(String subject) { this.subject = subject; }

public void setFilePath(String filePath) {
this.filePath = filePath;
}

public String getUrl() { return url; }

public void setUrl(String url) { this.url = url; }

public String getVisibility() { return visibility; }

public void setVisibility(String visibility) { this.visibility = visibility; }

public LocalDateTime getCreatedAt() { return createdAt; }

public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

public User getUser() { return user; }

public void setUser(User user) { this.user = user; }
}