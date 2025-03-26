package com.iforddow.league_management.dto.team;

import com.iforddow.league_management.jpa.entity.team.TeamSeasonStats;

public record TeamSeasonStatsDTO(Integer id, String teamName, Integer seasonId,
                                 Integer wins, Integer losses, Integer ties,
                                 Integer pointsFor, Integer pointsAgainst) {

    public TeamSeasonStatsDTO(TeamSeasonStats teamSeason) {

            this(teamSeason.getId(), teamSeason.getTeamSeason().getTeam().getName(), teamSeason.getTeamSeason().getSeason().getId(),
                    teamSeason.getTotalWins(), teamSeason.getTotalLosses(), teamSeason.getTotalTies(), teamSeason.getTotalPointsFor(),
                    teamSeason.getTotalPointsAgainst());

    }

}
