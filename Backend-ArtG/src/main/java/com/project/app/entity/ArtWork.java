package com.project.app.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ArtWork {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String imageUrl;

    private List<String> tags;

    @Column(nullable = false)
    private double startingPrice;

    private Long ownerId;

    private LocalDateTime createdAt;

    
    private LocalDateTime auctionStart;   
    private LocalDateTime auctionEnd;     

    @Enumerated(EnumType.STRING)          
    @Builder.Default
    private AuctionStatus auctionStatus = AuctionStatus.PENDING;
}
