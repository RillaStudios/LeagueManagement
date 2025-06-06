package com.iforddow.league_management.repository.team;

import com.iforddow.league_management.jpa.entity.team.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Integer> {

    Optional<Team> findTeamByIdAndLeagueId(Integer id, Integer leagueId);

    Optional<List<Team>> findTeamsByLeagueId(Integer leagueId);

    List<Team> findTeamsByLeague_IdAndDivision_Id(Integer leagueId, Integer divisionId);

    List<Team> findTeamsByLeague_IdAndConference_Id(Integer leagueId, Integer conferenceId);

    Optional<Team> findTeamById(Integer id);

    @Query("SELECT t FROM Team t WHERE t.owner.id = :userId OR t.league.createdBy.id = :userId")
    List<Team> findTeamsByOwner_IdOrLeagueCreatedBy_Id(Integer userId);
}
