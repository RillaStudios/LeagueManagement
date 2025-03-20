package com.iforddow.league_management.service.permissions;

import com.iforddow.league_management.dto.permissions.PermissionDTO;
import com.iforddow.league_management.dto.UserDTO;
import com.iforddow.league_management.exception.ResourceAlreadyExistsException;
import com.iforddow.league_management.exception.ResourceNotFoundException;
import com.iforddow.league_management.jpa.entity.permissions.Permission;
import com.iforddow.league_management.repository.permissions.PermissionRepository;
import com.iforddow.league_management.repository.UserRepository;
import com.iforddow.league_management.requests.permissions.PermissionRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

/*
* A service class to handle all permission related operations.
*
* @Author: IFD
* @Since: 2025-02-05
* */
@Service
@RequiredArgsConstructor
public class PermissionService {

    private final PermissionRepository permissionRepository;

    private final UserRepository userRepository;

    /*
    * A method to fetch a permission by its id.
    *
    * GET METHOD
    *
    * @param Long
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-10
    * */
    public ResponseEntity<PermissionDTO> getPermission(Integer id) {

        PermissionDTO permission = permissionRepository
                .findPermissionById(id)
                .map(PermissionDTO::new)
                .orElseThrow(() -> new ResourceNotFoundException("Permission not found with id: " + id));

        return ResponseEntity.ok(permission);
    }


    /*
    * A method to fetch all permissions.
    *
    * GET METHOD
    *
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-10
    * */
    public ResponseEntity<List<PermissionDTO>> getAllPermissions() {

        List<PermissionDTO> permissionList = permissionRepository.findAll()
                .stream()
                .map(PermissionDTO::new)
                .toList();

        if (permissionList.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return 204 No Content if no permissions exist
        }

        return ResponseEntity.ok(permissionList);
    }


    /*
    * A method to create a permission.
    *
    * CREATE METHOD
    *
    * @param PermissionRequest
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-05
    * */
    @Transactional
    public ResponseEntity<?> createPermission(PermissionRequest permissionRequest) {
        // Check if the permission already exists
        if (permissionRepository.existsByPermissionName(permissionRequest.getPermissionName())) {
            throw new ResourceAlreadyExistsException("Permission name already exists");
        }

        // Create and save new permission
        Permission newPermission = Permission.builder()
                .permissionName(permissionRequest.getPermissionName())
                .permissionDesc(permissionRequest.getPermissionDescription())
                .build();

        permissionRepository.save(newPermission);

        // Return success response
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    /*
    * Edit a permission.
    *
    * PATCH METHOD
    *
    * @param Long, PermissionRequest
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-05
    * */
    @Transactional
    public ResponseEntity<?> editPermission(Integer id, PermissionRequest permissionRequest) {
        // Fetch permission, throw custom exception if not found
        Permission permission = permissionRepository.findPermissionById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Permission not found"));

        // Update permission fields
        permission.setPermissionName(permissionRequest.getPermissionName());
        permission.setPermissionDesc(permissionRequest.getPermissionDescription());

        // Save updated permission
        permissionRepository.save(permission);

        return ResponseEntity.ok().build();
    }


    /*
    * Delete a permission.
    *
    * DELETE METHOD
    *
    * @param Long
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-05
    * */
    @Transactional
    public ResponseEntity<?> deletePermission(Integer id) {

        Permission permission = permissionRepository
                .findPermissionById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Permission not found"));

        permissionRepository.delete(permission);

        return ResponseEntity.noContent().build();

    }

    /*
    * A method to fetch all users with a specific permission.
    *
    * GET METHOD
    *
    * @param Long
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-05
    * */
    public ResponseEntity<List<UserDTO>> getUsersWithPermission(Integer id) {
        List<UserDTO> users = userRepository.findUsersByPermissionId(id)
                .stream()
                .map(UserDTO::new)
                .toList();

        return users.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(users);
    }



}
