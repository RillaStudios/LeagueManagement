package com.iforddow.league_management.controller;

import com.iforddow.league_management.requests.LeagueRequest;
import com.iforddow.league_management.service.LeagueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/*
* A controller class that handles all the requests related to the leagues.
*
* @Author: IFD
* @Since: 2025-02-07
* */
@RestController
@RequiredArgsConstructor
@RequestMapping("/leagues")
public class LeagueController {

    // A private final field of type LeagueService.
    private final LeagueService leagueService;

    /*
    * A method that returns all the leagues.
    *
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @GetMapping("/")
    public ResponseEntity<?> getAllLeagues() {

        return leagueService.getAllLeagues();

    }

    /*
    * A method that returns a league by its id.
    *
    * @param leagueId
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @GetMapping("/{leagueId}")
    public ResponseEntity<?> getLeagueById(@PathVariable Long leagueId) {

        return leagueService.getLeagueById(leagueId);

    }

    /*
    * A method that adds a league.
    *
    * @param leagueRequest
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @PostMapping("/")
    public ResponseEntity<?> addLeague(@RequestBody LeagueRequest leagueRequest) {

        return leagueService.addLeague(leagueRequest);

    }

    /*
    * A method that updates a league.
    *
    * @param leagueId
    * @param leagueRequest
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @PatchMapping("/{leagueId}")
    public ResponseEntity<?> updateLeague(@PathVariable Long leagueId, @RequestBody LeagueRequest leagueRequest) {

        return leagueService.updateLeague(leagueId, leagueRequest);

    }

    /*
    * A method that deletes a league.
    *
    * @param leagueId
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @DeleteMapping("/{leagueId}")
    public ResponseEntity<?> deleteLeague(@PathVariable Long leagueId) {

        return leagueService.deleteLeague(leagueId);

    }

}
