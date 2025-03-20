package com.iforddow.league_management.repository.league;

import com.iforddow.league_management.jpa.entity.league.Conference;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ConferenceRepository extends JpaRepository<Conference, Integer> {

    List<Conference> findAllByLeague_Id(Integer leagueId);

    Optional<Conference> findByIdAndLeagueId(Integer id, Integer leagueId);

}
