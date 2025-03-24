package com.iforddow.league_management.repository.league;

import com.iforddow.league_management.jpa.entity.league.Season;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SeasonRepository extends JpaRepository<Season, Integer> {

    Optional<Season> findSeasonsByIdAndLeagueId(Integer id, Integer leagueId);

    List<Season> findSeasonListByLeagueId(Integer leagueId);

}
