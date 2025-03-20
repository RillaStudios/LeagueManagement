package com.iforddow.league_management.requests.team;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TeamRequest {

    private String teamName;

    private String location;

    private Integer divisionId;

    private String abbreviation;

}