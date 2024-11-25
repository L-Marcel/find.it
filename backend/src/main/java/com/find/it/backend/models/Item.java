package com.find.it.backend.models;

import java.sql.Timestamp;

import org.hibernate.search.engine.backend.types.Searchable;
import org.hibernate.search.engine.backend.types.Sortable;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.IndexedEmbedded;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.GenericField;
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

@Indexed
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
  @GenericField(searchable = Searchable.YES)
  private ItemType type = ItemType.FIND;

  @FullTextField
  private String title;

  private String picture = "";

  @Column(length = 360)
  private String description = "";

  @FullTextField
  private String city;

  @FullTextField
  private String state;

  private String street = "";

  private String district = "";

  private int number = 0;

  private String complement = "";

  @GenericField(name = "updated_at", sortable = Sortable.YES)
  @Column(nullable = false)
  private Timestamp updatedAt = new Timestamp(System.currentTimeMillis());;

  @ManyToOne
  @JoinColumn(name = "owner")
  @IndexedEmbedded(includeEmbeddedObjectId = true)
  private User user;

  public Item(ItemFormData item, User user) {
    this.updatedAt = new Timestamp(System.currentTimeMillis());
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
    this.updatedAt = new Timestamp(System.currentTimeMillis());
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
