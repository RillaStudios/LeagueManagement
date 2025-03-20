package com.iforddow.league_management.dto.league;

import com.iforddow.league_management.jpa.entity.league.Season;

import java.time.Instant;

public record SeasonDTO(Integer id, LeagueDTO league,
                         String startDate, String endDate) {

    public SeasonDTO(Season season) {
        this(season.getId(), new LeagueDTO(season.getLeague()),
                 season.getStartDate().toString(), season.getEndDate().toString());
    }

}
