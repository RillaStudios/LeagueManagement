package com.iforddow.league_management.repository;

import com.iforddow.league_management.jpa.entity.league.League;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/*
* A repository interface for League entity
*
* @Author: IFD
* @Since: 2025-02-07
* */
@Repository
public interface LeagueRepository extends JpaRepository<League, Integer> {

    Optional<League> findLeagueById(Long id);
}
