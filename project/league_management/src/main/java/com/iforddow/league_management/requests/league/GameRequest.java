package com.iforddow.league_management.requests.league;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GameRequest {

    private Integer homeTeamId;
    private Integer awayTeamId;
    private Integer seasonId;
    private Integer venueId;
    private Instant gameDate;

}
