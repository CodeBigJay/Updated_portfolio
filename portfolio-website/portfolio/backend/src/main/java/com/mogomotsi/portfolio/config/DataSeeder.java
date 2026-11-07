package com.mogomotsi.portfolio.config;

import com.mogomotsi.portfolio.model.AdminUser;
import com.mogomotsi.portfolio.model.Experience;
import com.mogomotsi.portfolio.model.Project;
import com.mogomotsi.portfolio.model.Skill;
import com.mogomotsi.portfolio.repository.AdminUserRepository;
import com.mogomotsi.portfolio.repository.ExperienceRepository;
import com.mogomotsi.portfolio.repository.ProjectRepository;
import com.mogomotsi.portfolio.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

/**
 * Seeds the database with starter content on first run so the site isn't
 * empty out of the box. Replace this with your own projects/skills/experience,
 * either by editing this file or by calling the admin-protected endpoints
 * once you're logged in.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final ExperienceRepository experienceRepository;
    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.password}")
    private String adminPassword;

    public DataSeeder(ProjectRepository projectRepository,
                       SkillRepository skillRepository,
                       ExperienceRepository experienceRepository,
                       AdminUserRepository adminUserRepository,
                       PasswordEncoder passwordEncoder) {
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
        this.experienceRepository = experienceRepository;
        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedAdminUser();
        seedProjects();
        seedSkills();
        seedExperience();
    }

    private void seedAdminUser() {
        if (adminUserRepository.findByUsername(adminUsername).isEmpty()) {
            adminUserRepository.save(AdminUser.builder()
                    .username(adminUsername)
                    .passwordHash(passwordEncoder.encode(adminPassword))
                    .build());
        }
    }

    private void seedProjects() {
        if (projectRepository.count() > 0) return;

        projectRepository.save(Project.builder()
                .title("Portfolio Website")
                .description("This site — a full-stack portfolio with a Spring Boot API and a React/TypeScript frontend, deployed via Docker.")
                .repoUrl("https://github.com/CodeBigJay/portfolio")
                .liveUrl("")
                .techStack(List.of("Spring Boot", "React", "TypeScript", "PostgreSQL", "Docker"))
                .displayOrder(1)
                .featured(true)
                .build());

        projectRepository.save(Project.builder()
                .title("Sample Backend API")
                .description("Replace this with a real project: a REST API you built, the problem it solved, and what you learned.")
                .repoUrl("https://github.com/CodeBigJay")
                .liveUrl("")
                .techStack(List.of("Java", "Spring Boot", "PostgreSQL"))
                .displayOrder(2)
                .featured(true)
                .build());

        projectRepository.save(Project.builder()
                .title("Sample Data Project")
                .description("Replace this with another project — a database-driven app, a tool, or a script that solved a real problem.")
                .repoUrl("https://github.com/CodeBigJay")
                .liveUrl("")
                .techStack(List.of("Python", "SQL"))
                .displayOrder(3)
                .featured(false)
                .build());
    }

    private void seedSkills() {
        if (skillRepository.count() > 0) return;

        List<Skill> skills = List.of(
                Skill.builder().name("Java").category("Backend").proficiency(4).displayOrder(1).build(),
                Skill.builder().name("Spring Boot").category("Backend").proficiency(4).displayOrder(2).build(),
                Skill.builder().name("Python").category("Backend").proficiency(4).displayOrder(3).build(),
                Skill.builder().name("PostgreSQL").category("Database").proficiency(4).displayOrder(4).build(),
                Skill.builder().name("SQL").category("Database").proficiency(4).displayOrder(5).build(),
                Skill.builder().name("React").category("Frontend").proficiency(3).displayOrder(6).build(),
                Skill.builder().name("TypeScript").category("Frontend").proficiency(3).displayOrder(7).build(),
                Skill.builder().name("Docker").category("Tools").proficiency(3).displayOrder(8).build(),
                Skill.builder().name("Git").category("Tools").proficiency(4).displayOrder(9).build()
        );
        skillRepository.saveAll(skills);
    }

    private void seedExperience() {
        if (experienceRepository.count() > 0) return;

        experienceRepository.save(Experience.builder()
                .title("Part-Time Mathematics Tutor")
                .organization("King's Way Christian School")
                .description("Tutored students in mathematics, breaking down problems and building confidence in problem-solving.")
                .startDate(LocalDate.of(2023, 1, 1))
                .endDate(LocalDate.of(2024, 12, 31))
                .displayOrder(1)
                .build());

        experienceRepository.save(Experience.builder()
                .title("Class Monitor")
                .organization("King's Way Christian School")
                .description("Supported day-to-day classroom coordination and helped fellow students stay on track.")
                .startDate(LocalDate.of(2023, 1, 1))
                .endDate(LocalDate.of(2024, 12, 31))
                .displayOrder(2)
                .build());

        experienceRepository.save(Experience.builder()
                .title("BSc Computer Science and Electronics")
                .organization("North West University, Mahikeng")
                .description("Studied computer science and electronics, with a focus on backend development and databases.")
                .startDate(LocalDate.of(2021, 1, 1))
                .endDate(LocalDate.of(2024, 12, 31))
                .displayOrder(3)
                .build());
    }
}
