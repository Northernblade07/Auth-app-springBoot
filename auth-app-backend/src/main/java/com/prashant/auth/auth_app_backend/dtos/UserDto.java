package com.prashant.auth.auth_app_backend.dtos;

import com.prashant.auth.auth_app_backend.entities.Provider;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private String email;
    private String name;
    private String password;
    private String image;
    private Provider provider;
    private Set<RoleDto> roleDtos  = new HashSet<>();
}
