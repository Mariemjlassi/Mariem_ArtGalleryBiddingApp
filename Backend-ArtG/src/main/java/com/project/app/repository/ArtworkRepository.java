package com.project.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.app.entity.ArtWork;

@Repository
public interface ArtworkRepository extends JpaRepository<ArtWork, Long>{

}
