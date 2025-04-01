package com.iforddow.league_management.repository.team;

import com.iforddow.league_management.jpa.entity.league.LeagueNews;
import com.iforddow.league_management.jpa.entity.team.TeamNews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamNewsRepository extends JpaRepository<TeamNews, Integer> {

    List<TeamNews> findAllByTeam_Id(Integer teamId);

    Optional<TeamNews> findTeamNewsByTeam_IdAndId(Integer teamId, Integer id);
    
}
