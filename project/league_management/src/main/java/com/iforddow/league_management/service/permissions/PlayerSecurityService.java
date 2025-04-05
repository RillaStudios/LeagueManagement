package com.iforddow.league_management.service.permissions;

import com.iforddow.league_management.jpa.entity.User;
import com.iforddow.league_management.repository.league.LeagueRepository;
import com.iforddow.league_management.repository.team.PlayerRepository;
import com.iforddow.league_management.repository.team.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PlayerSecurityService {

    private final LeagueRepository leagueRepository;

    private final TeamRepository teamRepository;

    private final PlayerRepository playerRepository;

    public boolean canEditPlayer(Integer leagueId, Integer teamId, Integer playerId, Authentication authentication) {
        // Get the logged-in user ID
        if (authentication == null || !(authentication.getPrincipal() instanceof User user)) {
            return false;
        }

        Integer loggedInUserId = user.getId();

        // Verify player belongs to specified team
        return playerRepository.findById(playerId)
                .map(player ->
                        player.getTeam().getId().equals(teamId) &&
                                player.getTeam().getOwner().getId().equals(loggedInUserId))
                .orElse(false);
    }
}
