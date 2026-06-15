package com.project.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.project.app.dto.ArtworkRequest;
import com.project.app.dto.ArtworkResponse;
import com.project.app.entity.ArtWork;
import com.project.app.exception.ResourceNotFoundException;
import com.project.app.repository.ArtworkRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArtworkServiceImpl implements ArtworkService{
	
	private final ArtworkRepository repository;
	
	@Override
	public ArtworkResponse create(ArtworkRequest request) {
		
		ArtWork artwork= ArtWork.builder()
				.title(request.getTitle())
                .imageUrl(request.getImageUrl())
                .tags(request.getTags())
                .startingPrice(request.getStartingPrice())
                .ownerId(request.getOwnerId())
                .build();
        return mapToResponse(repository.save(artwork));
	}
	
	@Override
	public ArtworkResponse getById(Long id) {
		ArtWork artwork = repository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("artwork non trouvee acev id:"+id));
		return mapToResponse(artwork);
	}

	@Override
	public ArtworkResponse update(Long id, ArtworkRequest request) {
		ArtWork artwork = repository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("artwork non trouvee acev id:"+id));
		artwork.setTitle(request.getTitle());
		artwork.setImageUrl(request.getImageUrl());
        artwork.setTags(request.getTags());
        artwork.setStartingPrice(request.getStartingPrice());
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
        if (!repository.existsById(id)) {
            throw new RuntimeException("Artwork introuvable : " + id);
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
				.createdAt(artwork.getCreatedAt())
                .build();
	}

}
