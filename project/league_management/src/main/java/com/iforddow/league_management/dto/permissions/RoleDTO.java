package com.iforddow.league_management.dto.permissions;

import com.iforddow.league_management.jpa.entity.permissions.Role;

public record RoleDTO(Integer id, String roleName, String roleDesc) {

    public RoleDTO(Role role) {
        this(role.getId(), role.getRoleName(), role.getRoleDesc());
    }

}
