package com.mogomotsi.portfolio.model;

import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category;

    @Column(name = "proficiency")
    private Integer proficiency;

    @Column(name = "display_order")
    private Integer displayOrder;

    public Skill() {
    }

    public Skill(Long id, String name, String category, Integer proficiency, Integer displayOrder) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.proficiency = proficiency;
        this.displayOrder = displayOrder;
    }

    public static Builder builder() {
        return new Builder();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Integer getProficiency() { return proficiency; }
    public void setProficiency(Integer proficiency) { this.proficiency = proficiency; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }

    public static class Builder {
        private String name;
        private String category;
        private Integer proficiency;
        private Integer displayOrder;

        public Builder name(String name) { this.name = name; return this; }
        public Builder category(String category) { this.category = category; return this; }
        public Builder proficiency(Integer proficiency) { this.proficiency = proficiency; return this; }
        public Builder displayOrder(Integer displayOrder) { this.displayOrder = displayOrder; return this; }

        public Skill build() {
            return new Skill(null, name, category, proficiency, displayOrder);
        }
    }
}
