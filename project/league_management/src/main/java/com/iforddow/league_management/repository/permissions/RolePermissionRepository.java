package com.iforddow.league_management.repository;

import com.iforddow.league_management.jpa.entity.RolePermission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RolePermissionRepository extends JpaRepository<RolePermission, Integer> {

    Optional<RolePermission> findRolePermissionByRoleIdAndPermissionId(Long roleId, Long permissionId);

    List<RolePermission> findPermissionsByRoleId(Long roleId);


}
