package com.iforddow.league_management.dto;

import com.iforddow.league_management.jpa.entity.Token;

public record TokenDTO(String accessToken) {

    public TokenDTO(Token token) {
        this(token.getToken());
    }

}
