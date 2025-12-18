package com.prashant.auth.auth_app_backend.services;

import com.prashant.auth.auth_app_backend.dtos.UserDto;

public interface AuthService {
    UserDto registerUser(UserDto userDto);
}
