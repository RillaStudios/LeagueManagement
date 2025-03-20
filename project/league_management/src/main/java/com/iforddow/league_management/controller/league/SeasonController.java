package com.iforddow.league_management.controller;

import com.iforddow.league_management.requests.SeasonRequest;
import com.iforddow.league_management.service.SeasonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/leagues/{leagueId}/seasons")
public class SeasonController {

    // A service to handle season-related operations
    private final SeasonService seasonService;

    /*
    * A method to get all seasons associated with a league.
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @GetMapping("/")
    public ResponseEntity<?> getAllSeasons(@PathVariable Long leagueId) {

        return seasonService.getAllSeasons(leagueId);

    }

    /*
    * A method to get a season by its ID.
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @GetMapping("/{seasonId}")
    public ResponseEntity<?> getSeasonById(@PathVariable Long leagueId, @PathVariable Long seasonId) {

        return seasonService.getSeasonById(leagueId, seasonId);

    }

    @PostMapping("/")
    public ResponseEntity<?> createSeason(@PathVariable Long leagueId, @RequestBody SeasonRequest seasonRequest) {

        return seasonService.createSeason(leagueId, seasonRequest);

    }

    @PatchMapping("/{seasonId}")
    public ResponseEntity<?> updateSeason(@PathVariable Long leagueId, @PathVariable Long seasonId, @RequestBody SeasonRequest seasonRequest) {

        return seasonService.updateSeason(leagueId, seasonId, seasonRequest);

    }

    @DeleteMapping("/{seasonId}")
    public ResponseEntity<?> deleteSeason(@PathVariable Long leagueId, @PathVariable Long seasonId) {

        return seasonService.deleteSeason(leagueId, seasonId);

    }

}
