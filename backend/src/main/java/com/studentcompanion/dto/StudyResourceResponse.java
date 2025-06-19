package com.studentcompanion.dto;

import com.studentcompanion.model.Resource;
import com.studentcompanion.model.Unit;

public class StudyResourceResponse {

    private Long id;
    private String title;
    private String url;
    private String type;
    private Long unitId;
    private String unitName;

    public static StudyResourceResponse from(Resource resource) {
        StudyResourceResponse response = new StudyResourceResponse();
        response.setId(resource.getId());
        response.setTitle(resource.getTitle());
        response.setUrl(resource.getUrl());
        response.setType(resource.getType() != null ? resource.getType().toString() : null);

        Unit unit = resource.getUnit();
        if (unit != null) {
            response.setUnitId(unit.getId());
            response.setUnitName(unit.getName());
        }

        return response;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Long getUnitId() { return unitId; }
    public void setUnitId(Long unitId) { this.unitId = unitId; }

    public String getUnitName() { return unitName; }
    public void setUnitName(String unitName) { this.unitName = unitName; }
}
