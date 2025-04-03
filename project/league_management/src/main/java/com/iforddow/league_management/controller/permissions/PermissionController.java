package com.iforddow.league_management.controller.permissions;

import com.iforddow.league_management.requests.permissions.PermissionRequest;
import com.iforddow.league_management.service.permissions.PermissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/*
* A controller class that handles all the requests related to permissions.
*
* NOTE: This is outside the current scope of the project. It technically works,
* but it is not used in the project. It is here for future use.
*
* @Author: IFD
* @Since: 2025-02-07
* */
@RestController
@RequiredArgsConstructor
@RequestMapping("/permission")
@PreAuthorize("hasRole('ADMIN')")
public class PermissionController {

    // An instance of the PermissionService class
    private final PermissionService permissionService;

    /*
    * A method that returns a permission by its id.
    *
    * @param id: The id of the permission.
    * @return ResponseEntity: A response entity that contains the permission.
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @GetMapping("/{id}")
    public ResponseEntity<?> getPermission(@PathVariable Integer id) {

        return permissionService.getPermission(id);

    }

    /*
    * A method that returns all the permissions.
    *
    * @return ResponseEntity: A response entity that contains all the permissions.
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @GetMapping("/")
    public ResponseEntity<?> getAllPermissions() {

        return permissionService.getAllPermissions();

    }

    /*
    * A method that creates a new permission.
    *
    * @param request: The request that contains the permission data.
    * @return ResponseEntity: A response entity that contains the created permission.
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @PostMapping("/")
    public ResponseEntity<?> createPermission(@RequestBody PermissionRequest request) {

        return permissionService.createPermission(request);

    }

    /*
    * A method that edits a permission.
    *
    * @param request: The request that contains the permission data.
    * @param id: The id of the permission.
    * @return ResponseEntity: A response entity that contains the edited permission.
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @PatchMapping("/{id}")
    public ResponseEntity<?> editPermission(@RequestBody PermissionRequest request, @PathVariable Integer id) {

        return permissionService.editPermission(id, request);

    }

    /*
    * A method that deletes a permission.
    *
    * @param id: The id of the permission.
    * @return ResponseEntity: A response entity that contains the deleted permission.
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePermission(@PathVariable Integer id) {

        return permissionService.deletePermission(id);

    }

    /*
    * A method that returns all the users that have a specific permission.
    *
    * @param id: The id of the permission.
    * @return ResponseEntity: A response entity that contains all the users with the permission.
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @GetMapping("/{id}/users")
    public ResponseEntity<?> getUsersByPermission(@PathVariable Integer id) {

        return permissionService.getUsersWithPermission(id);

    }

}
