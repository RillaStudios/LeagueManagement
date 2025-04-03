package com.iforddow.league_management.controller.team;

import com.iforddow.league_management.dto.team.PlayerDTO;
import com.iforddow.league_management.requests.team.PlayerRequest;
import com.iforddow.league_management.service.team.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/leagues/{leagueId}/players")
public class PlayerController {

    private final PlayerService playerService;

    @GetMapping("/")
    public ResponseEntity<List<PlayerDTO>> getAllPlayers(@PathVariable Integer leagueId) {

        return playerService.getAllPlayersByLeague(leagueId);

    }

    @GetMapping("/team/{teamId}")
    public ResponseEntity<List<PlayerDTO>> getAllPlayersByTeam(@PathVariable(required = false) Integer leagueId,
                                                               @PathVariable Integer teamId) {

        return playerService.getAllPlayersByTeam(teamId);

    }

    @GetMapping("/{playerId}")
    public ResponseEntity<PlayerDTO> getPlayerById(@PathVariable Integer leagueId, @PathVariable Integer playerId) {

        return playerService.getPlayerById(playerId);

    }

    @PostMapping("/")
    @PreAuthorize("@leagueTeamSecurityService.canEditResource(#leagueId, #player.teamId, authentication)")
    public ResponseEntity<PlayerDTO> createPlayer(@PathVariable Integer leagueId, @RequestBody PlayerRequest player) {

        return playerService.createPlayer(leagueId, player);

    }

    @PatchMapping("/{playerId}")
    @PreAuthorize("@leagueTeamSecurityService.canEditResource(#leagueId, #player.teamId, authentication)")
    public ResponseEntity<PlayerDTO> updatePlayer(@PathVariable Integer leagueId, @PathVariable Integer playerId, @RequestBody PlayerRequest player) {

        return playerService.updatePlayer(leagueId, playerId, player);

    }

    @DeleteMapping("/{playerId}")
    @PreAuthorize("@leagueTeamSecurityService.canEditResource(#leagueId, #teamId, authentication)")
    public ResponseEntity<?> deletePlayer(@PathVariable Integer leagueId, @PathVariable Integer playerId, @RequestBody Integer teamId) {

        return playerService.deletePlayer(leagueId, playerId);

    }

}
