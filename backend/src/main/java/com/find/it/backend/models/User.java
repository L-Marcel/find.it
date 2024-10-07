package com.find.it.backend.models;

import java.util.Set;
import java.util.UUID;

import com.find.it.backend.dtos.UserData;
import com.find.it.backend.dtos.records.UserCreateData;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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

  private int donated = 0;

  private int recovered = 0;

  private int finds = 0;

  @Enumerated(EnumType.ORDINAL)
  private ContactType contact = ContactType.NONE;

  @OneToMany(cascade = CascadeType.ALL)
  @JoinColumn(name = "owner")
  private Set<It> its;

  public User(UserData user) {
    this.id = user.getId();
    this.name = user.getName();
    this.email = user.getEmail();
    this.phone = user.getPhone();
    this.picture = user.getPicture();
    this.contact = user.getContact();
    this.donated = user.getDonated();
    this.finds = user.getFinds();
    this.recovered = user.getRecovered();
  }

  public User(UserCreateData user) {
    this.name = user.name();
    this.phone = user.phone();
    this.email = user.email();
    this.password = user.password();
    this.contact = user.contact();
  };
};
