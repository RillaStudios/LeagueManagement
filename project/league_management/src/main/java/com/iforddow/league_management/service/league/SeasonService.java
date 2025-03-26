package com.iforddow.league_management.service.league;

import com.iforddow.league_management.dto.league.SeasonDTO;
import com.iforddow.league_management.dto.team.TeamSeasonStatsDTO;
import com.iforddow.league_management.exception.ResourceNotFoundException;
import com.iforddow.league_management.jpa.entity.league.League;
import com.iforddow.league_management.jpa.entity.league.Season;
import com.iforddow.league_management.jpa.entity.team.Team;
import com.iforddow.league_management.jpa.entity.team.TeamSeason;
import com.iforddow.league_management.jpa.entity.team.TeamSeasonStats;
import com.iforddow.league_management.repository.league.LeagueRepository;
import com.iforddow.league_management.repository.league.SeasonRepository;
import com.iforddow.league_management.repository.team.TeamRepository;
import com.iforddow.league_management.repository.team.TeamSeasonRepository;
import com.iforddow.league_management.repository.team.TeamSeasonStatsRepository;
import com.iforddow.league_management.requests.league.SeasonRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class SeasonService {

    // A repository for the Season entity
    private final SeasonRepository seasonRepository;

    // A repository for the League entity
    private final LeagueRepository leagueRepository;

    // A repository for the TeamSeason entity
    private final TeamSeasonRepository teamSeasonRepository;

    // A repository for the TeamSeasonStats entity
    private final TeamSeasonStatsRepository teamSeasonStatsRepository;

    // A repository for teams
    private final TeamRepository teamRepository;

    /*
    * A method to get all seasons under a league
    *
    * @param leagueId: The ID of the league
    * @return ResponseEntity: A response entity containing the list of seasons
    *
    * @Author: IFD
    * @Since: 2025-02-10
    * */
    public ResponseEntity<List<SeasonDTO>> getAllSeasons(Integer leagueId) {

        List<SeasonDTO> allSeasons = seasonRepository
                .findSeasonListByLeagueId(leagueId).stream()
                .map(SeasonDTO::new).toList();

        if (allSeasons.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(allSeasons);

    }

    /*
    * A method to get a season by ID
    *
    * @param leagueId: The ID of the league
    * @param seasonId: The ID of the season
    * @return ResponseEntity: A response entity containing the season object
    *
    * @Author: IFD
    * @Since: 2025-02-10
    * */
    public ResponseEntity<SeasonDTO> getSeasonById(Integer leagueId, Integer seasonId) {

        SeasonDTO season = seasonRepository
                .findSeasonsByIdAndLeagueId(seasonId, leagueId)
                .map(SeasonDTO::new)
                .orElseThrow(() -> new ResourceNotFoundException("No season found with ID: " + seasonId));

        return ResponseEntity.ok().body(season);

    }

    /*
    * A method to create a new season
    *
    * @param leagueId: The ID of the league
    * @param seasonRequest: The request object containing the season details
    * @return ResponseEntity: A response entity containing the newly created season object
    *
    * @Author: IFD
    * @Since: 2025-02-10
    * */
    @Transactional
    public ResponseEntity<?> createSeason(Integer leagueId, SeasonRequest seasonRequest) {

        League league = leagueRepository
                .findLeagueById(leagueId)
                .orElseThrow(() -> new ResourceNotFoundException("No league found with ID: " + leagueId));

        Season newSeason = Season.builder()
                .startDate(seasonRequest.getStartDate())
                .endDate(seasonRequest.getEndDate())
                .league(league)
                .build();

        seasonRepository.save(newSeason);

        List<Team> teams = teamRepository.findTeamsByLeagueId(leagueId)
                .orElse(null);

        if(teams == null) {
            return ResponseEntity.badRequest().body("No teams found for the league");
        }

        for(var team : teams) {

            TeamSeason teamSeason = TeamSeason.builder()
                    .team(team)
                    .season(newSeason)
                    .build();

            teamSeasonRepository.save(teamSeason);

            TeamSeasonStats teamSeasonStats = TeamSeasonStats.builder()
                    .teamSeason(teamSeason)
                    .totalWins(0)
                    .totalLosses(0)
                    .totalPointsAgainst(0)
                    .totalTies(0)
                    .totalPointsFor(0)
                    .build();

            teamSeasonStatsRepository.save(teamSeasonStats);

        }

        return ResponseEntity.ok().body(new SeasonDTO(newSeason));

    }

    /*
    * A method to update a season
    *
    * @param leagueId: The ID of the league
    * @param seasonId: The ID of the season
    * @param seasonRequest: The request object containing the updated season details
    * @return ResponseEntity: A response entity indicating the success of the operation
    *
    * @Author: IFD
    * @Since: 2025-02-10
    * */
    @Transactional
    public ResponseEntity<?> updateSeason(Integer leagueId, Integer seasonId, SeasonRequest seasonRequest) {

        Season season = seasonRepository
                .findSeasonsByIdAndLeagueId(seasonId, leagueId)
                .orElseThrow(() -> new ResourceNotFoundException("No season found with ID: " + seasonId));

        season.setStartDate(seasonRequest.getStartDate());
        season.setEndDate(seasonRequest.getEndDate());

        seasonRepository.save(season);

        return ResponseEntity.ok().build();

    }

    /*
    * A method to delete a season
    *
    * @param leagueId: The ID of the league
    * @param seasonId: The ID of the season
    * @return ResponseEntity: A response entity indicating the success of the operation
    *
    * @Author: IFD
    * @Since: 2025-02-10
    * */
    @Transactional
    public ResponseEntity<?> deleteSeason(Integer leagueId, Integer seasonId) {

        Season season = seasonRepository
                .findSeasonsByIdAndLeagueId(seasonId, leagueId)
                .orElseThrow(() -> new ResourceNotFoundException("No season found with ID: " + seasonId));

        seasonRepository.delete(season);

        return ResponseEntity.noContent().build();

    }

    public ResponseEntity<List<TeamSeasonStatsDTO>> getSeasonStats(Integer seasonId) {

        List<TeamSeason> teamSeasons = teamSeasonRepository
                .findTeamSeasonsBySeasonId(seasonId).stream()
                .toList();

        List<TeamSeasonStatsDTO> teamSeasonStatsList = teamSeasons.stream()
                .map(teamSeason -> teamSeasonStatsRepository
                        .findTeamSeasonStatsByTeamSeasonId(teamSeason.getId())
                        .map(TeamSeasonStatsDTO::new)
                        .orElse(null))
                .filter(Objects::nonNull)
                .toList();

        System.out.println("teamSeasonStatsList = " + teamSeasonStatsList);

        if (teamSeasonStatsList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(teamSeasonStatsList);

    }

}
