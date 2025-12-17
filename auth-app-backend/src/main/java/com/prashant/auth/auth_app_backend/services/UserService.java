package com.prashant.auth.auth_app_backend.services;

import com.prashant.auth.auth_app_backend.dtos.UserDto;


import java.util.UUID;

public interface UserService {

    UserDto createUser(UserDto userDto);

    UserDto getUserByEmail(String email);

    UserDto updateUser(UserDto userDto , String userId);

    void deleteUser(String userId);

    UserDto getByUserId(String userId);

    Iterable<UserDto> getAllUsers();
}
