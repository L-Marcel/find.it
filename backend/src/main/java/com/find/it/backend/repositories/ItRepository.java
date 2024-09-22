package com.find.it.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.find.it.backend.models.It;

public interface ItRepository extends JpaRepository<It, Long> {
};