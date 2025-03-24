package com.iforddow.league_management.controller.league;

import com.iforddow.league_management.dto.league.ConferenceDTO;
import com.iforddow.league_management.dto.league.DivisionDTO;
import com.iforddow.league_management.requests.league.DivisionRequest;
import com.iforddow.league_management.service.league.DivisionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/leagues/{leagueId}/divisions")
public class DivisionController {

    private final DivisionService divisionService;

    @GetMapping("/")
    public ResponseEntity<List<DivisionDTO>> getAllDivisions(@PathVariable Integer leagueId) {

        return divisionService.getAllDivisions(leagueId);

    }

    @GetMapping("/{divisionId}")
    public ResponseEntity<DivisionDTO> getDivisionById(@PathVariable Integer leagueId, @PathVariable Integer divisionId) {

        return divisionService.getDivisionById(divisionId, leagueId);

    }

    @PostMapping("/")
    public ResponseEntity<DivisionDTO> addDivision(@PathVariable Integer leagueId, @RequestBody DivisionRequest divisionRequest) {

        return divisionService.addDivision(leagueId, divisionRequest);

    }

    @PatchMapping("/{divisionId}")
    public ResponseEntity<DivisionDTO> updateDivision(@PathVariable Integer leagueId, @PathVariable Integer divisionId, @RequestBody DivisionRequest divisionRequest) {

        return divisionService.updateDivision(leagueId, divisionId, divisionRequest);

    }

    @DeleteMapping("/{divisionId}")
    public ResponseEntity<?> deleteDivision(@PathVariable Integer leagueId, @PathVariable Integer divisionId) {

        return divisionService.deleteDivision(leagueId, divisionId);

    }

    @GetMapping("/{divisionId}/teams")
    public ResponseEntity<?> getTeamsByDivisionId(@PathVariable Integer leagueId, @PathVariable Integer divisionId) {

        return divisionService.getTeamsByDivisionId(leagueId, divisionId);

    }

    @GetMapping("/{divisionId}/conference")
    public ResponseEntity<ConferenceDTO> getConferenceByDivisionId(@PathVariable Integer leagueId, @PathVariable Integer divisionId) {

        return divisionService.getConferenceByDivisionId(leagueId, divisionId);

    }

}
