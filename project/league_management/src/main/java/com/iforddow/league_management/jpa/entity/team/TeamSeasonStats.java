package com.iforddow.league_management.jpa.entity.team;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter
@Entity
@Table(name = "team_season_stats")
public class TeamSeasonStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_season_stats_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "team_season_id", nullable = false)
    private TeamSeason teamSeason;

    @ColumnDefault("0")
    @Column(name = "total_wins", nullable = false)
    private Integer totalWins;

    @ColumnDefault("0")
    @Column(name = "total_losses", nullable = false)
    private Integer totalLosses;

    @ColumnDefault("0")
    @Column(name = "total_ties", nullable = false)
    private Integer totalTies;

    @ColumnDefault("0")
    @Column(name = "total_points_for", nullable = false)
    private Integer totalPointsFor;

    @ColumnDefault("0")
    @Column(name = "total_points_against", nullable = false)
    private Integer totalPointsAgainst;

}