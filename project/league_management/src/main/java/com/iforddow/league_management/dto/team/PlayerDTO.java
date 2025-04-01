package com.iforddow.league_management.dto.team;

import com.iforddow.league_management.jpa.entity.team.Player;

import java.time.LocalDate;

public record PlayerDTO(Integer playerId, String name, String height, String weight, String skillLevel, LocalDate dob, Integer teamId) {

    public PlayerDTO(Player player) {
        this(player.getId(), player.getName(), player.getHeight(), player.getWeight(), player.getSkillLevel(), player.getDob(), player.getTeam().getId());
    }

}
