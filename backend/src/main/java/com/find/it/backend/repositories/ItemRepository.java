package com.find.it.backend.repositories;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.find.it.backend.models.Item;
import com.find.it.backend.models.ItemType;

public interface ItemRepository extends JpaRepository<Item, Long> {
  List<Item> findAllByCityAndStateAndType(String city, String state, ItemType type, Pageable page);
};