package com.iforddow.league_management.controller.league;

import com.iforddow.league_management.dto.league.LeagueNewsDTO;
import com.iforddow.league_management.requests.league.LeagueNewsRequest;
import com.iforddow.league_management.service.league.LeagueNewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/leagues/{leagueId}/news")
public class LeagueNewsController {

    private final LeagueNewsService leagueNewsService;

    @GetMapping("/")
    public ResponseEntity<List<LeagueNewsDTO>> getAllLeagueNews(@PathVariable Integer leagueId) {
        return leagueNewsService.getAllLeagueNews(leagueId);
    }

    @GetMapping("/{newsId}")
    public ResponseEntity<LeagueNewsDTO> getLeagueNewsById(@PathVariable Integer leagueId, @PathVariable Integer newsId) {
        return leagueNewsService.getLeagueNewsById(leagueId, newsId);
    }

    @PatchMapping("/{newsId}")
    @PreAuthorize("@leagueSecurityService.canModifyLeague(#leagueId, authentication)")
    public ResponseEntity<LeagueNewsDTO> updateLeagueNews(@PathVariable Integer leagueId, @PathVariable Integer newsId, @RequestBody LeagueNewsRequest leagueNews) {
        return leagueNewsService.updateLeagueNews(leagueId, newsId, leagueNews);
    }

    @PostMapping("/")
    @PreAuthorize("@leagueSecurityService.canModifyLeague(#leagueId, authentication)")
    public ResponseEntity<LeagueNewsDTO> createLeagueNews(@PathVariable Integer leagueId, @RequestBody LeagueNewsRequest leagueNews, Principal connectedUser) {
        return leagueNewsService.createLeagueNews(leagueId, leagueNews, connectedUser);
    }

    @DeleteMapping("/{newsId}")
    @PreAuthorize("@leagueSecurityService.canModifyLeague(#leagueId, authentication)")
    public ResponseEntity<?> deleteLeagueNews(@PathVariable Integer leagueId, @PathVariable Integer newsId) {
        return leagueNewsService.deleteLeagueNews(leagueId, newsId);
    }



}
