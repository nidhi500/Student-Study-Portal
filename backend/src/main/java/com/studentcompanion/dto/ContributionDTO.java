package com.studentcompanion.dto;

public class ContributionDTO {
    public String title;
    public String description;
    public String type;
    public String subject;
    public String visibility;
    public String url;

    // Optional: Add getters & setters if needed
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
}
