package com.iforddow.league_management.dto.permissions;

import com.iforddow.league_management.jpa.entity.permissions.RolePermission;

public record RolePermissionDTO(Integer id, Integer roleId, String roleName, Integer permissionId, String permissionName) {

    public RolePermissionDTO(RolePermission rolePermission) {
        this(rolePermission.getId(),
                rolePermission.getRole().getId(),
                rolePermission.getRole().getRoleName(),
                rolePermission.getPermission().getId(),
                rolePermission.getPermission().getPermissionName());
    }

}
