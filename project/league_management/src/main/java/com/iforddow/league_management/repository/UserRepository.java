package com.iforddow.league_management.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.iforddow.league_management.jpa.entity.permissions.Role;
import com.iforddow.league_management.jpa.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/*
* A repository for the User entity.
*
* @Author: IFD
* @Since: 2025-02-07
* */
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findUserById(Integer id);

  // Find a user by email
  Optional<User> findByEmail(String email);

  // Find a user by email with roles
  @Query("SELECT u FROM User u LEFT JOIN FETCH u.roles WHERE u.email = :email")
  Optional<User> findByEmailWithRoles(String email);

  // Find a user by email with roles and permissions
  Set<User> findUsersByRolesContains(Role role);

  // Find a user by email with roles and permissions
  @Query("""
    SELECT DISTINCT u FROM User u
    JOIN u.roles r
    JOIN RolePermission rp ON rp.role.id = r.id
    JOIN Permission p ON rp.permission.id = p.id
    WHERE p.id = :permissionId
""")
  Set<User> findUsersByPermissionId(@Param("permissionId") Integer permissionId);


  @Query("SELECT u " +
          "FROM User u JOIN u.roles r WHERE r.id = :roleId")
  List<User> findUsersByRoleId(@Param("roleId") Integer roleId);

}
