package com.iforddow.league_management.jpa.entity.permissions;

import jakarta.persistence.*;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

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

    @OneToMany(mappedBy = "leagueRole")
    private Set<LeagueRolePermission> leagueRolePermissions = new LinkedHashSet<>();

    @OneToMany(mappedBy = "leagueRole")
    private Set<UserLeagueRole> userLeagueRoles = new LinkedHashSet<>();

}