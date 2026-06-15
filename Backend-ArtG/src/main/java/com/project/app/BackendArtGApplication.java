package com.project.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling  // Active le cron job AuctionScheduler
public class BackendArtGApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendArtGApplication.class, args);
    }
}
