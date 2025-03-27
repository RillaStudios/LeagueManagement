package com.iforddow.league_management.controller.league;

import com.iforddow.league_management.dto.league.VenueDTO;
import com.iforddow.league_management.requests.league.VenueRequest;
import com.iforddow.league_management.service.league.VenueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/leagues/{leagueId}/venues")
public class VenueController {

    // Add VenueService
    private final VenueService venueService;

    /*
    * A method that returns all venues of a league
    *
    * @Author IFD
    * @Since: 2025-03-26
    * */
    @GetMapping("/")
    public ResponseEntity<List<VenueDTO>> getVenues(@PathVariable Integer leagueId) {
        return venueService.getAllVenues(leagueId);
    }

    /*
    * A method that returns a venue by its id
    *
    * @Author IFD
    * @Since: 2025-03-26
    * */
    @GetMapping("/{venueId}")
    public ResponseEntity<VenueDTO> getVenueById(@PathVariable Integer leagueId, @PathVariable Integer venueId) {
        return venueService.getVenueById(leagueId, venueId);
    }

    /*
    * A method that creates a venue
    *
    * @Author IFD
    * @Since: 2025-03-26
    * */
    @PostMapping("/")
    public ResponseEntity<VenueDTO> createVenue(@PathVariable Integer leagueId, @RequestBody VenueRequest venueRequest) {
        return venueService.createVenue(leagueId, venueRequest);
    }

    /*
    * A method that updates a venue
    *
    * @Author IFD
    * @Since: 2025-03-26
    * */
    @PatchMapping("/{venueId}")
    public ResponseEntity<VenueDTO> updateVenue(@PathVariable Integer leagueId, @PathVariable Integer venueId, @RequestBody VenueRequest venueRequest) {
        return venueService.updateVenue(leagueId, venueId, venueRequest);
    }

    /*
    * A method that deletes a venue
    *
    * @Author IFD
    * @Since: 2025-03-26
    * */
    @DeleteMapping("/{venueId}")
    public ResponseEntity<Void> deleteVenue(@PathVariable Integer leagueId, @PathVariable Integer venueId) {
        return venueService.deleteVenue(leagueId, venueId);
    }

}
