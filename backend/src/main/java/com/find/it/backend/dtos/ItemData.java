package com.find.it.backend.dtos;

import com.find.it.backend.models.Item;
import com.find.it.backend.models.ItemType;

import lombok.Data;

@Data
public class ItemData {
  private long id;
  private ItemType type = ItemType.FIND;
  private String title;
  private String picture = "";
  private String description = "";
  private String city;
  private String state;
  private String street = "";
  private String district = "";
  private int number = 0;
  private String complement = "";
  private boolean closed = false;
  private UserData user;

  public ItemData(Item item) {
    this.id = item.getId();
    this.type = item.getType();
    this.title = item.getTitle();
    this.picture = item.getPicture();
    this.description = item.getDescription();
    this.city = item.getCity();
    this.state = item.getState();
    this.street = item.getStreet();
    this.district = item.getDistrict();
    this.number = item.getNumber();
    this.complement = item.getComplement();
    this.closed = item.isClosed();
    this.user = new UserData(item.getUser(), false);
  };
}
