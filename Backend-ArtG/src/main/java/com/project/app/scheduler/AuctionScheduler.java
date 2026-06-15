package com.project.app.scheduler;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.project.app.entity.ArtWork;
import com.project.app.entity.AuctionStatus;
import com.project.app.repository.ArtworkRepository;
import com.project.app.repository.SubscriptionRepository;
import com.project.app.service.EmailService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AuctionScheduler {

    private final ArtworkRepository artworkRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final EmailService emailService;

    
    @Scheduled(fixedRate = 60000)
    public void checkAuctions() {
        LocalDateTime now = LocalDateTime.now();

        
        List<ArtWork> toActivate = artworkRepository
                .findByAuctionStatusAndAuctionStartBefore(AuctionStatus.PENDING, now);

        for (ArtWork art : toActivate) {
            art.setAuctionStatus(AuctionStatus.ACTIVE);
            artworkRepository.save(art);

            
            subscriptionRepository.findByArtwork(art).forEach(sub ->
                emailService.sendAuctionStartEmail(
                    sub.getSubscriber().getEmail(),
                    art.getTitle()
                )
            );
        }

        
        List<ArtWork> toEnd = artworkRepository
                .findByAuctionStatusAndAuctionEndBefore(AuctionStatus.ACTIVE, now);

        for (ArtWork art : toEnd) {
            art.setAuctionStatus(AuctionStatus.ENDED);
            artworkRepository.save(art);
        }
    }
}
