package com.iforddow.league_management.dto.league;

import com.iforddow.league_management.jpa.entity.league.LeagueNews;

import java.time.Instant;

public record LeagueNewsDTO(Integer leagueNewsId, Instant createdAt, String content, Integer leagueId, Integer createdBy) {

    public LeagueNewsDTO(LeagueNews leagueNews) {
        this(leagueNews.getId(), leagueNews.getCreatedAt(), leagueNews.getContent(),
                leagueNews.getLeague().getId(), leagueNews.getCreatedBy().getId());
    }

}
