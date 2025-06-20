package com.studentcompanion.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "contributions")
public class Contribution {
    @Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String title;

@Column(length = 2000)
private String description;

private String type;       // e.g., Notes, Video, Link, Drive
private String subject;
private String visibility;

private String url;

@Column(name = "file_url")
private String filePath;

private int upvotes = 0;
private int downvotes = 0;
private int bookmarks = 0;

private LocalDateTime createdAt = LocalDateTime.now();

@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "user_id")
private User user;

@OneToMany(mappedBy = "contribution", cascade = CascadeType.ALL, orphanRemoval = true)
private List<Comment> comments;

// Getters & Setters

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

public String getVisibility() { return visibility; }
public void setVisibility(String visibility) { this.visibility = visibility; }

public String getUrl() { return url; }
public void setUrl(String url) { this.url = url; }

public String getFilePath() { return filePath; }
public void setFilePath(String filePath) { this.filePath = filePath; }

public int getUpvotes() { return upvotes; }
public void setUpvotes(int upvotes) { this.upvotes = upvotes; }

public int getDownvotes() { return downvotes; }
public void setDownvotes(int downvotes) { this.downvotes = downvotes; }

public int getBookmarks() { return bookmarks; }
public void setBookmarks(int bookmarks) { this.bookmarks = bookmarks; }

public LocalDateTime getCreatedAt() { return createdAt; }
public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

public User getUser() { return user; }
public void setUser(User user) { this.user = user; }

public List<Comment> getComments() { return comments; }
public void setComments(List<Comment> comments) { this.comments = comments; }
}
