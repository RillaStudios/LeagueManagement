package com.iforddow.league_management.dto;

import com.iforddow.league_management.jpa.entity.Token;

public record TokenResponseDTO(String message, String accessToken, String refreshToken) {

}
