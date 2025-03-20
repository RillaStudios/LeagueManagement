package com.iforddow.league_management.dto;

import com.iforddow.league_management.jpa.entity.permissions.Role;

public record RoleDTO(Long id, String roleName, String roleDesc) {

    public RoleDTO(Role role) {
        this(role.getId(), role.getRoleName(), role.getRoleDesc());
    }

}
