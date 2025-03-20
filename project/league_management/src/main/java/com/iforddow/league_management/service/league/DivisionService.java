package com.iforddow.league_management.service;

import com.iforddow.league_management.dto.league.DivisionDTO;
import com.iforddow.league_management.exception.ResourceNotFoundException;
import com.iforddow.league_management.jpa.entity.league.Division;
import com.iforddow.league_management.jpa.entity.league.League;
import com.iforddow.league_management.repository.league.DivisionRepository;
import com.iforddow.league_management.repository.league.LeagueRepository;
import com.iforddow.league_management.requests.league.DivisionRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DivisionService {

    private final DivisionRepository divisionRepository;

    private final LeagueRepository leagueRepository;

    /*
    * A method to get all divisions
    *
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-11
    * */
    public ResponseEntity<List<DivisionDTO>> getAllDivisions(Long leagueId) {

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
    public ResponseEntity<DivisionDTO> getDivisionById(Long id, Long leagueId) {

        DivisionDTO division = divisionRepository.findDivisionByIdAndLeagueId(id, leagueId)
                .map(DivisionDTO::new)
                .orElseThrow(() -> new RuntimeException("Division not found"));

        return ResponseEntity.ok(division);

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
    public ResponseEntity<?> addDivision(Long leagueId, DivisionRequest divisionRequest) {

        League league = leagueRepository
                .findLeagueById(leagueId)
                .orElseThrow(() -> new ResourceNotFoundException("League not found"));

        Division division = Division.builder()
                .name(divisionRequest.getDivisionName())
                .league(league)
                .createdAt(new Date().toInstant())
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
    public ResponseEntity<?> updateDivision(Long leagueId, Long divisionId, DivisionRequest divisionRequest) {

        Division division = divisionRepository.findDivisionByIdAndLeagueId(divisionId, leagueId)
                .orElseThrow(() -> new ResourceNotFoundException("Division with " + divisionId + " not found"));

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
    public ResponseEntity<?> deleteDivision(Long id, Long leagueId) {

        Division division = divisionRepository.findDivisionByIdAndLeagueId(id, leagueId)
                .orElseThrow(() -> new ResourceNotFoundException("Division not found"));

        divisionRepository.delete(division);

        return ResponseEntity.noContent().build();

    }

}
