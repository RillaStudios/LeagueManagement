package com.iforddow.league_management.controller.permissions;

import com.iforddow.league_management.service.permissions.RolePermissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/*
* A controller class to handle the role-permission mapping
*
* NOTE: This is outside the current scope of the project. It technically works,
* but it is not used in the project. It is here for future use.
*
* @Author: IFD
* @Since: 2025-02-07
* */
@RestController
@RequiredArgsConstructor
@RequestMapping("/role-permission")
@PreAuthorize("hasRole('ADMIN')")
public class RolePermissionController {

    // Initializing the RolePermissionService
    private final RolePermissionService rolePermissionService;

    /*
    * A method to assign a permission to a role
    *
    * @param roleId: The id of the role
    * @param permissionId: The id of the permission
    * @return ResponseEntity: A response entity with the status of the operation
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @PostMapping("/")
    public ResponseEntity<?> assignPermissionToRole(@RequestParam Integer roleId, @RequestParam Integer permissionId) {

        return rolePermissionService.assignPermissionToRole(roleId, permissionId);

    }

    /*
    * A method to remove a permission from a role
    *
    * @param roleId: The id of the role
    * @param permissionId: The id of the permission
    * @return ResponseEntity: A response entity with the status of the operation
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @DeleteMapping("/")
    public ResponseEntity<?> removePermissionFromRole(@RequestParam Integer roleId, @RequestParam Integer permissionId) {

        return rolePermissionService.removePermissionFromRole(roleId, permissionId);

    }

}
