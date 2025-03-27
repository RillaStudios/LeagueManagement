package com.iforddow.league_management.dto.league;

import com.iforddow.league_management.jpa.entity.league.Game;

public record GameDTO() {

    public GameDTO(Game game) {
        this();
    }

}
