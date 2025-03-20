package com.iforddow.league_management.service.permissions;

import com.iforddow.league_management.dto.permissions.PermissionDTO;
import com.iforddow.league_management.dto.permissions.RoleDTO;
import com.iforddow.league_management.dto.UserDTO;
import com.iforddow.league_management.exception.ResourceAlreadyExistsException;
import com.iforddow.league_management.exception.ResourceNotFoundException;
import com.iforddow.league_management.jpa.entity.permissions.Role;
import com.iforddow.league_management.repository.permissions.RolePermissionRepository;
import com.iforddow.league_management.repository.permissions.RoleRepository;
import com.iforddow.league_management.repository.UserRepository;
import com.iforddow.league_management.requests.permissions.RoleRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService {

    // RoleRepository autowire
    private final RoleRepository roleRepository;

    // RolePermissionRepository autowire
    private final RolePermissionRepository rolePermissionRepository;

    // UserRepository autowire
    private final UserRepository userRepository;

    /*
    * A method to get all roles
    *
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-05
    * */
    public ResponseEntity<List<RoleDTO>> getAllRoles() {

        List<RoleDTO> roles = roleRepository.findAll()
                .stream()
                .map(RoleDTO::new).toList();

        if(roles.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(roles);

    }

    /*
    * A method to get a role by id
    *
    * @param Long id
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-05
    * */
    public ResponseEntity<RoleDTO> getRole(Integer id) {

        RoleDTO role = roleRepository
                .findRoleById(id)
                .map(RoleDTO::new)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        return ResponseEntity.ok(role);

    }

    /*
    * A method to add a new role
    *
    * @param RoleRequest role
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-05
    * */
    @Transactional
    public ResponseEntity<?> addRole(RoleRequest roleRequest) {

        if (roleRepository.existsByRoleName(roleRequest.getRoleName())) {

            throw new ResourceAlreadyExistsException("Role name already exists");

        }

        Role newRole = Role.builder()
                .roleName(roleRequest.getRoleName().toUpperCase())
                .roleDesc(roleRequest.getRoleDescription())
                .build();

        roleRepository.save(newRole);

        return ResponseEntity.status(HttpStatus.CREATED).build();
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
    @Transactional
    public ResponseEntity<?> editRole(Integer id, RoleRequest roleRequest) {

        Role role = roleRepository.findRoleById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        role.setRoleName(roleRequest.getRoleName());
        role.setRoleDesc(roleRequest.getRoleDescription());

        roleRepository.save(role);

        return ResponseEntity.ok().build();
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
    public ResponseEntity<?> deleteRole(Integer id) {

        Role role = roleRepository.findRoleById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        roleRepository.delete(role);

        return ResponseEntity.noContent().build();
    }

    /*
    * A method to get all permissions assigned to a role
    *
    * @param Long id
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-05
    * */
    public ResponseEntity<List<PermissionDTO>> getPermissionsByRole(Integer roleId) {

        roleRepository.findRoleById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        List<PermissionDTO> permissions = rolePermissionRepository
                .findPermissionsByRoleId(roleId)
                .stream().map(PermissionDTO::new)
                .toList();

        if(permissions.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(permissions);
    }

    /*
    * A method to get all users with a specific role
    *
    * @param Long id
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-05
    * */
    public ResponseEntity<List<UserDTO>> getUsersByRole(Integer roleId) {
        roleRepository.findRoleById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        List<UserDTO> users = userRepository
                .findUsersByRoleId(roleId)
                .stream().map(UserDTO::new)
                .toList();

        if (users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(users);
    }

}
