package com.iforddow.league_management.repository.team;

import com.iforddow.league_management.jpa.entity.team.TeamSeason;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamSeasonRepository extends JpaRepository<TeamSeason, Integer> {

    List<TeamSeason> findTeamSeasonsBySeasonId(Integer seasonId);

    TeamSeason findTeamSeasonByTeam_IdAndSeason_Id(Integer teamId, Integer seasonId);

}
