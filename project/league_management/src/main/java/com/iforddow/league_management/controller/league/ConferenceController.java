package com.iforddow.league_management.controller.league;

import com.iforddow.league_management.dto.league.ConferenceDTO;
import com.iforddow.league_management.requests.league.ConferenceRequest;
import com.iforddow.league_management.service.league.ConferenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/leagues/{leagueId}/conferences")
public class ConferenceController {

    private final ConferenceService conferenceService;

    @GetMapping("/")
    public ResponseEntity<List<ConferenceDTO>> getAllConferences(@PathVariable Integer leagueId) {

        return conferenceService.getAllConferencesByLeagueId(leagueId);

    }

    @GetMapping("/{conferenceId}")
    public ResponseEntity<ConferenceDTO> getConferenceById(@PathVariable Integer leagueId, @PathVariable Integer conferenceId) {

        return conferenceService.getConferenceByLeagueIdAndConferenceId(leagueId, conferenceId);

    }

    @PostMapping("/")
    public ResponseEntity<?> addConference(@PathVariable Integer leagueId, @RequestBody ConferenceRequest conferenceRequest) {

        return conferenceService.addConference(leagueId, conferenceRequest);

    }

    @PatchMapping("/{conferenceId}")
    public ResponseEntity<?> updateConference(@PathVariable Integer leagueId, @PathVariable Integer conferenceId, @RequestBody ConferenceRequest conferenceRequest) {

        return conferenceService.updateConference(leagueId, conferenceId, conferenceRequest);

    }

    @DeleteMapping("/{conferenceId}")
    public ResponseEntity<?> deleteConference(@PathVariable Integer leagueId, @PathVariable Integer conferenceId) {

        return conferenceService.deleteConference(leagueId, conferenceId);

    }

    @GetMapping("/{conferenceId}/divisions")
    public ResponseEntity<?> getDivisionsByConferenceId(@PathVariable Integer leagueId, @PathVariable Integer conferenceId) {

        return conferenceService.getDivisionsByConferenceId(leagueId, conferenceId);

    }

    @GetMapping("/{conferenceId}/teams")
    public ResponseEntity<?> getTeamsByConferenceId(@PathVariable Integer leagueId, @PathVariable Integer conferenceId) {

        return conferenceService.getTeamsByConferenceId(leagueId, conferenceId);

    }

}
