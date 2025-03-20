package com.iforddow.league_management.dto;

import com.iforddow.league_management.jpa.entity.league.Division;

public record DivisionDTO(Long id, String name, String leagueName) {

    public DivisionDTO(Division division) {
        this(division.getId(), division.getName(), division.getLeague().getName());
    }

}
