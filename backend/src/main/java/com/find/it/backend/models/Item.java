package com.find.it.backend.models;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import com.find.it.backend.dtos.records.ItemFormData;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Items")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Item {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private long id;

  @Enumerated(EnumType.ORDINAL)
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

  private Timestamp updateAt;

  @ManyToOne
  @JoinColumn(name = "owner")
  private User user;

  public Item(ItemFormData item, User user) {
    this.updateAt = new Timestamp(System.currentTimeMillis());
    if (item.type() != null) {
      this.type = item.type();
    }
    this.title = item.title();
    this.description = item.description();
    this.city = item.city();
    this.state = item.state();
    this.street = item.street();
    this.district = item.district();
    this.number = item.number();
    this.complement = item.complement();
    this.user = user;
  };

  public void update(ItemFormData item) {
    this.updateAt = new Timestamp(System.currentTimeMillis());
    if (item.type() != null) {
      this.type = item.type();
    }
    this.title = item.title();
    this.description = item.description();
    this.city = item.city();
    this.state = item.state();
    this.street = item.street();
    this.district = item.district();
    this.number = item.number();
    this.complement = item.complement();
  };
};
