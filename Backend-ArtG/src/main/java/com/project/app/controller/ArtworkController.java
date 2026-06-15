package com.project.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.app.dto.ArtworkRequest;
import com.project.app.dto.ArtworkResponse;
import com.project.app.service.ArtworkService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/artworks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ArtworkController {
	
	private final ArtworkService artworkService;
	
	@PostMapping
    public ResponseEntity<ArtworkResponse> create(@Valid @RequestBody ArtworkRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(artworkService.create(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArtworkResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(artworkService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<ArtworkResponse>> getAll() {
        return ResponseEntity.ok(artworkService.getAll());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ArtworkResponse> update(@PathVariable Long id,@Valid @RequestBody ArtworkRequest request) {
        return ResponseEntity.ok(artworkService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        artworkService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
