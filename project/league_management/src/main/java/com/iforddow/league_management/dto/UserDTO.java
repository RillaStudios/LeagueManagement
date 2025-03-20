package com.iforddow.league_management.dto;


import com.iforddow.league_management.jpa.entity.User;

public record UserDTO(Integer id, String email, String firstName, String lastName) {

    public UserDTO(User user) {
        this(user.getId(), user.getEmail(), user.getFirstName(), user.getLastName());
    }

}


