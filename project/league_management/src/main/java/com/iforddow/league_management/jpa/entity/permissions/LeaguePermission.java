package com.iforddow.league_management.jpa.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "league_permission")
public class LeaguePermission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "league_permission_id", nullable = false)
    private Integer id;

    @ColumnDefault("current_timestamp()")
    @Column(name = "permission_name", nullable = false, length = 50)
    private String permissionName;

    @ColumnDefault("'NULL'")
    @Column(name = "permission_desc", length = 1000)
    private String permissionDesc;

}