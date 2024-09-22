package com.find.it.backend.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.find.it.backend.models.User;

public interface UserRepository extends JpaRepository<User, UUID> {
};