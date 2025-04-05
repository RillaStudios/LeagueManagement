package com.iforddow.league_management.service.league;

import com.iforddow.league_management.dto.league.TeamGameStatDTO;
import com.iforddow.league_management.exception.ResourceNotFoundException;
import com.iforddow.league_management.jpa.entity.league.Game;
import com.iforddow.league_management.jpa.entity.team.TeamGameStats;
import com.iforddow.league_management.jpa.entity.team.TeamSeason;
import com.iforddow.league_management.jpa.entity.team.TeamSeasonStats;
import com.iforddow.league_management.repository.league.GameRepository;
import com.iforddow.league_management.repository.league.SeasonRepository;
import com.iforddow.league_management.repository.team.TeamGameStatsRepository;
import com.iforddow.league_management.repository.team.TeamSeasonRepository;
import com.iforddow.league_management.repository.team.TeamSeasonStatsRepository;
import com.iforddow.league_management.requests.league.GameRequest;
import com.iforddow.league_management.requests.league.GameStatRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GameStatService {

    private final TeamGameStatsRepository teamGameStatsRepository;

    private final GameRepository gameRepository;

    private final SeasonRepository seasonRepository;

    private final TeamSeasonStatsRepository teamSeasonStatsRepository;

    private final TeamSeasonRepository teamSeasonRepository;

    /*
    * A method to get all game stats associated with a season.
    *
    * @param seasonId
    *
    * @return ResponseEntity<List<TeamGameStatDTO>>
    *
    * @Author: IFD
    * @Since: 2025-03-27
    * */
    public ResponseEntity<List<TeamGameStatDTO>> getAllGameStatsBySeason(Integer seasonId) {

        seasonRepository.findById(seasonId).orElseThrow(() -> new ResourceNotFoundException("Season not found"));

        List<Game> games = gameRepository.findAllBySeason_Id(seasonId);

        if (games.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<TeamGameStatDTO> allGameStats = teamGameStatsRepository.findAllByGame_IdIn(games.stream().map(Game::getId).toList())
                .stream().map(TeamGameStatDTO::new).toList();

        if (allGameStats.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(allGameStats);

    }

    /*
    * A method to get all game stats associated with a game.
    *
    * @param gameId
    *
    * @return ResponseEntity<List<TeamGameStatDTO>>
    *
    * @Author: IFD
    * @Since: 2025-03-27
    * */
    public ResponseEntity<List<TeamGameStatDTO>> getGameStatsByGameId(Integer gameId) {

        List<TeamGameStatDTO> gameStats = teamGameStatsRepository.findAllByGame_Id(gameId)
                .stream().map(TeamGameStatDTO::new).toList();

        if (gameStats.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(gameStats);

    }

    /*
    * A method to get all games associated with a team in a season.
    *
    * @param teamId
    *
    * @return ResponseEntity<List<TeamGameStatDTO>>
    *
    * @Author: IFD
    * @Since: 2025-03-27
    * */
    public ResponseEntity<List<TeamGameStatDTO>> getGameStatsByTeamId(Integer teamId) {

        List<TeamGameStatDTO> gameStats = teamGameStatsRepository.findAllByTeam_Id(teamId)
                .stream().map(TeamGameStatDTO::new).toList();

        if (gameStats.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(gameStats);

    }

    @Transactional
    public ResponseEntity<List<TeamGameStatDTO>> updateGameStatsByGameId(Integer gameId, Integer seasonId, List<GameStatRequest> gameStatRequests) {

        for (GameStatRequest gameStatRequest : gameStatRequests) {
            TeamGameStats gameStat = teamGameStatsRepository.findById(gameStatRequest.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Team Game Stat not found"));

            gameStat.setPointsFor(gameStatRequest.getPointsFor());
            gameStat.setPointsAgainst(gameStatRequest.getPointsAgainst());

            TeamSeason teamSeason = teamSeasonRepository.findTeamSeasonByTeam_IdAndSeason_Id(gameStat.getTeam().getId(), seasonId);

            teamGameStatsRepository.save(gameStat);

            updateTeamSeasonStats(teamSeason.getId());
            
        }

        List<TeamGameStatDTO> gameStats = teamGameStatsRepository.findAllByGame_Id(gameId)
                .stream().map(TeamGameStatDTO::new).toList();

        if (gameStats.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(gameStats);

    }

    @Transactional
    public void updateTeamSeasonStats(Integer teamSeasonId) {
        TeamSeasonStats teamSeasonStats = teamSeasonStatsRepository.findTeamSeasonStatsByTeamSeasonId(teamSeasonId)
                .orElseThrow(() -> new ResourceNotFoundException("Team Season Stat not found"));

        // Reset the stats
        teamSeasonStats.setTotalPointsFor(0);
        teamSeasonStats.setTotalPointsAgainst(0);
        teamSeasonStats.setTotalWins(0);
        teamSeasonStats.setTotalLosses(0);
        teamSeasonStats.setTotalTies(0);

        List<TeamGameStats> teamGameStats = teamGameStatsRepository.findAllByTeam_Id(teamSeasonStats.getTeamSeason().getTeam().getId());

        for (TeamGameStats teamGameStat : teamGameStats) {

            if (teamGameStat.getTeam().getId().equals(teamSeasonStats.getTeamSeason().getTeam().getId())) {

                Instant gameDate = teamGameStat.getGame().getDate();

                teamSeasonStats.setTotalPointsFor(teamSeasonStats.getTotalPointsFor() + teamGameStat.getPointsFor());
                teamSeasonStats.setTotalPointsAgainst(teamSeasonStats.getTotalPointsAgainst() + teamGameStat.getPointsAgainst());

                if (teamGameStat.getPointsFor() > teamGameStat.getPointsAgainst()) {
                    teamSeasonStats.setTotalWins(teamSeasonStats.getTotalWins() + 1);
                } else if (teamGameStat.getPointsFor() < teamGameStat.getPointsAgainst()) {
                    teamSeasonStats.setTotalLosses(teamSeasonStats.getTotalLosses() + 1);
                } else {
                    if (!(gameDate.isAfter(Instant.now()) && teamGameStat.getPointsFor() == 0 && teamGameStat.getPointsAgainst() == 0)) {
                        teamSeasonStats.setTotalTies(teamSeasonStats.getTotalTies() + 1);
                    }
                }

            }
        }

        teamSeasonStatsRepository.save(teamSeasonStats);
    }

}
