package com.iforddow.league_management.service;

import com.iforddow.league_management.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class TokenCleanupService {

    private final TokenRepository tokenRepository;

    @Scheduled(cron = "0 0 0 * * ?") // This cron expression schedules the task to run daily at midnight
    public void cleanUpExpiredTokens() {

        log.info("Starting cleanup of expired and revoked tokens");

        int deletedTokens = tokenRepository.deleteAllExpiredAndRevokedTokens();

        log.info("Deleted {} expired/revoked tokens", deletedTokens);

    }

}
