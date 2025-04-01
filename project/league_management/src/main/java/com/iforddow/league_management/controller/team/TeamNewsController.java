package com.iforddow.league_management.controller.team;

import com.iforddow.league_management.dto.team.TeamNewsDTO;
import com.iforddow.league_management.requests.team.TeamNewsRequest;
import com.iforddow.league_management.service.team.TeamNewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/leagues/{leagueId}/teams/{teamId}/news")
public class TeamNewsController {

    private final TeamNewsService teamNewsService;

    @GetMapping("/")
    public ResponseEntity<List<TeamNewsDTO>> getAllTeamNews(@PathVariable Integer leagueId, @PathVariable Integer teamId) {
        return teamNewsService.getAllTeamNews(teamId);
    }

    @GetMapping("/{newsId}")
    public ResponseEntity<TeamNewsDTO> getTeamNewsById(@PathVariable Integer leagueId, @PathVariable Integer teamId, @PathVariable Integer newsId) {
        return teamNewsService.getTeamNewsById(teamId, newsId);
    }

    @PatchMapping("/{newsId}")
    public ResponseEntity<TeamNewsDTO> updateTeamNews(@PathVariable Integer leagueId, @PathVariable Integer teamId,
                                                      @PathVariable Integer newsId, @RequestBody TeamNewsRequest teamNewsRequest) {
        return teamNewsService.updateTeamNews(teamId, newsId, teamNewsRequest);
    }

    @PostMapping("/")
    public ResponseEntity<TeamNewsDTO> createTeamNews(@PathVariable Integer leagueId, @PathVariable Integer teamId,
                                                      @RequestBody TeamNewsRequest teamNewsRequest, Principal connectedUser) {
        return teamNewsService.createTeamNews(teamId, teamNewsRequest, connectedUser);
    }

    @DeleteMapping("/{newsId}")
    public ResponseEntity<?> deleteTeamNews(@PathVariable Integer leagueId, @PathVariable Integer teamId,
                                            @PathVariable Integer newsId) {
        return teamNewsService.deleteTeamNews(teamId, newsId);
    }

}
