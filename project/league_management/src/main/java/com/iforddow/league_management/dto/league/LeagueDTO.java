package com.iforddow.league_management.dto;

import com.iforddow.league_management.jpa.entity.league.Division;
import com.iforddow.league_management.jpa.entity.league.League;

import java.util.List;

public record LeagueDTO(Long id, String name, String gameType, List<String> divisions) {

    public LeagueDTO(League league) {
        this(league.getId(), league.getName(), league.getGameType(), league.getDivisions().stream().map(Division::getName).toList());
    }

}
