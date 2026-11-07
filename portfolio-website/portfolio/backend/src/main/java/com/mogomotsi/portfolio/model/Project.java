package com.mogomotsi.portfolio.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Column(name = "repo_url")
    private String repoUrl;

    @Column(name = "live_url")
    private String liveUrl;

    @Column(name = "image_url")
    private String imageUrl;

    @ElementCollection
    @CollectionTable(name = "project_tech_stack", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "technology")
    private List<String> techStack = new ArrayList<>();

    @Column(name = "display_order")
    private Integer displayOrder;

    @Column(name = "featured")
    private boolean featured;

    public Project() {
    }

    public Project(Long id, String title, String description, String repoUrl, String liveUrl,
                    String imageUrl, List<String> techStack, Integer displayOrder, boolean featured) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.repoUrl = repoUrl;
        this.liveUrl = liveUrl;
        this.imageUrl = imageUrl;
        this.techStack = techStack != null ? techStack : new ArrayList<>();
        this.displayOrder = displayOrder;
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

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }

    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }

    public static class Builder {
        private String title;
        private String description;
        private String repoUrl;
        private String liveUrl;
        private String imageUrl;
        private List<String> techStack = new ArrayList<>();
        private Integer displayOrder;
        private boolean featured;

        public Builder title(String title) { this.title = title; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder repoUrl(String repoUrl) { this.repoUrl = repoUrl; return this; }
        public Builder liveUrl(String liveUrl) { this.liveUrl = liveUrl; return this; }
        public Builder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public Builder techStack(List<String> techStack) { this.techStack = techStack; return this; }
        public Builder displayOrder(Integer displayOrder) { this.displayOrder = displayOrder; return this; }
        public Builder featured(boolean featured) { this.featured = featured; return this; }

        public Project build() {
            return new Project(null, title, description, repoUrl, liveUrl, imageUrl, techStack, displayOrder, featured);
        }
    }
}
