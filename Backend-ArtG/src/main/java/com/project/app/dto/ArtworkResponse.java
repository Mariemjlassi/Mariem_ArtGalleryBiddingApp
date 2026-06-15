package com.project.app.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ArtworkResponse {
	
	private Long id;
	private String title;
	private String imageUrl;
	private List<String> tags;
	private double startingPrice;
	private Long ownerId;
	private LocalDateTime createdAt;

}
