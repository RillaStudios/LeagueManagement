package com.iforddow.league_management.dto.league;

import com.iforddow.league_management.jpa.entity.league.Game;
import com.iforddow.league_management.jpa.entity.team.TeamGameStats;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public record GameDTO(Integer gameId, Integer homeTeamId, Integer awayTeamId, Integer seasonId, Instant gameDate,
                      Integer venueId, List<Integer> teamGameStatsIds) {

    public GameDTO(Game game) {
        this(game.getId(), game.getHomeTeam().getId(), game.getAwayTeam().getId(),
                game.getSeason().getId(), game.getDate(), game.getVenue() != null ? game.getVenue().getId() : null,
                game.getTeamGameStats() != null ? game.getTeamGameStats().stream().map(TeamGameStats::getId).toList() : null);
    }

}
