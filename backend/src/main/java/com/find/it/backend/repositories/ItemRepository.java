package com.find.it.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;

import com.find.it.backend.models.Item;
import com.find.it.backend.models.User;

public interface ItemRepository extends JpaRepository<Item, Long> {
  @NonNull
  @Query(value = "SELECT * FROM ITEMS "
      + "WHERE (LOWER(title) LIKE CONCAT('%', LOWER(:query), '%') OR "
      + "LOWER(description) LIKE CONCAT('%', LOWER(:query), '%')) AND "
      + "city = :city AND state = :state", nativeQuery = true)
  Page<Item> searchByCityAndState(
      @Param("query") String query,
      @Param("city") String city,
      @Param("state") String state,
      @NonNull Pageable page);

  Optional<Item> findByUserAndId(User user, Long id);
};