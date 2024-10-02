package com.find.it.backend.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.find.it.backend.models.User;

public interface UserRepository extends JpaRepository<User, UUID> {
  boolean existsByName(String name);

  boolean existsByEmail(String email);

  boolean existsByPhone(String phone);

  Optional<User> findByEmailAndPassword(String email, String password);
};