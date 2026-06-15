package com.project.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.app.entity.ArtWork;
import com.project.app.entity.Subscription;
import com.project.app.entity.User;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    
    List<Subscription> findByArtwork(ArtWork artwork);

    
    boolean existsBySubscriberAndArtwork(User subscriber, ArtWork artwork);

    
    void deleteBySubscriberAndArtwork(User subscriber, ArtWork artwork);
}
