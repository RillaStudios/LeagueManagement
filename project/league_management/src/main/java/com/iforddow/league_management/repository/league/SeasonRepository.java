package com.iforddow.league_management.repository;

import com.iforddow.league_management.jpa.entity.league.Season;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SeasonRepository extends JpaRepository<Season, Long> {

    Optional<Season> findSeasonsByIdAndLeagueId(Long id, Long leagueId);

    Optional<List<Season>> findSeasonsByLeagueId(Long leagueId);

}
