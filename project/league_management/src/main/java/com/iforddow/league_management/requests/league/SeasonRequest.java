package com.iforddow.league_management.requests.league;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/*
* A class to represent the request body for creating a season
*
* @Author: IFD
* @Since: 2025-02-07
* */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SeasonRequest {

    // The start date of the season
    private LocalDate startDate;

    // The end date of the season
    private LocalDate endDate;

}
