package com.project.app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.app.entity.ArtWork;
import com.project.app.entity.Subscription;
import com.project.app.entity.User;
import com.project.app.repository.ArtworkRepository;
import com.project.app.repository.SubscriptionRepository;
import com.project.app.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class SubscriptionController {

    private final SubscriptionRepository subscriptionRepository;
    private final ArtworkRepository artworkRepository;
    private final AuthService authService;

    
    @PostMapping("/{artworkId}")
    public ResponseEntity<String> subscribe(@PathVariable Long artworkId) {
        User user = authService.getCurrentUser();
        ArtWork artwork = artworkRepository.findById(artworkId).orElseThrow();

        if (subscriptionRepository.existsBySubscriberAndArtwork(user, artwork)) {
            return ResponseEntity.ok("Déjà abonné");
        }

        subscriptionRepository.save(
            Subscription.builder()
                .subscriber(user)
                .artwork(artwork)
                .build()
        );

        return ResponseEntity.ok("Abonné avec succès");
    }

    
    @Transactional
    @DeleteMapping("/{artworkId}")
    public ResponseEntity<Void> unsubscribe(@PathVariable Long artworkId) {
        User user = authService.getCurrentUser();
        ArtWork artwork = artworkRepository.findById(artworkId).orElseThrow();
        subscriptionRepository.deleteBySubscriberAndArtwork(user, artwork);
        return ResponseEntity.noContent().build();
    }

    
    @GetMapping("/{artworkId}/status")
    public ResponseEntity<Boolean> isSubscribed(@PathVariable Long artworkId) {
        User user = authService.getCurrentUser();
        ArtWork artwork = artworkRepository.findById(artworkId).orElseThrow();
        return ResponseEntity.ok(subscriptionRepository.existsBySubscriberAndArtwork(user, artwork));
    }
}
