package com.iforddow.league_management.requests.league;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
* A class to represent the request body for creating a league
*
* @Author: IFD
* @Since: 2025-02-07
* */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LeagueRequest {

    // private Integer id;
    private String leagueName;

    // String to represent the description of the league
    private String leagueDescription;

    // String to represent the location of the league
    private String location;

    // private String gameType;
    private String gameType;

}
