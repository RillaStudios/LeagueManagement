package com.iforddow.league_management.service.league;

import com.iforddow.league_management.dto.league.ConferenceDTO;
import com.iforddow.league_management.dto.league.DivisionDTO;
import com.iforddow.league_management.dto.team.TeamDTO;
import com.iforddow.league_management.exception.ResourceNotFoundException;
import com.iforddow.league_management.jpa.entity.league.Conference;
import com.iforddow.league_management.jpa.entity.league.League;
import com.iforddow.league_management.repository.league.ConferenceRepository;
import com.iforddow.league_management.repository.league.DivisionRepository;
import com.iforddow.league_management.repository.league.LeagueRepository;
import com.iforddow.league_management.repository.team.TeamRepository;
import com.iforddow.league_management.requests.league.ConferenceRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConferenceService {

    private final ConferenceRepository conferenceRepository;

    private final DivisionRepository divisionRepository;

    private final LeagueRepository leagueRepository;

    private final TeamRepository teamRepository;

    /*
    * A method to get all conferences by league id
    *
    * @param leagueId
    * @return ResponseEntity<List<ConferenceDTO>>
    *
    * @Author: IFD
    * @Since: 2025-02-18
    * */
    public ResponseEntity<List<ConferenceDTO>> getAllConferencesByLeagueId(Integer leagueId) {

        List<ConferenceDTO> conferences = conferenceRepository
                .findAllByLeague_Id(leagueId)
                .stream().map(ConferenceDTO::new).toList();

        if (conferences.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(conferences);

    }

    /*
    * A method to get a specific conference by league id and conference id
    *
    * @param leagueId
    * @param conferenceId
    * @return ResponseEntity<ConferenceDTO>
    *
    * @Author: IFD
    * @Since: 2025-02-18
    * */
    public ResponseEntity<ConferenceDTO> getConferenceByLeagueIdAndConferenceId(Integer leagueId, Integer conferenceId) {

        ConferenceDTO conference = conferenceRepository
                .findByIdAndLeagueId(conferenceId, leagueId)
                .map(ConferenceDTO::new)
                .orElseThrow(() -> new ResourceNotFoundException("Conference not found"));

        return ResponseEntity.ok(conference);

    }

    /*
    * A method to get divisions by conference id
    *
    * @param leagueId
    * @param conferenceId
    * @return ResponseEntity<DivisionDTO>
    *
    * @Author: IFD
    * @Since: 2025-02-18
    * */
    public ResponseEntity<List<DivisionDTO>> getDivisionsByConferenceId(Integer leagueId, Integer conferenceId) {

        List<DivisionDTO> divisions = divisionRepository
                .findDivisionsByLeague_IdAndConference_Id(leagueId, conferenceId)
                .stream()
                .map(DivisionDTO::new)
                .toList();

        if (divisions.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(divisions);

    }

    /*
    * A method to get teams by conference id
    *
    * @param leagueId
    * @param conferenceId
    * @return ResponseEntity<TeamDTO>
    *
    * @Author: IFD
    * @Since: 2025-02-18
    * */
    public ResponseEntity<List<TeamDTO>> getTeamsByConferenceId(Integer leagueId, Integer conferenceId) {

        List<TeamDTO> teams = teamRepository.findTeamsByLeague_IdAndConference_Id(leagueId, conferenceId)
                .stream()
                .map(TeamDTO::new)
                .toList();

        if (teams.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(teams);

    }

    /*
    * A method to add a conference
    *
    * @param leagueId
    * @param conferenceRequest
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-18
    * */
    @Transactional
    public ResponseEntity<ConferenceDTO> addConference(Integer leagueId, ConferenceRequest conferenceRequest) {

        League league = leagueRepository
                .findLeagueById(leagueId)
                .orElseThrow(() -> new ResourceNotFoundException("League not found"));

        Conference conference = Conference.builder()
                .name(conferenceRequest.getName())
                .league(league)
                .build();

        conferenceRepository.save(conference);

        return ResponseEntity.status(HttpStatus.CREATED).body(new ConferenceDTO(conference));

    }

    /*
    * A method to update a conference
    *
    * @param leagueId
    * @param conferenceId
    * @param conferenceRequest
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-18
    * */
    @Transactional
    public ResponseEntity<ConferenceDTO> updateConference(Integer leagueId, Integer conferenceId, ConferenceRequest conferenceRequest) {

        Conference conference = conferenceRepository
                .findByIdAndLeagueId(conferenceId, leagueId)
                .orElseThrow(() -> new ResourceNotFoundException("Conference not found"));

        conference.setName(conferenceRequest.getName());

        conferenceRepository.save(conference);

        return ResponseEntity.ok().body(new ConferenceDTO(conference));

    }

    /*
    * A method to delete a conference
    *
    * @param leagueId
    * @param conferenceId
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-18
    * */
    @Transactional
    public ResponseEntity<?> deleteConference(Integer leagueId, Integer conferenceId) {

        Conference conference = conferenceRepository
                .findByIdAndLeagueId(conferenceId, leagueId)
                .orElseThrow(() -> new ResourceNotFoundException("Conference not found"));

        conferenceRepository.delete(conference);

        return ResponseEntity.noContent().build();

    }

}
