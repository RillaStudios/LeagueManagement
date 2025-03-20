package com.iforddow.league_management.dto.league;

import com.iforddow.league_management.jpa.entity.league.Conference;
import com.iforddow.league_management.jpa.entity.league.Division;

import java.util.List;
import java.util.Optional;

public record ConferenceDTO(Integer id, String name, String leagueName, List<String> divisions) {

    public ConferenceDTO(Conference conference) {
        this(conference.getId(), conference.getName(), conference.getLeague().getName(),
                conference.getDivisions() != null ?
                        conference.getDivisions().stream().map(Division::getName).toList() : List.of());
    }
}
