package com.studentcompanion.model;

import jakarta.persistence.*;

@Entity
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;
    private boolean done;
    private Long userId; // Link to the user

    // Constructors
    public Todo() {}

    public Todo(String text, boolean done, Long userId) {
        this.text = text;
        this.done = done;
        this.userId = userId;
    }

    // ✅ Getters
    public Long getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public boolean isDone() {
        return done;
    }

    public Long getUserId() {
        return userId;
    }

    // ✅ Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}