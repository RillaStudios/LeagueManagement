package com.iforddow.league_management.repository;

import com.iforddow.league_management.jpa.entity.league.Division;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DivisionRepository extends JpaRepository<Division, Integer> {

    Optional<Division> findDivisionByIdAndLeagueId(Long id, Long leagueId);

    Optional<List<Division>> findDivisionsByLeagueId(Long leagueId);

}
