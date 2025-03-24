package com.iforddow.league_management.dto.league;

import com.iforddow.league_management.jpa.entity.league.Season;

public record SeasonDTO(Integer id, Integer leagueId,
                         String startDate, String endDate) {

    public SeasonDTO(Season season) {
        this(season.getId(), season.getLeague().getId(),
                 season.getStartDate().toString(), season.getEndDate().toString());
    }

}
