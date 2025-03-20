package com.iforddow.league_management.jpa.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "permissions")
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "permission_id", nullable = false)
    private Long id;

    @Column(name = "permission_name", nullable = false, length = 50)
    private String permissionName;

    @Lob
    @Column(name = "permission_desc")
    private String permissionDesc;

}