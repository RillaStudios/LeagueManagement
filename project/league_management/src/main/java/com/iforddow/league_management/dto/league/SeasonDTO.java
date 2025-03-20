package com.iforddow.league_management.dto;

import com.iforddow.league_management.jpa.entity.league.Season;

import java.time.Instant;

public record SeasonDTO(Long id, Instant createdAt, LeagueDTO league,
                        String seasonName, String startDate, String endDate) {

    public SeasonDTO(Season season) {
        this(season.getId(), season.getCreatedAt(), new LeagueDTO(season.getLeague()),
                season.getSeasonName(), season.getStartDate().toString(), season.getEndDate().toString());
    }

}
