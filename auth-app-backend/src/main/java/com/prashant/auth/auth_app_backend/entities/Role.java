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
    @GeneratedValue(strategy = GenerationType.UUID)
   @Column(name = "id")
    private UUID id;

    @Column(unique = true , nullable = false)
    private String name;
}
