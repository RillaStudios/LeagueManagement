package com.iforddow.league_management.dto.league;

import com.iforddow.league_management.jpa.entity.league.Division;

import java.util.Optional;

public record DivisionDTO(Integer id, String divisionName, String leagueName, String conferenceName, Optional<Integer> conferenceId, Integer leagueId) {

    public DivisionDTO(Division division) {
        this(division.getId(), division.getName(),
                division.getLeague().getName(),
                division.getConference() != null ? division.getConference().getName() : "No Conference",
                Optional.ofNullable(division.getConference() != null ? division.getConference().getId() : null), division.getLeague().getId());
    }

}
