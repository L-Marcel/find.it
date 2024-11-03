package com.find.it.backend.repositories.search;

import com.find.it.backend.models.Item;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface SearchRepository extends JpaRepository<Item, Long> {
  Page<Item> search(
      String query,
      String city,
      String state,
      boolean finds,
      boolean losts,
      boolean donateds,
      Pageable page);

  Page<Item> search(
      String query,
      boolean finds,
      boolean losts,
      boolean donateds,
      UUID user,
      Pageable page);
}
