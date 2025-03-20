package com.iforddow.league_management.dto.league;

import com.iforddow.league_management.jpa.entity.league.Division;

import java.util.Optional;

public record DivisionDTO(Integer id, String name, String leagueName, String conferenceName) {

    public DivisionDTO(Division division) {
        this(division.getId(), division.getName(),
                division.getLeague().getName(),
                division.getConference() != null ? division.getConference().getName() : "No Conference");
    }

}
