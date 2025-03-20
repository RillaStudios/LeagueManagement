package com.iforddow.league_management.service.permissions;

import com.iforddow.league_management.exception.ResourceAlreadyExistsException;
import com.iforddow.league_management.exception.ResourceNotFoundException;
import com.iforddow.league_management.jpa.entity.permissions.Permission;
import com.iforddow.league_management.jpa.entity.permissions.Role;
import com.iforddow.league_management.jpa.entity.permissions.RolePermission;
import com.iforddow.league_management.repository.permissions.PermissionRepository;
import com.iforddow.league_management.repository.permissions.RolePermissionRepository;
import com.iforddow.league_management.repository.permissions.RoleRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/*
* A service class to handle all role permission related operations.
*
* @Author: IFD
* @Since: 2025-02-05
* */
@Service
@RequiredArgsConstructor
public class RolePermissionService {

    private final RoleRepository roleRepository;

    private final PermissionRepository permissionRepository;

    private final RolePermissionRepository rolePermissionRepository;

    /*
     * A method to assign a permission to a role
     *
     * CREATE METHOD
     *
     * @param Long roleId, Long permissionId
     * @return ResponseEntity<?>
     *
     * @Author: IFD
     * @Since: 2025-02-05
     * */
    @Transactional
    public ResponseEntity<?> assignPermissionToRole(Integer roleId, Integer permissionId) {

        // Fetch role and permission, throw if not found
        Role role = roleRepository.findRoleById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        Permission permission = permissionRepository.findPermissionById(permissionId)
                .orElseThrow(() -> new ResourceNotFoundException("Permission not found"));

        // Check if the role already has this permission
        if (rolePermissionRepository.existsByRoleAndPermission(role, permission)) {

            throw new ResourceAlreadyExistsException("Role already has this permission");

        }

        // Create and save the new role-permission mapping
        RolePermission rolePermission = RolePermission.builder()
                .role(role)
                .permission(permission)
                .build();

        rolePermissionRepository.save(rolePermission);

        // Return success response with the created RolePermissionDTO
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    /*
     * A method to remove a permission from a role
     *
     * DELETE METHOD
     *
     * @param Long roleId, Long permissionId
     * @return ResponseEntity<?>
     *
     * @Author: IFD
     * @Since: 2025-02-05
     */
    @Transactional
     public ResponseEntity<?> removePermissionFromRole(Integer roleId, Integer permissionId) {

        RolePermission rolePermission = rolePermissionRepository
                .findRolePermissionByRoleIdAndPermissionId(roleId, permissionId)
                .orElseThrow(() -> new ResourceNotFoundException("Role permission not found"));

        rolePermissionRepository.delete(rolePermission);

        return ResponseEntity.noContent().build();

     }

}
