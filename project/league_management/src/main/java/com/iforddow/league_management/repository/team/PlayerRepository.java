package com.iforddow.league_management.repository.team;

import com.iforddow.league_management.jpa.entity.team.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Integer> {

    List<Player> getPlayersByTeam_League_Id(Integer teamLeagueId);

    List<Player> getPlayersByTeam_Id(Integer teamId);

}
