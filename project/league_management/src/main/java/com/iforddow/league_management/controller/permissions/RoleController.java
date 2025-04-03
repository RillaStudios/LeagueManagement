package com.iforddow.league_management.controller.permissions;

import com.iforddow.league_management.requests.permissions.RoleRequest;
import com.iforddow.league_management.service.permissions.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/*
* A controller class for handling requests related to roles.
*
* NOTE: This is outside the current scope of the project. It technically works,
* but it is not used in the project. It is here for future use.
*
* @Author: IFD
* @Since: 2025-02-07
* */
@RestController
@RequiredArgsConstructor
@RequestMapping("/role")
@PreAuthorize("hasRole('ADMIN')")
public class RoleController {

    // A service class for handling role related requests.
    private final RoleService roleService;

    /*
    * A method for getting all roles.
    *
    * @return ResponseEntity<?> - A response entity containing the list of roles.
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @GetMapping("/")
    public ResponseEntity<?> getAllRoles() {

        return roleService.getAllRoles();

    }

    /*
    * A method for getting a role by id.
    *
    * @param id - The id of the role.
    * @return ResponseEntity<?> - A response entity containing the role.
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @GetMapping("/{id}")
    public ResponseEntity<?> getRole(@PathVariable Integer id) {

        return roleService.getRole(id);

    }

    /*
    * A method for adding a role.
    *
    * @param request - The request containing the role details.
    * @return ResponseEntity<?> - A response entity containing the added role.
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @PostMapping("/")
    public ResponseEntity<?> addRole(@RequestBody RoleRequest request) {

        return roleService.addRole(request);

    }

    /*
    * A method for editing a role.
    *
    * @param request - The request containing the role details.
    * @param id - The id of the role.
    * @return ResponseEntity<?> - A response entity containing the edited role.
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @PatchMapping("/{id}")
    public ResponseEntity<?> editRole(@RequestBody RoleRequest request, @PathVariable Integer id) {

        return roleService.editRole(id, request);

    }

    /*
    * A method for deleting a role.
    *
    * @param id - The id of the role.
    * @return ResponseEntity<?> - A response entity containing the status of the deletion.
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRole(@PathVariable Integer id) {

        return roleService.deleteRole(id);

    }

    /*
    * A method for getting permissions by role.
    *
    * @param id - The id of the role.
    * @return ResponseEntity<?> - A response entity containing the permissions.
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @GetMapping("/{id}/permissions")
    public ResponseEntity<?> getRolePermissions(@PathVariable Integer id) {

        return roleService.getPermissionsByRole(id);

    }

    /*
    * A method for getting users by role.
    *
    * @param id - The id of the role.
    * @return ResponseEntity<?> - A response entity containing the users.
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @GetMapping("/{id}/users")
    public ResponseEntity<?> getUsersByRole(@PathVariable Integer id) {

        return roleService.getUsersByRole(id);

    }

}
