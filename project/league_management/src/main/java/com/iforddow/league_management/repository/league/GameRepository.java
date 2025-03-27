package com.iforddow.league_management.repository.league;

import com.iforddow.league_management.jpa.entity.league.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends JpaRepository<Game, Integer> {
}
