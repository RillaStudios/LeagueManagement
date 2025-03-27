package com.iforddow.league_management.jpa.entity.team;

import com.iforddow.league_management.jpa.entity.User;
import com.iforddow.league_management.jpa.entity.league.Game;
import com.iforddow.league_management.jpa.entity.league.Conference;
import com.iforddow.league_management.jpa.entity.league.Division;
import com.iforddow.league_management.jpa.entity.league.League;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.LinkedHashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "team")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "location")
    private String location;

    @OneToMany(mappedBy = "homeTeam")
    private Set<Game> home_game = new LinkedHashSet<>();

    @OneToMany(mappedBy = "awayTeam")
    private Set<Game> away_game = new LinkedHashSet<>();

    @OneToMany(mappedBy = "team")
    private Set<Player> players = new LinkedHashSet<>();

    @OneToMany(mappedBy = "team")
    private Set<TeamGameStats> teamGameStats = new LinkedHashSet<>();

    @OneToMany(mappedBy = "team")
    private Set<TeamNews> teamNews = new LinkedHashSet<>();

    @OneToMany(mappedBy = "team")
    private Set<TeamSeason> teamSeasons = new LinkedHashSet<>();

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "league_id", nullable = false)
    private League league;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "division_id")
    private Division division;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conference_id")
    private Conference conference;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

}