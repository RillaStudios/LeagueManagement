package com.iforddow.league_management.repository.team;

import com.iforddow.league_management.jpa.entity.team.TeamGameStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public interface TeamGameStatsRepository extends JpaRepository<TeamGameStats, Integer> {
    List<TeamGameStats> findAllByGame_Id(Integer gameId);

    List<TeamGameStats> findAllByTeam_Id(Integer teamId);

    List<TeamGameStats> findAllByGame_IdIn(List<Integer> gameIds);
}
