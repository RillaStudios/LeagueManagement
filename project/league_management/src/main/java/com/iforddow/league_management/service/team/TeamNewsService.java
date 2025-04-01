package com.iforddow.league_management.service.team;

import com.iforddow.league_management.dto.team.TeamNewsDTO;
import com.iforddow.league_management.exception.ResourceNotFoundException;
import com.iforddow.league_management.jpa.entity.User;
import com.iforddow.league_management.jpa.entity.team.Team;
import com.iforddow.league_management.jpa.entity.team.TeamNews;
import com.iforddow.league_management.repository.team.TeamNewsRepository;
import com.iforddow.league_management.repository.team.TeamRepository;
import com.iforddow.league_management.requests.team.TeamNewsRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TeamNewsService {

    private final TeamNewsRepository teamNewsRepository;

    private final TeamRepository teamRepository;

    public ResponseEntity<List<TeamNewsDTO>> getAllTeamNews(Integer teamId) {

        List<TeamNewsDTO> teamNews = teamNewsRepository.findAllByTeam_Id(teamId)
                .stream()
                .map(TeamNewsDTO::new)
                .toList();

        return ResponseEntity.ok(teamNews);

    }

    public ResponseEntity<TeamNewsDTO> getTeamNewsById(Integer teamId, Integer newsId) {

        TeamNews teamNews = teamNewsRepository.findTeamNewsByTeam_IdAndId(teamId, newsId)
                .orElseThrow(() -> new ResourceNotFoundException("League News not found"));

        return ResponseEntity.ok(new TeamNewsDTO(teamNews));

    }

    public ResponseEntity<TeamNewsDTO> createTeamNews(Integer teamId, TeamNewsRequest teamNewsRequest,
                                                          Principal connectedUser) {

        // Get the user
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        if(user == null) {
            return ResponseEntity.notFound().build();
        }

        Team team = teamRepository.findTeamById(teamId).orElseThrow(() -> new ResourceNotFoundException("Team not found"));

        TeamNews teamNews = TeamNews.builder()
                .createdAt(new Date().toInstant())
                .createdBy(user)
                .content(teamNewsRequest.getContent())
                .team(team)
                .build();

        TeamNews savedTeamNews = teamNewsRepository.save(teamNews);

        return ResponseEntity.ok(new TeamNewsDTO(savedTeamNews));

    }

    public ResponseEntity<TeamNewsDTO> updateTeamNews(Integer teamId, Integer newsId,
                                                          TeamNewsRequest teamNewsRequest) {

        TeamNews teamNews = teamNewsRepository.findTeamNewsByTeam_IdAndId(teamId, newsId)
                .orElseThrow(() -> new ResourceNotFoundException("Team News not found"));

        if (teamNewsRequest.getContent() != null) {
            teamNews.setContent(teamNewsRequest.getContent());
        }

        TeamNews updatedTeamNews = teamNewsRepository.save(teamNews);

        return ResponseEntity.ok(new TeamNewsDTO(updatedTeamNews));

    }

    public ResponseEntity<?> deleteTeamNews(Integer teamId, Integer newsId) {

        TeamNews teamNews = teamNewsRepository.findTeamNewsByTeam_IdAndId(teamId, newsId)
                .orElseThrow(() -> new ResourceNotFoundException("Team News not found"));

        teamNewsRepository.delete(teamNews);

        return ResponseEntity.noContent().build();

    }

}
