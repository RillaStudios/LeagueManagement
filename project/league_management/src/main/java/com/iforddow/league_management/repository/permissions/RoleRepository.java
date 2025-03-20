package com.iforddow.league_management.repository;

import com.iforddow.league_management.jpa.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

  Optional<Role> findRoleById(Long id);

  Optional<Role> findByRoleName(String name);

    boolean existsByRoleName(String name);

}
