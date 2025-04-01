package com.iforddow.league_management.repository.league;

import com.iforddow.league_management.jpa.entity.league.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameRepository extends JpaRepository<Game, Integer> {

    Optional<Game> findGameById(Integer id);
    
    List<Game> findAllBySeason_Id(Integer seasonId);

    List<Game> findGameByHomeTeam_Id(Integer homeTeamId);

    List<Game> findGameByAwayTeam_Id(Integer awayTeamId);
}
