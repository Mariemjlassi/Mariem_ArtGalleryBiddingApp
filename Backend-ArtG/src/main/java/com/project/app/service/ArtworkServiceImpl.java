package com.project.app.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.project.app.dto.ArtworkRequest;
import com.project.app.dto.ArtworkResponse;
import com.project.app.entity.ArtWork;
import com.project.app.entity.AuctionStatus;
import com.project.app.entity.User;
import com.project.app.exception.ResourceNotFoundException;
import com.project.app.repository.ArtworkRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArtworkServiceImpl implements ArtworkService {

    private final ArtworkRepository repository;
    private final AuthService authService;

    @Override
    public ArtworkResponse create(ArtworkRequest request) {
        User currentUser = authService.getCurrentUser();

        ArtWork artwork = ArtWork.builder()
                .title(request.getTitle())
                .imageUrl(request.getImageUrl())
                .tags(request.getTags())
                .startingPrice(request.getStartingPrice())
                .ownerId(currentUser.getId())
                .createdAt(LocalDateTime.now())
                // Step 5 : on enregistre les dates d'enchère si fournies
                .auctionStart(request.getAuctionStart())
                .auctionEnd(request.getAuctionEnd())
                .auctionStatus(AuctionStatus.PENDING)
                .build();

        return mapToResponse(repository.save(artwork));
    }

    @Override
    public ArtworkResponse getById(Long id) {
        ArtWork artwork = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("artwork non trouvee avec id:" + id));
        return mapToResponse(artwork);
    }

    @Override
    public ArtworkResponse update(Long id, ArtworkRequest request) {
        ArtWork artwork = repository.findById(id).orElseThrow();
        User currentUser = authService.getCurrentUser();

        if (!artwork.getOwnerId().equals(currentUser.getId())) {
            throw new RuntimeException("Vous n avez pas le droit de modifier cette artwork");
        }

        artwork.setTitle(request.getTitle());
        artwork.setImageUrl(request.getImageUrl());
        artwork.setTags(request.getTags());
        artwork.setStartingPrice(request.getStartingPrice());
        // Step 5 : mise à jour des dates d'enchère
        artwork.setAuctionStart(request.getAuctionStart());
        artwork.setAuctionEnd(request.getAuctionEnd());
        if (request.getAuctionStart() != null) {
            artwork.setAuctionStatus(AuctionStatus.PENDING);
        }

        return mapToResponse(repository.save(artwork));
    }

    @Override
    public List<ArtworkResponse> getAll() {
        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        ArtWork artwork = repository.findById(id).orElseThrow();
        User currentUser = authService.getCurrentUser();

        if (!artwork.getOwnerId().equals(currentUser.getId())) {
            throw new RuntimeException("Vous n avez pas le droit de supprimer cette oeuvre");
        }

        repository.deleteById(id);
    }

    private ArtworkResponse mapToResponse(ArtWork artwork) {
        return ArtworkResponse.builder()
                .id(artwork.getId())
                .title(artwork.getTitle())
                .imageUrl(artwork.getImageUrl())
                .startingPrice(artwork.getStartingPrice())
                .tags(artwork.getTags())
                .ownerId(artwork.getOwnerId())
                .createdAt(artwork.getCreatedAt())
                // Step 5 : on inclut les champs d'enchère dans la réponse
                .auctionStart(artwork.getAuctionStart())
                .auctionEnd(artwork.getAuctionEnd())
                .auctionStatus(artwork.getAuctionStatus())
                .build();
    }
}
