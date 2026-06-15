package com.project.app.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.app.entity.ArtWork;
import com.project.app.entity.AuctionStatus;

@Repository
public interface ArtworkRepository extends JpaRepository<ArtWork, Long> {

    // Trouve toutes les enchères PENDING dont l'heure de début est passée → à activer
    List<ArtWork> findByAuctionStatusAndAuctionStartBefore(AuctionStatus status, LocalDateTime time);

    // Trouve toutes les enchères ACTIVE dont l'heure de fin est passée → à terminer
    List<ArtWork> findByAuctionStatusAndAuctionEndBefore(AuctionStatus status, LocalDateTime time);
}
