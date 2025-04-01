package com.iforddow.league_management.controller.league;

import com.iforddow.league_management.dto.league.GameDTO;
import com.iforddow.league_management.dto.league.TeamGameStatDTO;
import com.iforddow.league_management.requests.league.GameRequest;
import com.iforddow.league_management.requests.league.GameStatRequest;
import com.iforddow.league_management.service.league.GameService;
import com.iforddow.league_management.service.league.GameStatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/leagues/{leagueId}/seasons/{seasonId}/games")
public class GameController {

    private final GameService gameService;

    private final GameStatService gameStatService;

    @GetMapping("/")
    public ResponseEntity<List<GameDTO>> getAllGames(@PathVariable Integer leagueId, @PathVariable Integer seasonId) {
        return gameService.getAllGames(leagueId, seasonId);
    }

    @GetMapping("/{gameId}")
    public ResponseEntity<GameDTO> getGameById(@PathVariable Integer leagueId, @PathVariable Integer seasonId, @PathVariable Integer gameId) {
        return gameService.getGameById(leagueId, seasonId, gameId);
    }

    @GetMapping("/team/{teamId}")
    public ResponseEntity<List<GameDTO>> getAllGamesByTeam(@PathVariable Integer leagueId, @PathVariable Integer seasonId, @PathVariable Integer teamId) {
        return gameService.getGamesByTeam(leagueId, seasonId, teamId);
    }

    @PostMapping("/")
    public ResponseEntity<GameDTO> createGame(@PathVariable Integer leagueId, @PathVariable Integer seasonId, @RequestBody GameRequest gameRequest) {
        return gameService.createGame(leagueId, seasonId, gameRequest);
    }

    @PatchMapping("/{gameId}")
    public ResponseEntity<GameDTO> updateGame(@PathVariable Integer leagueId, @PathVariable Integer seasonId, @PathVariable Integer gameId, @RequestBody GameRequest gameRequest) {
        return gameService.updateGame(leagueId, seasonId, gameId, gameRequest);
    }

    @DeleteMapping("/{gameId}")
    public ResponseEntity<?> deleteGame(@PathVariable Integer leagueId, @PathVariable Integer seasonId, @PathVariable Integer gameId) {
        return gameService.deleteGame(leagueId, seasonId, gameId);
    }

    @GetMapping("/stats")
    public ResponseEntity<List<TeamGameStatDTO>> getAllGameStatsBySeason(@PathVariable Integer leagueId, @PathVariable Integer seasonId) {
        return gameStatService.getAllGameStatsBySeason(seasonId);
    }

    @GetMapping("/{gameId}/stats")
    public ResponseEntity<List<TeamGameStatDTO>> getGameStatsForGame(@PathVariable Integer leagueId, @PathVariable Integer seasonId, @PathVariable Integer gameId) {
        return gameStatService.getGameStatsByGameId(gameId);
    }

    @PatchMapping("/{gameId}/stats")
    public ResponseEntity<List<TeamGameStatDTO>> updateGameStats(@PathVariable Integer leagueId, @PathVariable Integer seasonId, @PathVariable Integer gameId, @RequestBody List<GameStatRequest> gameStatRequests) {
        return gameStatService.updateGameStatsByGameId(gameId, seasonId, gameStatRequests);
    }

}
