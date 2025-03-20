package com.iforddow.league_management.repository.permissions;

import com.iforddow.league_management.jpa.entity.permissions.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/*
* A repository for the Role entity
*
* @Author: IFD
* @Since: 2025-02-07
* */
@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

  // Find a role by its name
  Optional<Role> findRoleById(Integer id);

  // Check if a role exists by its name
  Optional<Role> findByRoleName(String name);

  // Check if a role exists by its name
  boolean existsByRoleName(String name);

}
