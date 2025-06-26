package com.studentcompanion.dto;
import com.studentcompanion.model.CareerGoal;

public class AuthResponse {
    private String token;
    private String name;
    private String email;
    private String branch;
    private int currentSemester;
    private CareerGoal goal;
    private String enrollmentNumber;

    public AuthResponse() {}

    public AuthResponse(String token, String name, String email, String branch, int currentSemester, CareerGoal goal, String enrollmentNumber) {
        this.token = token;
        this.name = name;
        this.email = email;
        this.branch = branch;
        this.currentSemester = currentSemester;
        this.goal = goal;
        this.enrollmentNumber = enrollmentNumber;
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

    public CareerGoal getGoal() {
        return goal;
    }

    public void setGoal(CareerGoal goal) {
        this.goal = goal;
    }
    public String getEnrollmentNumber() {
        return enrollmentNumber;
    }
    public void setEnrollmentNumber(String enrollmentNumber) {
        this.enrollmentNumber = enrollmentNumber;   
    }

}
