package com.iforddow.league_management.repository;

import com.iforddow.league_management.jpa.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Integer> {

    Optional<Permission> findPermissionById(Long id);

    boolean existsByPermissionName(String name);

}
