package com.project.app.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendAuctionStartEmail(String to, String artworkTitle) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Enchère démarrée : " + artworkTitle);
            message.setText(
                "L'enchère pour \"" + artworkTitle + "\" vient de commencer \n" +
                "Connectez-vous sur ArtHaus pour placer votre enchère."
            );
            mailSender.send(message);
        } catch (Exception e) {
            
            System.out.println("[EMAIL] Non envoyé à " + to + " → " + e.getMessage());
        }
    }
}
