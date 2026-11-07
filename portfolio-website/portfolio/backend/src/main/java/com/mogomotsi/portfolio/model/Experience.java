package com.mogomotsi.portfolio.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "experience")
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String organization;

    @Column(length = 1500)
    private String description;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "display_order")
    private Integer displayOrder;

    public Experience() {
    }

    public Experience(Long id, String title, String organization, String description,
                       LocalDate startDate, LocalDate endDate, Integer displayOrder) {
        this.id = id;
        this.title = title;
        this.organization = organization;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.displayOrder = displayOrder;
    }

    public static Builder builder() {
        return new Builder();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getOrganization() { return organization; }
    public void setOrganization(String organization) { this.organization = organization; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }

    public static class Builder {
        private String title;
        private String organization;
        private String description;
        private LocalDate startDate;
        private LocalDate endDate;
        private Integer displayOrder;

        public Builder title(String title) { this.title = title; return this; }
        public Builder organization(String organization) { this.organization = organization; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder startDate(LocalDate startDate) { this.startDate = startDate; return this; }
        public Builder endDate(LocalDate endDate) { this.endDate = endDate; return this; }
        public Builder displayOrder(Integer displayOrder) { this.displayOrder = displayOrder; return this; }

        public Experience build() {
            return new Experience(null, title, organization, description, startDate, endDate, displayOrder);
        }
    }
}
