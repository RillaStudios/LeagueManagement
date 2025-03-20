package com.iforddow.league_management.controller;

import com.iforddow.league_management.dto.DivisionDTO;
import com.iforddow.league_management.requests.DivisionRequest;
import com.iforddow.league_management.service.DivisionService;
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
    public ResponseEntity<List<DivisionDTO>> getAllDivisions(@PathVariable Long leagueId) {

        return divisionService.getAllDivisions(leagueId);

    }

    @GetMapping("/{divisionId}")
    public ResponseEntity<DivisionDTO> getDivisionById(@PathVariable Long leagueId, @PathVariable Long divisionId) {

        return divisionService.getDivisionById(divisionId, leagueId);

    }

    @PostMapping("/")
    public ResponseEntity<?> addDivision(@PathVariable Long leagueId, @RequestBody DivisionRequest divisionRequest) {

        return divisionService.addDivision(leagueId, divisionRequest);

    }

    @PatchMapping("/{divisionId}")
    public ResponseEntity<?> updateDivision(@PathVariable Long leagueId, @PathVariable Long divisionId, @RequestBody DivisionRequest divisionRequest) {

        return divisionService.updateDivision(leagueId, divisionId, divisionRequest);

    }

    @DeleteMapping("/{divisionId}")
    public ResponseEntity<?> deleteDivision(@PathVariable Long leagueId, @PathVariable Long divisionId) {

        return divisionService.deleteDivision(leagueId, divisionId);

    }



}
