package com.iforddow.league_management.service.team;

import com.iforddow.league_management.dto.team.PlayerDTO;
import com.iforddow.league_management.exception.ResourceNotFoundException;
import com.iforddow.league_management.jpa.entity.team.Player;
import com.iforddow.league_management.jpa.entity.team.Team;
import com.iforddow.league_management.repository.team.PlayerRepository;
import com.iforddow.league_management.repository.team.TeamRepository;
import com.iforddow.league_management.requests.team.PlayerRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlayerService {

    private final PlayerRepository playerRepository;

    private final TeamRepository teamRepository;

    public ResponseEntity<List<PlayerDTO>> getAllPlayersByLeague(Integer leagueId) {

        List<PlayerDTO> players = playerRepository.getPlayersByTeam_League_Id(leagueId)
                .stream().map(PlayerDTO::new).toList();

        if (players.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(players);

    }

    public ResponseEntity<List<PlayerDTO>> getAllPlayersByTeam(Integer teamId) {

        List<PlayerDTO> players = playerRepository.getPlayersByTeam_Id(teamId)
                .stream().map(PlayerDTO::new).toList();

        if (players.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(players);

    }

    public ResponseEntity<PlayerDTO> getPlayerById(Integer playerId) {

        Player player = playerRepository.findById(playerId).orElseThrow(() -> new ResourceNotFoundException("Player not found"));

        return ResponseEntity.ok(new PlayerDTO(player));

    }

    public ResponseEntity<PlayerDTO> createPlayer(PlayerRequest playerRequest) {

        Team team = teamRepository.findById(playerRequest.getTeamId()).orElseThrow(() -> new ResourceNotFoundException("Team not found"));

        Player player = Player.builder()
                .name(playerRequest.getName())
                .height(playerRequest.getHeight())
                .weight(playerRequest.getWeight())
                .skillLevel(playerRequest.getSkillLevel())
                .dob(playerRequest.getDob())
                .team(team)
                .build();

        player = playerRepository.save(player);

        return ResponseEntity.ok(new PlayerDTO(player));

    }

    public ResponseEntity<PlayerDTO> updatePlayer(Integer playerId, PlayerRequest playerRequest) {

        Player player = playerRepository.findById(playerId).orElseThrow(() -> new ResourceNotFoundException("Player not found"));

        player.setName(playerRequest.getName());
        player.setHeight(playerRequest.getHeight());
        player.setWeight(playerRequest.getWeight());
        player.setSkillLevel(playerRequest.getSkillLevel());
        player.setDob(playerRequest.getDob());

        player = playerRepository.save(player);

        return ResponseEntity.ok(new PlayerDTO(player));
    }

    public ResponseEntity<?> deletePlayer(Integer playerId) {

        Player player = playerRepository.findById(playerId).orElseThrow(() -> new ResourceNotFoundException("Player not found"));

        playerRepository.delete(player);

        return ResponseEntity.noContent().build();

    }

}
