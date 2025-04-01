package com.iforddow.league_management.repository.league;

import com.iforddow.league_management.jpa.entity.league.LeagueNews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LeagueNewsRepository extends JpaRepository<LeagueNews, Integer> {

    List<LeagueNews> findAllByLeague_Id(Integer leagueId);

    Optional<LeagueNews> findLeagueNewsByLeague_IdAndId(Integer leagueId, Integer newsId);

}
