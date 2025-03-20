package com.iforddow.league_management.service;

import com.iforddow.league_management.dto.UserDTO;
import com.iforddow.league_management.dto.league.LeagueDTO;
import com.iforddow.league_management.exception.NoContentException;
import com.iforddow.league_management.jpa.entity.league.League;
import com.iforddow.league_management.repository.league.LeagueRepository;
import com.iforddow.league_management.requests.UserRequest;
import com.iforddow.league_management.requests.auth.ChangePasswordRequest;
import com.iforddow.league_management.jpa.entity.User;
import com.iforddow.league_management.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

/*
* User service class
*
* This class is used to manage the user entity in the database
*
* @Author: IFD
* @Since: 2025-02-04
* */
@Service
@RequiredArgsConstructor
public class UserService {

    // Password encoder
    private final PasswordEncoder passwordEncoder;

    // User repository
    private final UserRepository userRepository;

    //League repository
    private final LeagueRepository leagueRepository;

    public ResponseEntity<UserDTO> getUser(Principal connectedUser) {

        // Get the user
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        if(user == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(new UserDTO(user));
    }

    /*
    * Method to change the password of a user
    *
    * @param request: the request containing the current password, the new password and the confirmation password
    * @param connectedUser: the connected user
    * @throws IllegalStateException: if the current password is wrong or if the two new passwords are not the same
    * @return void
    *
    * @Author: IFD
    * @Since: 2025-02-04
    * */
    @Transactional
    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

        // Set the user
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // Check if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {

            // Throw an exception if the current password is wrong
            throw new IllegalStateException("Wrong password");

        }

        // Check if the two new passwords are the same
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {

            // Throw an exception if the two new passwords are not the same
            throw new IllegalStateException("Password are not the same");

        }

        // Update the password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // Save the new password (update the user)
        userRepository.save(user);
    }

    @Transactional
    public void updateUser(UserRequest userRequest, Principal connectedUser) {

        // Set the user
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // Update the user
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());

        // Save the new user
        userRepository.save(user);
    }

    /*
    * A method to get the leagues of a user
    *
    * @param connectedUser: the connected user
    * @return a list of leagues
    *
    * @Author: IFD
    * @Since: 2025-02-07
    * */
    public ResponseEntity<List<LeagueDTO>> getUserLeagues(Principal connectedUser) {

        // Set the user
        User user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // Get the leagues of the user
        List<LeagueDTO> leagues = leagueRepository.findLeagueByCreatedBy_Id(user.getId())
                .stream().map(LeagueDTO::new).collect(Collectors.toList());

        if(leagues.isEmpty()) {
            throw new NoContentException("No leagues found");
        }

        return ResponseEntity.ok(leagues);

    }

}