package com.iforddow.league_management.service.permissions;

import com.iforddow.league_management.jpa.entity.User;
import com.iforddow.league_management.repository.league.LeagueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LeagueSecurityService {

    private final LeagueRepository leagueRepository;

    public boolean canModifyLeague(Integer leagueId, Authentication authentication) {

        if (authentication == null || !(authentication.getPrincipal() instanceof User user)) {
            return false;
        }

        // Get the logged-in user ID
        Integer loggedInUserId = user.getId();

        // Find the league and check ownership
        return leagueRepository.findById(leagueId)
                .map(league -> league.getCreatedBy().getId().equals(loggedInUserId))
                .orElse(false);
    }
}
