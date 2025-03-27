package com.iforddow.league_management.repository.league;

import com.iforddow.league_management.jpa.entity.league.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VenueRepository extends JpaRepository<Venue, Integer> {
    List<Venue> findAllByLeague_Id(Integer leagueId);
}
