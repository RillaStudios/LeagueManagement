package com.iforddow.league_management.controller.team;

import com.iforddow.league_management.dto.team.PlayerDTO;
import com.iforddow.league_management.requests.team.PlayerRequest;
import com.iforddow.league_management.service.team.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping({"/leagues/{leagueId}/players", "/players"})
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
    public ResponseEntity<PlayerDTO> createPlayer(@PathVariable Integer leagueId, @RequestBody PlayerRequest player) {

        return playerService.createPlayer(player);

    }

    @PatchMapping("/{playerId}")
    public ResponseEntity<PlayerDTO> updatePlayer(@PathVariable Integer leagueId, @PathVariable Integer playerId, @RequestBody PlayerRequest player) {

        return playerService.updatePlayer(playerId, player);

    }

    @DeleteMapping("/{playerId}")
    public ResponseEntity<?> deletePlayer(@PathVariable Integer leagueId, @PathVariable Integer playerId) {

        return playerService.deletePlayer(playerId);

    }

}
