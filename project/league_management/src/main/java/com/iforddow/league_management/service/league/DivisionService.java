package com.iforddow.league_management.service.league;

import com.iforddow.league_management.dto.league.ConferenceDTO;
import com.iforddow.league_management.dto.league.DivisionDTO;
import com.iforddow.league_management.dto.team.TeamDTO;
import com.iforddow.league_management.exception.ResourceNotFoundException;
import com.iforddow.league_management.jpa.entity.league.Conference;
import com.iforddow.league_management.jpa.entity.league.Division;
import com.iforddow.league_management.jpa.entity.league.League;
import com.iforddow.league_management.repository.league.ConferenceRepository;
import com.iforddow.league_management.repository.league.DivisionRepository;
import com.iforddow.league_management.repository.league.LeagueRepository;
import com.iforddow.league_management.repository.team.TeamRepository;
import com.iforddow.league_management.requests.league.DivisionRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DivisionService {

    private final DivisionRepository divisionRepository;

    private final LeagueRepository leagueRepository;

    private final TeamRepository teamRepository;

    private final ConferenceRepository conferenceRepository;

    /*
    * A method to get all divisions
    *
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-11
    * */
    public ResponseEntity<List<DivisionDTO>> getAllDivisions(Integer leagueId) {

        List<DivisionDTO> allDivisions = divisionRepository
                .findDivisionsByLeagueId(leagueId)
                .orElseThrow(() -> new ResourceNotFoundException("Divisions not found"))
                .stream()
                .map(DivisionDTO::new).toList();

        return ResponseEntity.ok(allDivisions);
    }

    /*
    * A method to get a division by id
    *
    * @param id
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-11
    * */
    public ResponseEntity<DivisionDTO> getDivisionById(Integer id, Integer leagueId) {

        DivisionDTO division = divisionRepository.findDivisionByIdAndLeagueId(id, leagueId)
                .map(DivisionDTO::new)
                .orElseThrow(() -> new RuntimeException("Division not found"));

        return ResponseEntity.ok(division);

    }

    /*
    * A method to get teams by division id and league id
    *
    * @param leagueId
    * @param divisionId
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-18
    * */
    public ResponseEntity<List<TeamDTO>> getTeamsByDivisionId(Integer leagueId, Integer divisionId) {

        List<TeamDTO> teams = teamRepository.findTeamsByLeague_IdAndDivision_Id(leagueId, divisionId)
                .stream()
                .map(TeamDTO::new)
                .toList();

        if (teams.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(teams);
    }

    /*
    * A method to get conference by division id
    *
    * @param leagueId
    * @param divisionId
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-18
    * */
    public ResponseEntity<ConferenceDTO> getConferenceByDivisionId(Integer leagueId, Integer divisionId) {

        Division division = divisionRepository.findDivisionByIdAndLeagueId(divisionId, leagueId)
                .orElseThrow(() -> new ResourceNotFoundException("Division not found"));

        Optional<ConferenceDTO> conference = Optional.ofNullable(division.getConference())
                .map(ConferenceDTO::new);

        return conference.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());

    }

    /*
    * A method to add a division
    *
    * @param divisionRequest
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-11
    * */
    @Transactional
    public ResponseEntity<?> addDivision(Integer leagueId, DivisionRequest divisionRequest) {

        League league = leagueRepository
                .findLeagueById(leagueId)
                .orElseThrow(() -> new ResourceNotFoundException("League not found"));

        Division division = Division.builder()
                .name(divisionRequest.getDivisionName())
                .league(league)
                .build();

        divisionRepository.save(division);

        return ResponseEntity.status(HttpStatus.CREATED).build();

    }

    /*
    * A method to update a division
    *
    * @param id
    * @param divisionRequest
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-11
    * */
    @Transactional
    public ResponseEntity<?> updateDivision(Integer leagueId, Integer divisionId, DivisionRequest divisionRequest) {

        Division division = divisionRepository.findDivisionByIdAndLeagueId(divisionId, leagueId)
                .orElseThrow(() -> new ResourceNotFoundException("Division with " + divisionId + " not found"));

        if(divisionRequest.getConferenceId() != null) {

            System.out.println("Conference ID: " + divisionRequest.getConferenceId());

            Conference conference = conferenceRepository.findById(divisionRequest.getConferenceId())
                    .orElseThrow(() -> new ResourceNotFoundException("Conference not found"));

            division.setConference(conference);
        }

        division.setName(divisionRequest.getDivisionName());

        divisionRepository.save(division);

        return ResponseEntity.ok().build();

    }

    /*
    * A method to delete a division
    *
    * @param id
    * @return ResponseEntity<?>
    *
    * Author: IFD
    * @Since: 2025-02-11
    * */
    @Transactional
    public ResponseEntity<?> deleteDivision(Integer id, Integer leagueId) {

        Division division = divisionRepository.findDivisionByIdAndLeagueId(id, leagueId)
                .orElseThrow(() -> new ResourceNotFoundException("Division not found"));

        divisionRepository.delete(division);

        return ResponseEntity.noContent().build();

    }

}
