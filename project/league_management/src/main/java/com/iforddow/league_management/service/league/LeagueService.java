package com.iforddow.league_management.service.league;

import com.iforddow.league_management.dto.league.LeagueDTO;
import com.iforddow.league_management.exception.ResourceNotFoundException;
import com.iforddow.league_management.jpa.entity.User;
import com.iforddow.league_management.jpa.entity.league.League;
import com.iforddow.league_management.repository.UserRepository;
import com.iforddow.league_management.repository.league.LeagueRepository;
import com.iforddow.league_management.requests.league.LeagueRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.*;

/*
* A service class to handle league operations
*
* @Author: IFD
* @Since: 2025-02-07
* */
@Service
@RequiredArgsConstructor
public class LeagueService {

    private final LeagueRepository leagueRepository;

    /*
    * A method to get all leagues
    *
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    public ResponseEntity<List<LeagueDTO>> getAllLeagues() {

        List<LeagueDTO> allLeagues = leagueRepository.findAll().stream().map(LeagueDTO::new).toList();

        if (allLeagues.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(allLeagues);

    }

    /*
    * A method to get a league by id
    *
    * @param id
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    public ResponseEntity<LeagueDTO> getLeagueById(Integer id) {

        LeagueDTO league = leagueRepository.findLeagueById(id)
                .map(LeagueDTO::new)
                .orElseThrow(() -> new ResourceNotFoundException("League not found"));

        return ResponseEntity.ok(league);

    }

    /*
    * A method to add a league
    *
    * @param leagueRequest
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @Transactional
    public ResponseEntity<?> createLeague(LeagueRequest leagueRequest, Principal connectedUser) {

        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        if(user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        League newLeague = League.builder()
                .name(leagueRequest.getLeagueName())
                .gameType(leagueRequest.getGameType())
                .description(leagueRequest.getLeagueDescription())
                .location(leagueRequest.getLocation())
                .createdBy(user)
                .createdAt(new Date().toInstant())
                .build();

        leagueRepository.save(newLeague);

        return ResponseEntity.status(HttpStatus.CREATED).build();

    }

    /*
    * A method to update a league
    *
    * @param id
    * @param leagueRequest
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @Transactional
    public ResponseEntity<?> updateLeague(Integer id, LeagueRequest leagueRequest) {

        League league = leagueRepository
                .findLeagueById(id)
                .orElseThrow(() -> new ResourceNotFoundException("League not found"));

        league.setName(leagueRequest.getLeagueName());
        league.setGameType(leagueRequest.getGameType());

        leagueRepository.save(league);

        return ResponseEntity.ok().build();

    }

    /*
    * A method to delete a league
    *
    * @param id
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @Transactional
    public ResponseEntity<?> deleteLeague(Integer id) {

        League league = leagueRepository
                .findLeagueById(id)
                .orElseThrow(() -> new ResourceNotFoundException("League not found"));

        leagueRepository.delete(league);

        return ResponseEntity.noContent().build();

    }

}
