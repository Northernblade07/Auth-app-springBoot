package com.prashant.auth.auth_app_backend.dtos;

public record TokenResponse(
        String accessToken,
        String refreshToken,
        long expireIn,
        String tokenType,
        UserDto user
) {
public static TokenResponse of(String accessToken , String refreshToken , long expireIn , UserDto user){
    return new TokenResponse(accessToken, refreshToken, expireIn, "Bearer", user);
}
}
