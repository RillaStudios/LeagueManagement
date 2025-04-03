package com.iforddow.league_management.controller;

import com.iforddow.league_management.dto.UserDTO;
import com.iforddow.league_management.dto.league.LeagueDTO;
import com.iforddow.league_management.dto.team.TeamDTO;
import com.iforddow.league_management.requests.UserRequest;
import com.iforddow.league_management.requests.auth.ChangePasswordRequest;
import com.iforddow.league_management.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

/*
* A controller class that handles all the requests related to the users.
*
* @Author: IFD
* @Since: 2025-02-07
* */
@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class UserController {

    // A private final field of type UserService.
    private final UserService userService;

    @GetMapping("/")
    public ResponseEntity<UserDTO> getUser(Principal connectedUser) {

        return userService.getUser(connectedUser);

    }

    /*
    * A method that changes the password of the connected user.
    *
    * @param request
    * @param connectedUser
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @PatchMapping("/change-password")
    @PreAuthorize("#request.id == authentication.principal.id")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request, Principal connectedUser) {

        userService.changePassword(request, connectedUser);

        return ResponseEntity.ok().build();

    }

    /*
    * A method that updates the user.
    *
    * @param userDTO
    *
    * @param connectedUser
    *
    * @return ResponseEntity<?>
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @PatchMapping("/")
    @PreAuthorize("#userDTO.id == authentication.principal.id")
    public ResponseEntity<?> updateUser(@RequestBody UserRequest userDTO, Principal connectedUser) {

        userService.updateUser(userDTO, connectedUser);

        return ResponseEntity.ok().build();

    }

    /*
    * A method that gets all the leagues of the connected user.
    *
    * @param connectedUser
    *
    * @return ResponseEntity<List<LeagueDTO>>
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @GetMapping("/leagues")
    public ResponseEntity<List<LeagueDTO>> getLeagues(Principal connectedUser) {

        return userService.getUserLeagues(connectedUser);

    }

    /*
    * A method that gets all the users.
    *
    * @param connectedUser
    *
    * @return ResponseEntity<List<UserDTO>>
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getUsers() {

        return userService.getUsers();

    }

    /*
    * A method that gets all the teams of the connected user.
    *
    * @param connectedUser
    *
    * @return ResponseEntity<List<TeamDTO>>
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    @GetMapping("/teams")
    public ResponseEntity<List<TeamDTO>> getTeams(Principal connectedUser) {

        return userService.getTeams(connectedUser);

    }

}