package com.iforddow.league_management.repository.permissions;

import com.iforddow.league_management.jpa.entity.permissions.RolePermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.iforddow.league_management.jpa.entity.permissions.Permission;
import com.iforddow.league_management.jpa.entity.permissions.Role;

import java.util.List;
import java.util.Optional;

/*
* A repository for the RolePermission entity
*
* @Author: IFD
* @Since: 2025-02-07
* */
@Repository
public interface RolePermissionRepository extends JpaRepository<RolePermission, Integer> {

    // Find a role permission by its role id and permission id
    Optional<RolePermission> findRolePermissionByRoleIdAndPermissionId(Integer roleId, Integer permissionId);

    // Find all permissions by role id
    @Query("SELECT rp " +
            "FROM RolePermission rp " +
            "JOIN rp.permission p " +
            "WHERE rp.role.id = :roleId")
    List<Permission> findPermissionsByRoleId(@Param("roleId") Integer roleId);

    boolean existsByRoleAndPermission(Role role, Permission permission);


}
