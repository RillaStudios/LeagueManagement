package com.iforddow.league_management.dto.league;

import com.iforddow.league_management.jpa.entity.team.TeamGameStats;

public record TeamGameStatDTO(Integer id, Integer teamId, Integer pointsFor, Integer pointsAgainst, Integer gameId) {

    public TeamGameStatDTO(TeamGameStats teamGameStats) {
        this(teamGameStats.getId(), teamGameStats.getTeam().getId(), teamGameStats.getPointsFor(),
                teamGameStats.getPointsAgainst(), teamGameStats.getGame().getId());
    }

}
