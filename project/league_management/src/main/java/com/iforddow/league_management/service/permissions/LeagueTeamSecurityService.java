package com.iforddow.league_management.service.permissions;

import com.iforddow.league_management.jpa.entity.User;
import com.iforddow.league_management.repository.league.LeagueRepository;
import com.iforddow.league_management.repository.team.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LeagueTeamSecurityService {

    private final LeagueRepository leagueRepository;

    private final TeamRepository teamRepository;

    public boolean canEditResource(Integer leagueId, Integer teamId, Authentication authentication) {

        // Get the logged-in user ID
        if (authentication == null || !(authentication.getPrincipal() instanceof User user)) {
            return false;
        }

        // Get the logged-in user ID
        Integer loggedInUserId = user.getId();

        // Check if user owns the league
        boolean isLeagueOwner = leagueRepository.findLeagueById(leagueId)
                .map(league -> league.getCreatedBy().getId().equals(loggedInUserId))
                .orElse(false);

        // Check if user owns the team
        boolean isTeamOwner = teamRepository.findTeamById(teamId)
                .map(team -> team.getOwner().getId().equals(loggedInUserId))
                .orElse(false);

        // Allow if user is either a league or team owner
        return isLeagueOwner || isTeamOwner;
    }
}
