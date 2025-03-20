package com.iforddow.league_management.jpa.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

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
    @Column(name = "id", nullable = false)
    private Long id;

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

    @OneToMany(mappedBy = "league", fetch = FetchType.LAZY)
    private List<Division> divisions;

}