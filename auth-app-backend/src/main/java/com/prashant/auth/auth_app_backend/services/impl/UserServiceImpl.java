package com.prashant.auth.auth_app_backend.services.impl;

import com.prashant.auth.auth_app_backend.dtos.UserDto;
import com.prashant.auth.auth_app_backend.entities.Provider;
import com.prashant.auth.auth_app_backend.entities.User;
import com.prashant.auth.auth_app_backend.exceptions.ResourceNotFoundException;
import com.prashant.auth.auth_app_backend.helpers.UserHelper;
import com.prashant.auth.auth_app_backend.repositories.UserRepository;
import com.prashant.auth.auth_app_backend.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    @Override
    @Transactional
    public UserDto createUser(@NotNull UserDto userDto) {
        if(userDto.getEmail() == null || userDto.getEmail().isBlank()){
            throw new IllegalArgumentException("email must be provided");
        }
        if(userRepository.existsByEmail(userDto.getEmail())){
            throw new IllegalArgumentException("user already exists");
        }

       User user = modelMapper.map(userDto , User.class);
       user.setProvider(userDto.getProvider()!=null? userDto.getProvider() : Provider.LOCAL);
//       assign role to the new user for authorisation-todo

       User saveduser = userRepository.save(user);
        return modelMapper.map(saveduser , UserDto.class);
    }

    @Override
    public UserDto getUserByEmail(String email) {
        if (email == null || email.isBlank()){
        throw new IllegalArgumentException("provide valid email");
        }
            User user = userRepository.findByEmail(email).orElseThrow(()->new ResourceNotFoundException("user does not exist with given email"));
            return modelMapper.map(user , UserDto.class);
    }

    @Override
    public UserDto updateUser(UserDto userDto, String userId) {
        UUID uuid = UserHelper.parseUUID(userId);
        User existingUser = userRepository.findById(uuid).orElseThrow(()->new ResourceNotFoundException("user doesn't exists"));

        if (userDto.getEmail()!=null)existingUser.setEmail(userDto.getEmail());
        if (userDto.getName()!=null)existingUser.setName(userDto.getName());
//        todo-change password updation logic to implement hashing and encoding
        if (userDto.getPassword()!=null)existingUser.setPassword(userDto.getPassword());
        if (userDto.getImage()!=null)existingUser.setImage(userDto.getImage());
        if (userDto.getProvider()!=null)existingUser.setProvider(userDto.getProvider());
        existingUser.setEnabled(userDto.isEnable());
        existingUser.setUpdatedAt(Instant.now());
        User updatedUser  = userRepository.save(existingUser);

        return modelMapper.map(updatedUser , UserDto.class);
    }

    @Override
    @Transactional
    public void deleteUser(String userId) {
        UUID uid = UserHelper.parseUUID(userId);
        userRepository.findById(uid).orElseThrow(()->new ResourceNotFoundException("user with given id doesn't exists"));
        userRepository.deleteById(uid);
    }

    @Override
    public UserDto getByUserId(String userId) {
        User user = userRepository.findById(UserHelper.parseUUID(userId)).orElseThrow(()-> new ResourceNotFoundException("user doesn't exist with the given id "));
        return modelMapper.map(user , UserDto.class);
    }

    @Override
    @Transactional()
    public Iterable<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(user -> modelMapper.map(user , UserDto.class)).toList();
    }
}
