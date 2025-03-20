package com.iforddow.league_management.dto;

import com.iforddow.league_management.jpa.entity.permissions.RolePermission;

public record RolePermissionDTO(Long id, Long roleId, String roleName, Long permissionId, String permissionName) {

    public RolePermissionDTO(RolePermission rolePermission) {
        this(rolePermission.getId(),
                rolePermission.getRole().getId(),
                rolePermission.getRole().getRoleName(),
                rolePermission.getPermission().getId(),
                rolePermission.getPermission().getPermissionName());
    }

}
