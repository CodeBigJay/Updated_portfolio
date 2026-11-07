package com.mogomotsi.portfolio.service;

import com.mogomotsi.portfolio.dto.ProjectDto;
import com.mogomotsi.portfolio.model.Project;
import com.mogomotsi.portfolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<ProjectDto> getAllProjects() {
        return projectRepository.findAllByOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public List<ProjectDto> getFeaturedProjects() {
        return projectRepository.findByFeaturedTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public Project updateProject(Long id, Project updated) {
        Project existing = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found: " + id));
        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setRepoUrl(updated.getRepoUrl());
        existing.setLiveUrl(updated.getLiveUrl());
        existing.setImageUrl(updated.getImageUrl());
        existing.setTechStack(updated.getTechStack());
        existing.setDisplayOrder(updated.getDisplayOrder());
        existing.setFeatured(updated.isFeatured());
        return projectRepository.save(existing);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    private ProjectDto toDto(Project p) {
        return ProjectDto.builder()
                .id(p.getId())
                .title(p.getTitle())
                .description(p.getDescription())
                .repoUrl(p.getRepoUrl())
                .liveUrl(p.getLiveUrl())
                .imageUrl(p.getImageUrl())
                .techStack(p.getTechStack())
                .featured(p.isFeatured())
                .build();
    }
}
