package com.prashant.auth.auth_app_backend.services.impl;

import com.prashant.auth.auth_app_backend.dtos.UserDto;
import com.prashant.auth.auth_app_backend.services.AuthService;
import com.prashant.auth.auth_app_backend.services.UserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
//@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    @Override
    public UserDto registerUser(UserDto userDto) {
        if (userDto.getPassword() == null || userDto.getPassword().isBlank()) {
            throw new IllegalArgumentException("Password must be provided");
        }
//        you can implement verifying logic here if you want before creating the user like -email , password etc.
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        return userService.createUser(userDto);
    }
}
