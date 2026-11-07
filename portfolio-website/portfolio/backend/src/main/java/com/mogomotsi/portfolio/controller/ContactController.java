package com.mogomotsi.portfolio.controller;

import com.mogomotsi.portfolio.dto.ContactRequest;
import com.mogomotsi.portfolio.model.ContactMessage;
import com.mogomotsi.portfolio.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> submit(@Valid @RequestBody ContactRequest request) {
        contactService.saveMessage(request);
        return ResponseEntity.ok(Map.of("status", "received", "message", "Thanks for reaching out — I'll get back to you soon."));
    }

    // Admin-only: list submitted messages
    @GetMapping
    public List<ContactMessage> getAll() {
        return contactService.getAllMessages();
    }
}
