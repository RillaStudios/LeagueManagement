package com.iforddow.league_management.controller.league;

import com.iforddow.league_management.dto.team.TeamSeasonStatsDTO;
import com.iforddow.league_management.requests.league.SeasonRequest;
import com.iforddow.league_management.service.league.SeasonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<?> getAllSeasons(@PathVariable Integer leagueId) {

        return seasonService.getAllSeasons(leagueId);

    }

    /*
    * A method to get a season by its ID.
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @GetMapping("/{seasonId}")
    public ResponseEntity<?> getSeasonById(@PathVariable Integer leagueId, @PathVariable Integer seasonId) {

        return seasonService.getSeasonById(leagueId, seasonId);

    }

    @PostMapping("/")
    public ResponseEntity<?> createSeason(@PathVariable Integer leagueId, @RequestBody SeasonRequest seasonRequest) {

        return seasonService.createSeason(leagueId, seasonRequest);

    }

    @PatchMapping("/{seasonId}")
    public ResponseEntity<?> updateSeason(@PathVariable Integer leagueId, @PathVariable Integer seasonId, @RequestBody SeasonRequest seasonRequest) {

        return seasonService.updateSeason(leagueId, seasonId, seasonRequest);

    }

    @DeleteMapping("/{seasonId}")
    public ResponseEntity<?> deleteSeason(@PathVariable Integer leagueId, @PathVariable Integer seasonId) {

        return seasonService.deleteSeason(leagueId, seasonId);

    }

    @GetMapping("/stats/{seasonId}")
    public ResponseEntity<List<TeamSeasonStatsDTO>> getSeasonStats(@PathVariable String leagueId, @PathVariable Integer seasonId) {

        return seasonService.getSeasonStats(seasonId);

    }

}
