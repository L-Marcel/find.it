package com.find.it.backend.models;

import java.util.List;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.UUID;

import org.hibernate.search.engine.backend.types.Sortable;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.GenericField;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.find.it.backend.dtos.records.UserCreateData;
import com.find.it.backend.dtos.records.UserUpdateData;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(unique = true)
  private String name;

  @Column(unique = true)
  private String email;

  @Column(unique = true)
  private String phone;

  private String picture = "";

  private String password;

  private boolean whatsapp = false;

  private int donated = 0;

  private int recovered = 0;

  private int finds = 0;

  @Column(nullable = false)
  private Timestamp updatedAt = new Timestamp(System.currentTimeMillis());;

  @Enumerated(EnumType.ORDINAL)
  private ContactType contact = ContactType.NONE;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  @JsonIgnore
  private List<Item> items = new ArrayList<>();

  public User(UserCreateData user) {
    this.updatedAt = new Timestamp(System.currentTimeMillis());
    this.name = user.name();
    this.phone = user.phone();
    this.email = user.email();
    this.whatsapp = user.whatsapp();
    this.password = user.password();
    this.contact = user.contact();
  };

  public void update(UserUpdateData user) {
    this.updatedAt = new Timestamp(System.currentTimeMillis());
    this.name = user.name();
    this.phone = user.phone();
    this.email = user.email();
    this.whatsapp = user.whatsapp();
    if (user.updatePassword()) {
      this.password = user.password();
    }
    this.contact = user.contact();
  };

  public void donate() {
    donated++;
  };

  public void recevery() {
    recovered++;
  };

  public void find() {
    finds++;
  };
};
