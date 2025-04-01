package com.iforddow.league_management.requests.team;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlayerRequest {

    private String name;
    private String height;
    private String weight;
    private String skillLevel;
    private LocalDate dob;
    private Integer teamId;

}
