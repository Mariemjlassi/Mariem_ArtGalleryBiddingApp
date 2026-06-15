package com.project.app.service;

import java.util.List;

import com.project.app.dto.ArtworkRequest;
import com.project.app.dto.ArtworkResponse;

public interface ArtworkService {
	
	ArtworkResponse create(ArtworkRequest request);
	ArtworkResponse getById(Long id);
	ArtworkResponse update(Long id,ArtworkRequest request);
	List<ArtworkResponse> getAll();
	void delete(Long id);
	

}
