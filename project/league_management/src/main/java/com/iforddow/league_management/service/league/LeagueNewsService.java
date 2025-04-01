package com.iforddow.league_management.service.league;

import com.iforddow.league_management.dto.league.LeagueNewsDTO;
import com.iforddow.league_management.exception.ResourceNotFoundException;
import com.iforddow.league_management.jpa.entity.User;
import com.iforddow.league_management.jpa.entity.league.League;
import com.iforddow.league_management.jpa.entity.league.LeagueNews;
import com.iforddow.league_management.repository.league.LeagueNewsRepository;
import com.iforddow.league_management.repository.league.LeagueRepository;
import com.iforddow.league_management.requests.league.LeagueNewsRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LeagueNewsService {

    private final LeagueNewsRepository leagueNewsRepository;

    private final LeagueRepository leagueRepository;

    public ResponseEntity<List<LeagueNewsDTO>> getAllLeagueNews(Integer leagueId) {

        List<LeagueNewsDTO> leagueNews = leagueNewsRepository.findAllByLeague_Id(leagueId)
                .stream()
                .map(LeagueNewsDTO::new)
                .toList();

        return ResponseEntity.ok(leagueNews);

    }

    public ResponseEntity<LeagueNewsDTO> getLeagueNewsById(Integer leagueId, Integer newsId) {

        LeagueNews leagueNews = leagueNewsRepository.findLeagueNewsByLeague_IdAndId(leagueId, newsId)
                .orElseThrow(() -> new ResourceNotFoundException("League News not found"));

        return ResponseEntity.ok(new LeagueNewsDTO(leagueNews));

    }

    public ResponseEntity<LeagueNewsDTO> createLeagueNews(Integer leagueId, LeagueNewsRequest leagueNewsRequest,
                                                          Principal connectedUser) {

        // Get the user
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        if(user == null) {
            return ResponseEntity.notFound().build();
        }

        League league = leagueRepository.findLeagueById(leagueId).orElseThrow(() -> new ResourceNotFoundException("League not found"));

        LeagueNews leagueNews = LeagueNews.builder()
                .createdAt(new Date().toInstant())
                .createdBy(user)
                .content(leagueNewsRequest.getContent())
                .league(league)
                .build();

        LeagueNews savedLeagueNews = leagueNewsRepository.save(leagueNews);

        return ResponseEntity.ok(new LeagueNewsDTO(savedLeagueNews));

    }

    public ResponseEntity<LeagueNewsDTO> updateLeagueNews(Integer leagueId, Integer newsId,
                                                          LeagueNewsRequest leagueNewsRequest) {

        LeagueNews leagueNews = leagueNewsRepository.findLeagueNewsByLeague_IdAndId(leagueId, newsId)
                .orElseThrow(() -> new ResourceNotFoundException("League News not found"));

        if (leagueNewsRequest.getContent() != null) {
            leagueNews.setContent(leagueNewsRequest.getContent());
        }

        LeagueNews updatedLeagueNews = leagueNewsRepository.save(leagueNews);

        return ResponseEntity.ok(new LeagueNewsDTO(updatedLeagueNews));

    }

    public ResponseEntity<?> deleteLeagueNews(Integer leagueId, Integer newsId) {

        LeagueNews leagueNews = leagueNewsRepository.findLeagueNewsByLeague_IdAndId(leagueId, newsId)
                .orElseThrow(() -> new ResourceNotFoundException("League News not found"));

        leagueNewsRepository.delete(leagueNews);

        return ResponseEntity.noContent().build();

    }

}
