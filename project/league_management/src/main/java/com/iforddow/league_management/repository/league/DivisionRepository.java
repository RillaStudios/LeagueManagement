package com.iforddow.league_management.repository.league;

import com.iforddow.league_management.jpa.entity.league.Division;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DivisionRepository extends JpaRepository<Division, Integer> {

    Optional<Division> findDivisionByIdAndLeagueId(Integer divisionId, Integer leagueId);

    Optional<List<Division>> findDivisionsByLeagueId(Integer leagueId);

    List<Division> findDivisionsByLeague_IdAndConference_Id(Integer leagueId, Integer conferenceId);

}
