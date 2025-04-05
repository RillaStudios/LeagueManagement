package com.iforddow.league_management.service.team;

import com.iforddow.league_management.dto.team.TeamDTO;
import com.iforddow.league_management.exception.ResourceNotFoundException;
import com.iforddow.league_management.jpa.entity.User;
import com.iforddow.league_management.jpa.entity.league.Division;
import com.iforddow.league_management.jpa.entity.league.League;
import com.iforddow.league_management.jpa.entity.team.Team;
import com.iforddow.league_management.jpa.entity.team.TeamSeason;
import com.iforddow.league_management.repository.UserRepository;
import com.iforddow.league_management.repository.league.DivisionRepository;
import com.iforddow.league_management.repository.league.LeagueRepository;
import com.iforddow.league_management.repository.team.TeamRepository;
import com.iforddow.league_management.repository.team.TeamSeasonRepository;
import com.iforddow.league_management.requests.team.TeamRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final LeagueRepository leagueRepository;

    private final DivisionRepository divisionRepository;

    private final TeamRepository teamRepository;

    private final UserRepository userRepository;

    private final TeamSeasonRepository teamSeasonRepository;

    /*
    * A method to get all teams of a league
    *
    * @param leagueId: The ID of the league
    * @return A list of all teams in the league
    *
    * @Author: IFD
    * @Since: 2025-02-11
    * */
    public ResponseEntity<List<TeamDTO>> getAllTeams(Integer leagueId) {

        return ResponseEntity.ok(teamRepository.findTeamsByLeagueId(leagueId)
                .orElseThrow(() -> new ResourceNotFoundException("No teams found"))
                .stream()
                .map(TeamDTO::new)
                .toList());

    }

    /*
    * A method to get a team by its ID
    *
    * @param teamId: The ID of the team
    *
    * @return The team with the given ID
    *
    * @Author: IFD
    * @Since: 2025-02-11
    * */
    public ResponseEntity<TeamDTO> getTeamById(Integer teamId) {

        return ResponseEntity.ok(teamRepository.findById(teamId)
                .map(TeamDTO::new)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found")));

    }

    /*
    * A method to get a team by its ID
    *
    * @param leagueId: The ID of the league
    * @param teamId: The ID of the team
    * @return The team with the given ID
    *
    * @Author: IFD
    * @Since: 2025-02-11
    * */
    public ResponseEntity<TeamDTO> getTeamById(Integer leagueId, Integer teamId) {

        return ResponseEntity.ok(teamRepository.findTeamByIdAndLeagueId(teamId, leagueId)
                .map(TeamDTO::new)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found")));

    }

    /*
    * A method to create a new team
    *
    * @param leagueId: The ID of the league
    * @param teamDTO: The team to be created
    * @return The created team
    *
    * @Author: IFD
    * @Since: 2025-02-11
    * */
    @Transactional
    public ResponseEntity<TeamDTO> createTeam(Integer leagueId, TeamRequest teamRequest) {

        League league = leagueRepository
                .findLeagueById(leagueId)
                .orElseThrow(() -> new ResourceNotFoundException("League not found"));

        Division division = divisionRepository
                .findDivisionByIdAndLeagueId(teamRequest.getDivisionId(), leagueId)
                .orElse(null);

        User user = userRepository.findUserById(teamRequest.getOwnerId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Team team = Team.builder()
                .name(teamRequest.getTeamName())
                .location(teamRequest.getLocation())
                .league(league)
                .division(division)
                .owner(user)
                .build();

        teamRepository.save(team);

        return ResponseEntity.status(HttpStatus.CREATED).body(new TeamDTO(team));

    }

    /*
    * A method to update a team
    *
    * @param leagueId: The ID of the league
    * @param teamId: The ID of the team
    * @param teamRequest: The updated team
    * @return The updated team
    *
    * @Author: IFD
    * @Since: 2025-02-11
    * */
    @Transactional
    public ResponseEntity<TeamDTO> updateTeam(Integer leagueId, Integer teamId, TeamRequest teamRequest) {

        Team team = teamRepository.findTeamByIdAndLeagueId(teamId, leagueId)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found"));

        Division division = divisionRepository
                .findDivisionByIdAndLeagueId(teamRequest.getDivisionId(), leagueId)
                .orElse(null);

        User user = userRepository.findUserById(teamRequest.getOwnerId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        team.setName(teamRequest.getTeamName());
        team.setLocation(teamRequest.getLocation());
        team.setDivision(division);
        team.setOwner(user);

        teamRepository.save(team);

        return ResponseEntity.ok(new TeamDTO(team));

    }

    /*
    * A method to delete a team
    *
    * @param leagueId: The ID of the league
    * @param teamId: The ID of the team
    * @return The deleted team
    *
    * @Author: IFD
    * @Since: 2025-02-11
    * */
    @Transactional
    public ResponseEntity<?> deleteTeam(Integer leagueId, Integer teamId) {

        Team team = teamRepository.findTeamByIdAndLeagueId(teamId, leagueId)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found"));

        teamRepository.delete(team);

        return ResponseEntity.ok().build();

    }

    /*
    * A method to get all teams in a season
    *
    * @param leagueId: The ID of the league
    * @param seasonId: The ID of the season
    *
    * @return A list of all teams in the season
    *
    * @Author: IFD
    * @Since: 2025-03-29
    * */
    public ResponseEntity<List<TeamDTO>> getAllTeamsBySeason(Integer leagueId, Integer seasonId) {

        List<TeamSeason> teamSeasons = teamSeasonRepository.findTeamSeasonsBySeasonId(seasonId);

        if (teamSeasons.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<TeamDTO> teams = teamSeasons.stream()
                .map(teamSeason -> teamRepository.findTeamByIdAndLeagueId(teamSeason.getTeam().getId(), leagueId)
                        .map(TeamDTO::new)
                        .orElse(null))
                .filter(Objects::nonNull)
                .toList();

        if (teams.isEmpty()) {
            return ResponseEntity.noContent().build();

        }

        return ResponseEntity.ok(teams);

    }

    @Transactional
    public ResponseEntity<TeamDTO> addNewsItem(Integer leagueId, Integer teamId) {

        Team team = teamRepository.findTeamByIdAndLeagueId(teamId, leagueId)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found"));



        return ResponseEntity.ok(new TeamDTO(team));

    }

}
