package com.iforddow.league_management.service.authority;

import com.iforddow.league_management.jpa.entity.Role;
import com.iforddow.league_management.repository.RoleRepository;
import com.iforddow.league_management.requests.RoleRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    /*
    * A method to add a new role
    *
    * @param RoleRequest role
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-05
    * */
    public ResponseEntity<?> addRole(RoleRequest role) {

        try {

            Role newRole = Role.builder()
                    .roleName(role.getRoleName().toUpperCase())
                    .roleDesc(role.getRoleDescription())
                    .build();

            if (roleRepository.existsByRoleName(role.getRoleName())) {
                Map<String, String> response = Map.of("message", "Role creation failed: Role name already exists");
                return ResponseEntity.badRequest().body(response);
            }

            roleRepository.save(newRole);

            Map<String, String> response = Map.of("message", "Role created successfully");

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            Map<String, String> response = Map.of("message", "Role creation failed: " + e.getMessage());

            return ResponseEntity.badRequest().body(response);

        }

    }

    /*
    * A method to edit a role
    *
    * @param RoleRequest roleRequest
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-05
    * */
    public ResponseEntity<?> editRole(Long id, RoleRequest roleRequest) {

        try {

            Role role = roleRepository.findRoleById(id).orElseThrow(() -> new RuntimeException("Role not found"));

            role.setRoleName(roleRequest.getRoleName());
            role.setRoleDesc(roleRequest.getRoleDescription());

            roleRepository.save(role);

            Map<String, String> response = Map.of("message", "Role updated successfully");

            return ResponseEntity.ok().body(response);

        } catch (Exception e) {

            Map<String, String> response = Map.of("message", "Role update failed: " + e.getMessage());

            return ResponseEntity.badRequest().body(response);

        }
    }

    /*
    * A method to delete a role
    *
    * @param Long id
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-05
    * */
    @Transactional
    public ResponseEntity<?> deleteRole(Long id) {

        try {

            Role role = roleRepository.findRoleById(id).orElseThrow(() -> new RuntimeException("Role not found"));

            roleRepository.deleteRoleById(role.getId());

            Map<String, String> response = Map.of("message", "Role deleted successfully");

            return ResponseEntity.ok().body(response);

        } catch (Exception e) {

            Map<String, String> response = Map.of("message", "Role deletion failed: " + e.getMessage());

            return ResponseEntity.badRequest().body(response);

        }

    }

}
