package com.iforddow.league_management.jpa.entity.league;

import com.iforddow.league_management.jpa.entity.game.Game;
import com.iforddow.league_management.jpa.entity.team.TeamSeason;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "season")
public class Season {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "season_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "league_id")
    private League league;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "max_teams")
    private Integer maxTeams;

    @OneToMany(mappedBy = "season")
    private List<Game> games;

    @OneToMany(mappedBy = "season")
    private List<TeamSeason> teamSeasons;

}