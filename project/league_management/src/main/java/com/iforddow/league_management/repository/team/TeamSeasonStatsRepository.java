package com.iforddow.league_management.repository.team;

import com.iforddow.league_management.jpa.entity.team.TeamSeasonStats;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface TeamSeasonStatsRepository extends JpaRepository<TeamSeasonStats, Integer> {

    Optional<TeamSeasonStats> findTeamSeasonStatsByTeamSeasonId(Integer teamSeasonId);

}
