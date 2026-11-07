package com.mogomotsi.portfolio.dto;

import java.util.List;

public class ProjectDto {
    private Long id;
    private String title;
    private String description;
    private String repoUrl;
    private String liveUrl;
    private String imageUrl;
    private List<String> techStack;
    private boolean featured;

    public ProjectDto() {
    }

    public ProjectDto(Long id, String title, String description, String repoUrl, String liveUrl,
                       String imageUrl, List<String> techStack, boolean featured) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.repoUrl = repoUrl;
        this.liveUrl = liveUrl;
        this.imageUrl = imageUrl;
        this.techStack = techStack;
        this.featured = featured;
    }

    public static Builder builder() {
        return new Builder();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getRepoUrl() { return repoUrl; }
    public void setRepoUrl(String repoUrl) { this.repoUrl = repoUrl; }

    public String getLiveUrl() { return liveUrl; }
    public void setLiveUrl(String liveUrl) { this.liveUrl = liveUrl; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public List<String> getTechStack() { return techStack; }
    public void setTechStack(List<String> techStack) { this.techStack = techStack; }

    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }

    public static class Builder {
        private Long id;
        private String title;
        private String description;
        private String repoUrl;
        private String liveUrl;
        private String imageUrl;
        private List<String> techStack;
        private boolean featured;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder repoUrl(String repoUrl) { this.repoUrl = repoUrl; return this; }
        public Builder liveUrl(String liveUrl) { this.liveUrl = liveUrl; return this; }
        public Builder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public Builder techStack(List<String> techStack) { this.techStack = techStack; return this; }
        public Builder featured(boolean featured) { this.featured = featured; return this; }

        public ProjectDto build() {
            return new ProjectDto(id, title, description, repoUrl, liveUrl, imageUrl, techStack, featured);
        }
    }
}
