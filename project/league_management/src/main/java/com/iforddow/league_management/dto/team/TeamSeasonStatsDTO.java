package com.iforddow.league_management.dto.team;

import com.iforddow.league_management.jpa.entity.team.TeamSeason;

public record TeamSeasonStatsDTO(Integer id, Integer teamId, Integer seasonId, Integer wins, Integer losses, Integer ties, Integer points, Integer pointsFor, Integer pointsAgainst) {

    public TeamSeasonStatsDTO(TeamSeason teamSeason) {



    }

}
