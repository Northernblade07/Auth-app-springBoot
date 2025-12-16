package com.prashant.auth.auth_app_backend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "user_role")
public class Role {
    @Id
    private UUID id = UUID.randomUUID();
    @Column(unique = true , nullable = false)
    private String name;
}
