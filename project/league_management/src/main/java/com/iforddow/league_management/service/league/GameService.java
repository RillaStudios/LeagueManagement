package com.iforddow.league_management.service.league;

import com.iforddow.league_management.dto.league.GameDTO;
import com.iforddow.league_management.exception.ResourceNotFoundException;
import com.iforddow.league_management.jpa.entity.league.Game;
import com.iforddow.league_management.jpa.entity.league.Season;
import com.iforddow.league_management.jpa.entity.league.Venue;
import com.iforddow.league_management.jpa.entity.team.Team;
import com.iforddow.league_management.jpa.entity.team.TeamGameStats;
import com.iforddow.league_management.repository.league.GameRepository;
import com.iforddow.league_management.repository.league.LeagueRepository;
import com.iforddow.league_management.repository.league.SeasonRepository;
import com.iforddow.league_management.repository.league.VenueRepository;
import com.iforddow.league_management.repository.team.TeamGameStatsRepository;
import com.iforddow.league_management.repository.team.TeamRepository;
import com.iforddow.league_management.requests.league.GameRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class GameService {

    private final LeagueRepository leagueRepository;

    private final SeasonRepository seasonRepository;

    private final TeamRepository teamRepository;

    private final GameRepository gameRepository;

    private final VenueRepository venueRepository;

    private final TeamGameStatsRepository teamGameStatsRepository;

    /*
    * A method to get all games associated with a season.
    *
    * @param leagueId
    * @param seasonId
    *
    * @return ResponseEntity<List<GameDTO>>
    *
    * @Author: IFD
    * @Since: 2025-03-27
    * */
    public ResponseEntity<List<GameDTO>> getAllGames(Integer leagueId, Integer seasonId) {

        leagueRepository.findLeagueById(leagueId).orElseThrow(() -> new ResourceNotFoundException("League not found"));

        List<GameDTO> allGames = gameRepository.findAllBySeason_Id(seasonId).stream().map(GameDTO::new).toList();

        if (allGames.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(allGames);
    }

    /*
    * A method to get a game by its ID.
    *
    * @param leagueId
    * @param seasonId
    * @param gameId
    *
    * @return ResponseEntity<GameDTO>
    *
    * @Author: IFD
    * @Since: 2025-03-27
    * */
    public ResponseEntity<GameDTO> getGameById(Integer leagueId, Integer seasonId, Integer gameId) {

        leagueRepository.findLeagueById(leagueId).orElseThrow(() -> new ResourceNotFoundException("League not found"));

        seasonRepository.findSeasonById(seasonId).orElseThrow(() -> new ResourceNotFoundException("Season not found"));

        GameDTO game = gameRepository.findGameById(gameId).map(GameDTO::new)
                .orElseThrow(() -> new ResourceNotFoundException("Game not found"));

        return ResponseEntity.ok(game);
    }

    /*
    * A method to get all games associated with a team.
    *
    * @param leagueId
    * @param seasonId
    * @param teamId
    *
    * @return ResponseEntity<List<GameDTO>>
    *
    * @Author: IFD
    * @Since: 2025-03-27
    * */
    public ResponseEntity<List<GameDTO>> getGamesByTeam(Integer leagueId, Integer seasonId, Integer teamId) {

        leagueRepository.findById(leagueId).orElseThrow(() -> new ResourceNotFoundException("League not found"));

        seasonRepository.findById(seasonId).orElseThrow(() -> new ResourceNotFoundException("Season not found"));

        List<GameDTO> homeGames = gameRepository.findGameByHomeTeam_Id(teamId).stream().map(GameDTO::new).toList();

        List<GameDTO> awayGames = gameRepository.findGameByAwayTeam_Id(teamId).stream().map(GameDTO::new).toList();

        List<GameDTO> games = Stream.concat(homeGames.stream(), awayGames.stream()).toList();

        if (games.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(games);
    }

    /*
    * A method to create a game.
    *
    * @param leagueId
    * @param seasonId
    * @param gameRequest
    *
    * @return ResponseEntity<GameDTO>
    *
    * @Author: IFD
    * @Since: 2025-03-27
    * */
    @Transactional
    public ResponseEntity<GameDTO> createGame(Integer leagueId, Integer seasonId, GameRequest gameRequest) {

        leagueRepository.findById(leagueId).orElseThrow(() -> new ResourceNotFoundException("League not found"));

        Season season = seasonRepository.findById(seasonId).orElseThrow(() -> new ResourceNotFoundException("Season not found"));

        Team homeTeam = teamRepository.findById(gameRequest.getHomeTeamId()).orElseThrow(() -> new ResourceNotFoundException("Team not found"));

        Team awayTeam = teamRepository.findById(gameRequest.getAwayTeamId()).orElseThrow(() -> new ResourceNotFoundException("Team not found"));

        Venue venue = venueRepository.findById(gameRequest.getVenueId()).orElse(null);

        Game game = Game.builder().homeTeam(homeTeam).awayTeam(awayTeam).season(season).venue(venue).date(gameRequest.getGameDate()).build();

        Game savedGame = gameRepository.save(game);

        TeamGameStats homeTeamGameStats = TeamGameStats.builder().game(savedGame).team(homeTeam).pointsAgainst(0).pointsFor(0).build();

        TeamGameStats awayTeamGameStats = TeamGameStats.builder().game(savedGame).team(awayTeam).pointsAgainst(0).pointsFor(0).build();

        teamGameStatsRepository.save(homeTeamGameStats);

        teamGameStatsRepository.save(awayTeamGameStats);

        return ResponseEntity.ok(new GameDTO(savedGame));
    }

    /*
    * A method to update a game.
    *
    * @param leagueId
    * @param seasonId
    * @param gameId
    *
    * @return ResponseEntity<GameDTO>
    *
    * @Author: IFD
    * @Since: 2025-03-27
    * */
    @Transactional
    public ResponseEntity<GameDTO> updateGame(Integer leagueId, Integer seasonId, Integer gameId, GameRequest gameRequest) {

        leagueRepository.findById(leagueId).orElseThrow(() -> new ResourceNotFoundException("League not found"));

        seasonRepository.findById(seasonId).orElseThrow(() -> new ResourceNotFoundException("Season not found"));

        Game game = gameRepository.findGameById(gameId).orElseThrow(() -> new ResourceNotFoundException("Game not found"));

        Team homeTeam = teamRepository.findById(gameRequest.getHomeTeamId()).orElseThrow(() -> new ResourceNotFoundException("Team not found"));

        Team awayTeam = teamRepository.findById(gameRequest.getAwayTeamId()).orElseThrow(() -> new ResourceNotFoundException("Team not found"));

        Venue venue = venueRepository.findById(gameRequest.getVenueId()).orElse(null);

        game.setHomeTeam(homeTeam);
        game.setAwayTeam(awayTeam);
        game.setVenue(venue);
        game.setDate(gameRequest.getGameDate());

        Game updatedGame = gameRepository.save(game);

        return ResponseEntity.ok(new GameDTO(updatedGame));
    }

    /*
    * A method to delete a game.
    *
    * @param leagueId
    * @param seasonId
    * @param gameId
    *
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-03-27
    * */
    @Transactional
    public ResponseEntity<?> deleteGame(Integer leagueId, Integer seasonId, Integer gameId) {

        leagueRepository.findById(leagueId).orElseThrow(() -> new ResourceNotFoundException("League not found"));

        seasonRepository.findById(seasonId).orElseThrow(() -> new ResourceNotFoundException("Season not found"));

        Game game = gameRepository.findGameById(gameId).orElseThrow(() -> new ResourceNotFoundException("Game not found"));

        gameRepository.delete(game);

        return ResponseEntity.noContent().build();
    }

}
