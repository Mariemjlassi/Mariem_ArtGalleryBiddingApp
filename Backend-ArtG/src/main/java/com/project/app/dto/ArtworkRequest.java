package com.project.app.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ArtworkRequest {
	
	@NotBlank
	private String title;
	
	
	@NotBlank
	private String imageUrl;
	
	private List<String> tags; 
	
	@NotNull
	private double startingPrice;
	
	private long ownerId;
	
	

}
