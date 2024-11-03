package com.find.it.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import com.find.it.backend.dtos.ItemData;
import com.find.it.backend.dtos.records.ItemFormData;
import com.find.it.backend.errors.InvalidField;
import com.find.it.backend.errors.NotFound;
import com.find.it.backend.models.ContactType;
import com.find.it.backend.models.Item;
import com.find.it.backend.models.User;
import com.find.it.backend.models.ItemType;
import com.find.it.backend.repositories.ItemRepository;
import com.find.it.backend.repositories.PictureRepository;
import com.find.it.backend.repositories.SearchItemRepository;
import com.find.it.backend.security.Auth;

@Service
public class ItemService {
  @Autowired
  private ItemRepository repository;

  @Autowired
  private UserService users;

  @Autowired
  private PictureRepository pictures;

  @Autowired
  private SearchItemRepository searchRepository;

  public void create(ItemFormData newItem, String token) {
    UUID ownerId;

    try {
      ownerId = UUID.fromString(newItem.owner());
    } catch (Exception e) {
      throw new NotFound("Usuário não encontrado!");
    }

    User owner = users.findById(ownerId);
    Auth.validate(owner.getId(), token);

    Map<String, String> errors = new HashMap<>();

    if (newItem.picture().isEmpty()) {
      errors.put("picture", "Forneça uma imagem, mesmo que ilustrativa!");
    }

    if (owner.getContact() == ContactType.NONE) {
      if (newItem.district().isEmpty()) {
        errors.put("district", "Já que não tem contato, informe o bairro!");
      }

      if (newItem.street().isEmpty()) {
        errors.put("street", "Já que não tem contato, informe a rua!");
      }

      if (newItem.number() >= 0) {
        errors.put("number", "Já que não tem contato, informe o número!");
      }
    }

    if (!errors.isEmpty()) {
      throw new InvalidField(errors);
    }

    Item item = new Item(newItem, owner);
    item = repository.save(item);
    item.setPicture(pictures.createToItem(item.getId(), newItem.picture()));
    repository.save(item);
  }

  protected List<Item> findByTextAndLocation(
      String query,
      String city,
      String state,
      boolean finds,
      boolean losts,
      boolean donateds,
      int pageNumber) {
    Pageable page = PageRequest.of(pageNumber, 10);
    Page<Item> allItems = searchRepository.search(
        query,
        city,
        state,
        finds,
        losts,
        donateds,
        page);
    return allItems.toList();
  }

  protected List<Item> findByTextAndUser(
      String query,
      boolean finds,
      boolean losts,
      boolean donateds,
      UUID userId,
      int pageNumber) {
    User user = users.findById(userId);
    Pageable page = PageRequest.of(pageNumber, 10);
    Page<Item> allItems = searchRepository.search(
        query,
        finds,
        losts,
        donateds,
        user.getId(),
        page);

    return allItems.toList();
  }

  public List<ItemData> searchByTextAndLocation(
      String query,
      String city,
      String state,
      boolean finds,
      boolean losts,
      boolean donateds,
      int pageNumber) {
    return this.findByTextAndLocation(query, city, state, finds, losts, donateds, pageNumber)
        .stream()
        .map(item -> new ItemData(item))
        .collect(Collectors.toList());
  };

  public List<ItemData> searchByTextAndUser(
      String query,
      boolean finds,
      boolean losts,
      boolean donateds,
      UUID user,
      int pageNumber) {
    return this.findByTextAndUser(query, finds, losts, donateds, user, pageNumber)
        .stream()
        .map(item -> new ItemData(item))
        .collect(Collectors.toList());
  };

  protected Item findById(Long id) {
    Optional<Item> item = repository.findById(id);
    if (!item.isPresent()) {
      throw new NotFound("Item não encontrado!");
    }
    return item.get();
  };

  protected Item findByUserAndId(User user, Long id) {
    Optional<Item> item = repository.findByUserAndId(user, id);
    if (!item.isPresent()) {
      throw new NotFound("Item não encontrado!");
    }
    return item.get();
  };

  public ItemData getById(Long id) {
    Item item = this.findById(id);
    return new ItemData(item);
  };

  public void close(Long id, String token) {
    Item item = this.findById(id);
    User owner = item.getUser();
    Auth.validate(owner.getId(), token);
    System.out.println(item.getType());
    switch (item.getType()) {
      case ItemType.FIND:
        owner.find();
        break;
      case ItemType.LOST:
        owner.recevery();
        break;
      case ItemType.DONATION:
        owner.donate();
        break;
      default:
        break;
    }

    users.save(owner);
    repository.delete(item);
  };

  public void delete(Long id, String token) {
    Item item = this.findById(id);
    User owner = item.getUser();
    Auth.validate(owner.getId(), token);
    repository.delete(item);
  };

  public void update(ItemFormData updateItem, Long id, String token) {
    UUID ownerId;

    try {
      ownerId = UUID.fromString(updateItem.owner());
    } catch (Exception e) {
      throw new NotFound("Usuário não encontrado!");
    }

    User owner = users.findById(ownerId);
    Auth.validate(owner.getId(), token);
    Item item = this.findByUserAndId(owner, id);

    if (updateItem.picture() != null) {
      pictures.deleteToItem(item.getPicture());
    }

    item.update(updateItem);

    if (updateItem.picture() != null) {
      item.setPicture(pictures.createToItem(item.getId(), updateItem.picture()));
    }

    repository.save(item);
  };
}
