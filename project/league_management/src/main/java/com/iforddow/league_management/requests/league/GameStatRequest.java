package com.iforddow.league_management.requests.league;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GameStatRequest {

    private Integer pointsFor;

    private Integer pointsAgainst;

    private Integer id;

}
