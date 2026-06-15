package com.project.app.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    // Optionnels : définis uniquement si l'utilisateur veut configurer une enchère
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime auctionStart;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime auctionEnd;
}
