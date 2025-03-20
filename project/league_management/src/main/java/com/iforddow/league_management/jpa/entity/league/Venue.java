package com.iforddow.league_management.jpa.entity.league;

import com.iforddow.league_management.jpa.entity.game.Game;
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
@Table(name = "venue")
public class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "venue_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "league_id", nullable = false)
    private League league;

    @Column(name = "address")
    private String address;

    @Column(name = "link")
    private String link;

    @OneToMany(mappedBy = "venue")
    private Set<Game> games = new LinkedHashSet<>();

}