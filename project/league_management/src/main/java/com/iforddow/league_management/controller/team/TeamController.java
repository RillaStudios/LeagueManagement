package com.iforddow.league_management.controller.team;

import com.iforddow.league_management.dto.team.TeamDTO;
import com.iforddow.league_management.requests.team.TeamRequest;
import com.iforddow.league_management.service.team.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/leagues/{leagueId}/teams")
public class TeamController {

    private final TeamService teamService;

    @GetMapping("/")
    public ResponseEntity<List<TeamDTO>> getAllTeams(@PathVariable Integer leagueId) {

        return teamService.getAllTeams(leagueId);

    }

    @GetMapping("/{teamId}")
    public ResponseEntity<TeamDTO> getTeamById(@PathVariable Integer leagueId, @PathVariable Integer teamId) {

        return teamService.getTeamById(leagueId, teamId);

    }

    @PostMapping("/")
    public ResponseEntity<?> createTeam(@PathVariable Integer leagueId, @RequestBody TeamRequest teamRequest) {

        return teamService.createTeam(leagueId, teamRequest);

    }

    @PatchMapping("/{teamId}")
    public ResponseEntity<?> updateTeam(@PathVariable Integer leagueId, @PathVariable Integer teamId, @RequestBody TeamRequest teamRequest) {

        return teamService.updateTeam(leagueId, teamId, teamRequest);

    }

    @DeleteMapping("/{teamId}")
    public ResponseEntity<?> deleteTeam(@PathVariable Integer leagueId, @PathVariable Integer teamId) {

        return teamService.deleteTeam(leagueId, teamId);

    }

    @GetMapping("/{teamId}/news")
    public ResponseEntity<TeamDTO> addNewsItem(@PathVariable Integer leagueId, @PathVariable Integer teamId) {

        return teamService.getTeamById(leagueId, teamId);

    }

    @GetMapping("/{teamId}/{seasonId}/stats")
    public ResponseEntity<TeamDTO> getTeamStats(@PathVariable Integer leagueId, @PathVariable Integer teamId, @PathVariable Integer seasonId) {

        return teamService.getTeamById(leagueId, teamId);

    }

}
