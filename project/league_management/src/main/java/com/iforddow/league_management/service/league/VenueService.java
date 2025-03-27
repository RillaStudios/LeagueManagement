package com.iforddow.league_management.service.league;

import com.iforddow.league_management.dto.league.VenueDTO;
import com.iforddow.league_management.exception.ResourceNotFoundException;
import com.iforddow.league_management.jpa.entity.league.League;
import com.iforddow.league_management.jpa.entity.league.Venue;
import com.iforddow.league_management.repository.league.LeagueRepository;
import com.iforddow.league_management.repository.league.VenueRepository;
import com.iforddow.league_management.requests.league.VenueRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VenueService {

    // Add VenueRepository
    private final VenueRepository venueRepository;

    // Add LeagueRepository
    private final LeagueRepository leagueRepository;

    /*
    * A method that returns all venues of a league
    *
    * @param leagueId The id of the league
    * @return A list of VenueDTOs
    *
    * @throws ResourceNotFoundException If the league is not found
    *
    * @return A list of VenueDTOs
    *
    * @see VenueDTO
    * @see VenueRepository#findAllByLeague_Id(Integer)
    *
    * @Author IFD
    * @Since: 2025-03-26
    * */
    public ResponseEntity<List<VenueDTO>> getAllVenues(Integer leagueId) {

        leagueRepository.findById(leagueId).orElseThrow(() -> new ResourceNotFoundException("League not found"));

        List<VenueDTO> venues = venueRepository.findAllByLeague_Id(leagueId).stream().map(VenueDTO::new).toList();

        return ResponseEntity.ok(venues);
    }

    /*
    * A method that returns a venue by its id
    *
    * @param leagueId The id of the league
    * @param venueId The id of the venue
    *
    * @return A VenueDTO
    *
    * @throws ResourceNotFoundException If the league or the venue is not found
    *
    * @see VenueDTO
    *
    * @Author IFD
    * @Since: 2025-03-26
    * */
    public ResponseEntity<VenueDTO> getVenueById(Integer leagueId, Integer venueId) {

        leagueRepository.findById(leagueId).orElseThrow(() -> new ResourceNotFoundException("League not found"));

        VenueDTO venue = venueRepository.findById(venueId).map(VenueDTO::new)
                .orElseThrow(() -> new ResourceNotFoundException("Venue not found"));

        return ResponseEntity.ok(venue);
    }

    /*
    * A method that creates a venue
    *
    * @param leagueId The id of the league
    * @param venueRequest The request body of the venue
    *
    * @return A VenueDTO
    *
    * @Author IFD
    * @Since: 2025-03-26
    * */
    @Transactional
    public ResponseEntity<VenueDTO> createVenue(Integer leagueId, VenueRequest venueRequest) {

        League league = leagueRepository.findById(leagueId).orElseThrow(() -> new ResourceNotFoundException("League not found"));

        Venue venue = Venue.builder()
                .address(venueRequest.getAddress())
                .link(venueRequest.getLink())
                .league(league).build();

        venueRepository.save(venue);

        return ResponseEntity.ok(new VenueDTO(venue));
    }

    /*
    * A method that updates a venue
    *
    * @param leagueId The id of the league
    * @param venueId The id of the venue
    *
    * @return A VenueDTO
    *
    * @Author IFD
    * @Since: 2025-03-26
    * */
    @Transactional
    public ResponseEntity<VenueDTO> updateVenue(Integer leagueId, Integer venueId, VenueRequest venueRequest) {

        League league = leagueRepository.findById(leagueId).orElseThrow(() -> new ResourceNotFoundException("League not found"));

        Venue venue = venueRepository.findById(venueId).orElseThrow(() -> new ResourceNotFoundException("Venue not found"));

        venue.setAddress(venueRequest.getAddress());
        venue.setLink(venueRequest.getLink());
        venue.setLeague(league);

        venueRepository.save(venue);

        return ResponseEntity.ok(new VenueDTO(venue));
    }

    /*
    * A method that deletes a venue
    *
    * @param leagueId The id of the league
    * @param venueId The id of the venue
    *
    * @return A ResponseEntity with no content
    *
    * @Author IFD
    * @Since: 2025-03-26
    * */
    @Transactional
    public ResponseEntity<Void> deleteVenue(Integer leagueId, Integer venueId) {

        leagueRepository.findById(leagueId).orElseThrow(() -> new ResourceNotFoundException("League not found"));

        Venue venue = venueRepository.findById(venueId).orElseThrow(() -> new ResourceNotFoundException("Venue not found"));

        venueRepository.delete(venue);

        return ResponseEntity.noContent().build();
    }

}
