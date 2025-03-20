package com.iforddow.league_management.requests;

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

    // private Instant createdAt;
    private String leagueDescription;

    // private Association association;
    private int associationId;

    // private String gameType;
    private String gameType;

}
