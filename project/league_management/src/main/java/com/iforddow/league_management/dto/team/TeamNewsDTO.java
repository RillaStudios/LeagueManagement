package com.iforddow.league_management.dto.team;

import com.iforddow.league_management.jpa.entity.league.LeagueNews;
import com.iforddow.league_management.jpa.entity.team.TeamNews;

import java.time.Instant;

public record TeamNewsDTO(Integer teamNewsId, Instant createdAt, String content, Integer leagueId, Integer createdBy) {

    public TeamNewsDTO(TeamNews teamNews) {
        this(teamNews.getId(), teamNews.getCreatedAt(), teamNews.getContent(),
                teamNews.getTeam().getLeague().getId(), teamNews.getCreatedBy().getId());
    }

}
