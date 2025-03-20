package com.iforddow.league_management.jpa.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "league_role")
public class LeagueRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "league_role_id", nullable = false)
    private Integer id;

    @Column(name = "league_role_name", nullable = false, length = 50)
    private String leagueRoleName;

}