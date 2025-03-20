package com.iforddow.league_management.jpa.entity.league;

import com.iforddow.league_management.jpa.entity.User;
import com.iforddow.league_management.jpa.entity.permissions.UserLeagueRole;
import com.iforddow.league_management.jpa.entity.team.Team;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "league")
public class League {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "league_id", nullable = false)
    private Integer id;

    @ColumnDefault("current_timestamp()")
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "league")
    private List<Season> seasons;

    @ColumnDefault("'NULL'")
    @Column(name = "game_type", length = 50)
    private String gameType;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "current_season_id")
    private Integer currentSeasonId;

    @ColumnDefault("'NULL'")
    @Column(name = "location")
    private String location;

    @OneToMany(mappedBy = "league", fetch = FetchType.LAZY)
    private List<Conference> conferences;

    @OneToMany(mappedBy = "league", fetch = FetchType.LAZY)
    private List<Division> divisions;

    @OneToMany(mappedBy = "league", fetch = FetchType.LAZY)
    private List<LeagueNews> leagueNews;

    @OneToMany(mappedBy = "league", fetch = FetchType.LAZY)
    private List<Team> teams;

    @OneToMany(mappedBy = "league", fetch = FetchType.LAZY)
    private List<UserLeagueRole> userLeagueRoles;

    @OneToMany(mappedBy = "league", fetch = FetchType.LAZY)
    private List<Venue> venues;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

}