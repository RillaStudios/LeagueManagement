package com.iforddow.league_management.dto.league;

import com.iforddow.league_management.jpa.entity.league.Venue;

public record VenueDTO(Integer venueId, Integer leagueId, String address, String link) {

    public VenueDTO(Venue venue) {
        this(venue.getId(), venue.getLeague().getId(), venue.getAddress(), venue.getLink());
    }

}
