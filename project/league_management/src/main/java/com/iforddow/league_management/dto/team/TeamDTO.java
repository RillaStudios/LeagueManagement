package com.iforddow.league_management.dto.team;

import com.iforddow.league_management.jpa.entity.team.Team;

public record TeamDTO(String name, String location, String leagueName, String divisionName,
                String conferenceName, String teamOwnerName) {

    public TeamDTO(Team team) {

        this(team.getName(), team.getLocation(), team.getLeague().getName(),
                team.getDivision() != null ? team.getDivision().getName() : "No Division",
                team.getConference() != null ? team.getConference().getName() : "No Conference",
                team.getOwner().getFirstName() + " "
                        + team.getOwner().getLastName());
    }

}
