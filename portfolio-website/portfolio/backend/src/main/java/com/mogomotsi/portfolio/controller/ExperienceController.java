package com.mogomotsi.portfolio.controller;

import com.mogomotsi.portfolio.model.Experience;
import com.mogomotsi.portfolio.repository.ExperienceRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/experience")
public class ExperienceController {

    private final ExperienceRepository experienceRepository;

    public ExperienceController(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    @GetMapping
    public List<Experience> getAll() {
        return experienceRepository.findAllByOrderByDisplayOrderAsc();
    }
}
