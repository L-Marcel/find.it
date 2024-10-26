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
      + "owner = :user AND "
      + "((:finds = true AND type = 0) OR "
      + "(:losts = true AND type = 1) OR "
      + "(:donateds = true AND type = 2))", nativeQuery = true)
  Page<Item> search(
      @Param("query") String query,
      @Param("finds") Boolean finds,
      @Param("losts") Boolean losts,
      @Param("donateds") Boolean donateds,
      @Param("user") String id,
      @NonNull Pageable page);

  @Query(value = "SELECT * FROM ITEMS "
      + "WHERE (LOWER(title) LIKE CONCAT('%', LOWER(:query), '%') OR "
      + "LOWER(description) LIKE CONCAT('%', LOWER(:query), '%')) AND "
      + "city = :city AND state = :state AND "
      + "((:finds = true AND type = 0) OR "
      + "(:losts = true AND type = 1) OR "
      + "(:donateds = true AND type = 2))", nativeQuery = true)
  Page<Item> search(
      @Param("query") String query,
      @Param("city") String city,
      @Param("state") String state,
      @Param("finds") Boolean finds,
      @Param("losts") Boolean losts,
      @Param("donateds") Boolean donateds,
      @NonNull Pageable page);

  @Query(value = "SELECT * FROM ITEMS "
      + "WHERE (LOWER(title) LIKE CONCAT('%', LOWER(:query), '%') OR "
      + "LOWER(description) LIKE CONCAT('%', LOWER(:query), '%')) AND "
      + "city = :city AND state = :state AND "
      + "owner = :user AND "
      + "((:finds = true AND type = 0) OR "
      + "(:losts = true AND type = 1) OR "
      + "(:donateds = true AND type = 2))", nativeQuery = true)
  Page<Item> search(
      @Param("query") String query,
      @Param("city") String city,
      @Param("state") String state,
      @Param("finds") Boolean finds,
      @Param("losts") Boolean losts,
      @Param("donateds") Boolean donateds,
      @Param("user") String id,
      @NonNull Pageable page);

  @Query(value = "SELECT CASE WHEN EXISTS ("
      + "SELECT 1 FROM ITEMS WHERE "
      + "owner = :user AND "
      + "(district IS NULL OR "
      + "number IS NULL OR "
      + "street IS NULL)"
      + ") THEN 'TRUE' ELSE 'FALSE' END", nativeQuery = true)
  Boolean existsItemWithoutLocationByUser(@Param("user") String id);

  Optional<Item> findByUserAndId(User user, Long id);
};