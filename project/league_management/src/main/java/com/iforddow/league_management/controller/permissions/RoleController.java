package com.iforddow.league_management.controller;

import com.iforddow.league_management.requests.RoleRequest;
import com.iforddow.league_management.service.authority.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/role")
@PreAuthorize("hasRole('ADMIN')")
public class RoleController {

    private final RoleService roleService;

    @PostMapping("/add")
    public ResponseEntity<?> addRole(@RequestBody RoleRequest request) {

        return roleService.addRole(request);

    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<?> editRole(@RequestBody RoleRequest request, @PathVariable Long id) {

        return roleService.editRole(id, request);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteRole(@PathVariable Long id) {

        return roleService.deleteRole(id);

    }

}
