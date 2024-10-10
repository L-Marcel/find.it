package com.find.it.backend.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.find.it.backend.dtos.records.ItemCreateData;
import com.find.it.backend.dtos.records.UserCreateData;
import com.find.it.backend.errors.AlreadyExists;
import com.find.it.backend.errors.NotFound;
import com.find.it.backend.models.Item;
import com.find.it.backend.models.User;
import com.find.it.backend.repositories.ItemRepository;
import com.find.it.backend.repositories.PictureRepository;
import com.find.it.backend.repositories.UserRepository;

@Service
public class ItemService {
  @Autowired
  private ItemRepository repository;

  @Autowired
  private UserService users;

  // @Autowired
  // private PictureRepository pictures;

  public void create(ItemCreateData newItem) {
    User owner = users.findById(newItem.owner());
    Item item = new Item(newItem, owner);
    item = repository.save(item);
  }
}
