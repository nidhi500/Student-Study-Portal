package com.studentcompanion.dto;

import java.util.Map;

public class ErrorResponse {
    private String message;
    private Map<String, String> fieldErrors;
    
    // Constructors
    public ErrorResponse() {}
    
    public ErrorResponse(String message) {
        this.message = message;
    }
    
    public ErrorResponse(Map<String, String> fieldErrors) {
        this.fieldErrors = fieldErrors;
    }
    
    public ErrorResponse(String message, Map<String, String> fieldErrors) {
        this.message = message;
        this.fieldErrors = fieldErrors;
    }
    
    // Getters and Setters
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public Map<String, String> getFieldErrors() {
        return fieldErrors;
    }
    
    public void setFieldErrors(Map<String, String> fieldErrors) {
        this.fieldErrors = fieldErrors;
    }
}