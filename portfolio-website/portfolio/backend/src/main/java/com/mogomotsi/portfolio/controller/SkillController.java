package com.mogomotsi.portfolio.controller;

import com.mogomotsi.portfolio.model.Skill;
import com.mogomotsi.portfolio.repository.SkillRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillRepository skillRepository;

    public SkillController(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @GetMapping
    public List<Skill> getAll() {
        return skillRepository.findAllByOrderByDisplayOrderAsc();
    }
}
