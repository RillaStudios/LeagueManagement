package com.iforddow.league_management.service.jwt;

import com.iforddow.league_management.repository.TokenRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

/*
* A service that cleans up expired and revoked tokens from the database.
*
* The service is scheduled to run every day at midnight.
*
* @Author: IFD
* @Since: 2025-02-07
* */
@Service
@RequiredArgsConstructor
@Slf4j
public class TokenCleanupService {

    // TokenRepository is a repository that manages the token entities in the database.
    private final TokenRepository tokenRepository;

    /*
    * A method that deletes all expired and revoked tokens from the database.
    *
    * The method is scheduled to run every day at midnight.
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    public void cleanUpExpiredTokens() {

        log.info("Starting cleanup of expired and revoked tokens");

        int deletedTokens = tokenRepository.deleteAllExpiredAndRevokedTokens();

        log.info("Deleted {} expired/revoked tokens", deletedTokens);

    }

}
