package com.iforddow.league_management.service;

import com.iforddow.league_management.dto.league.SeasonDTO;
import com.iforddow.league_management.exception.ResourceNotFoundException;
import com.iforddow.league_management.jpa.entity.league.League;
import com.iforddow.league_management.jpa.entity.league.Season;
import com.iforddow.league_management.repository.league.LeagueRepository;
import com.iforddow.league_management.repository.league.SeasonRepository;
import com.iforddow.league_management.requests.league.SeasonRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SeasonService {

    // A repository for the Season entity
    private final SeasonRepository seasonRepository;

    // A repository for the League entity
    private final LeagueRepository leagueRepository;

    /*
    * A method to get all seasons under a league
    *
    * @param leagueId: The ID of the league
    * @return ResponseEntity: A response entity containing the list of seasons
    *
    * @Author: IFD
    * @Since: 2025-02-10
    * */
    public ResponseEntity<List<SeasonDTO>> getAllSeasons(Long leagueId) {

        List<SeasonDTO> allSeasons = seasonRepository
                .findAll().stream()
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
    public ResponseEntity<SeasonDTO> getSeasonById(Long leagueId, Long seasonId) {

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
    public ResponseEntity<?> createSeason(Long leagueId, SeasonRequest seasonRequest) {

        League league = leagueRepository
                .findLeagueById(leagueId)
                .orElseThrow(() -> new ResourceNotFoundException("No league found with ID: " + leagueId));

        Season newSeason = Season.builder()
                .seasonName(seasonRequest.getSeasonName())
                .startDate(seasonRequest.getStartDate())
                .endDate(seasonRequest.getEndDate())
                .league(league)
                .build();

        seasonRepository.save(newSeason);

        return ResponseEntity.ok().body(newSeason);

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
    public ResponseEntity<?> updateSeason(Long leagueId, Long seasonId, SeasonRequest seasonRequest) {

        Season season = seasonRepository
                .findSeasonsByIdAndLeagueId(seasonId, leagueId)
                .orElseThrow(() -> new ResourceNotFoundException("No season found with ID: " + seasonId));

        season.setSeasonName(seasonRequest.getSeasonName());
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
    public ResponseEntity<?> deleteSeason(Long leagueId, Long seasonId) {

        Season season = seasonRepository
                .findSeasonsByIdAndLeagueId(seasonId, leagueId)
                .orElseThrow(() -> new ResourceNotFoundException("No season found with ID: " + seasonId));

        seasonRepository.delete(season);

        return ResponseEntity.noContent().build();

    }

}
