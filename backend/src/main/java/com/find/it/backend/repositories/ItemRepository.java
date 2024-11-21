package com.find.it.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.find.it.backend.models.Item;
import com.find.it.backend.models.User;

public interface ItemRepository extends JpaRepository<Item, Long> {
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