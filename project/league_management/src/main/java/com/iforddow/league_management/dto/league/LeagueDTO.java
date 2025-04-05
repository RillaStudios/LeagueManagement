package com.iforddow.league_management.dto.league;

import com.iforddow.league_management.jpa.entity.league.League;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

public record LeagueDTO(Integer id, String name, String gameType, Instant createdAt,
                        String description, Integer currentSeason,
                        List<ConferenceDTO> conferences, List<DivisionDTO> divisions,
                        String location, Integer createdBy) {

    public LeagueDTO(League league) {
        this(league.getId(), league.getName(), league.getGameType(),
                league.getCreatedAt(), league.getDescription(), league.getCurrentSeasonId(),
                league.getConferences().stream().map(ConferenceDTO::new).collect(Collectors.toList()),
                league.getDivisions().stream().map(DivisionDTO::new).collect(Collectors.toList()),
                league.getLocation(), league.getCreatedBy().getId());
    }

}
