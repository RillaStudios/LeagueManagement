package com.iforddow.league_management.repository.permissions;

import com.iforddow.league_management.jpa.entity.permissions.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/*
* A repository for the Permission entity
*
* @Author: IFD
* @Since: 2025-02-07
* */
@Repository
public interface PermissionRepository extends JpaRepository<Permission, Integer> {

    // Find a permission by its name
    Optional<Permission> findPermissionById(Integer id);

    // Check if a permission exists by its name
    boolean existsByPermissionName(String name);

}
