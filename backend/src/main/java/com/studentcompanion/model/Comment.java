package com.studentcompanion.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
public class Comment {
    @Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

@Column(length = 1000)
private String content;

private LocalDateTime createdAt;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "user_id")
private User user;

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "contribution_id")
private Contribution contribution;

// Getters and Setters

public Long getId() { return id; }
public void setId(Long id) { this.id = id; }

public String getContent() { return content; }
public void setContent(String content) { this.content = content; }

public LocalDateTime getCreatedAt() { return createdAt; }
public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

public User getUser() { return user; }
public void setUser(User user) { this.user = user; }

public Contribution getContribution() { return contribution; }
public void setContribution(Contribution contribution) { this.contribution = contribution; }
public String getCommentsByPyq() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'getCommentsByPyq'");
}
}