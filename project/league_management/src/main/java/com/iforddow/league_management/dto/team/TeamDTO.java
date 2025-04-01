package com.iforddow.league_management.dto.team;

import com.iforddow.league_management.jpa.entity.team.Team;

import java.util.Optional;

public record TeamDTO(Integer teamId, String teamName, String location, String leagueName, String divisionName,
                      String conferenceName, String teamOwnerName, Integer ownerId, Integer leagueId, Optional<Integer> divisionId, Optional<Integer> conferenceId) {

    public TeamDTO(Team team) {

        this(team.getId(), team.getName(), team.getLocation(), team.getLeague().getName(),
                team.getDivision() != null ? team.getDivision().getName() : "No Division",
                team.getDivision() != null ? team.getDivision().getConference().getName() : "No Conference",
                team.getOwner().getFirstName() + " "
                        + team.getOwner().getLastName(),
                team.getOwner().getId(),
                team.getLeague().getId(),
                Optional.ofNullable(team.getDivision() != null ? team.getDivision().getId() : null),
                Optional.ofNullable(team.getConference() != null ? team.getConference().getId() : null));
    }

}
