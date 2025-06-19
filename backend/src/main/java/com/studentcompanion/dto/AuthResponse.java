package com.studentcompanion.dto;

public class AuthResponse {
    private String token;
    private String name;
    private String email;
    private String branch;
    private int currentSemester;

    public AuthResponse() {}

    public AuthResponse(String token, String name, String email, String branch, int currentSemester) {
        this.token = token;
        this.name = name;
        this.email = email;
        this.branch = branch;
        this.currentSemester = currentSemester;
    }

    // Getters and setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }

    public int getCurrentSemester() { return currentSemester; }
    public void setCurrentSemester(int currentSemester) { this.currentSemester = currentSemester; }
}
