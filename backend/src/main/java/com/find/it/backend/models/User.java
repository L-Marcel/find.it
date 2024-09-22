package com.find.it.backend.models;

import java.util.Set;
import java.util.UUID;

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
import lombok.Getter;
import lombok.Setter;

enum ContactType {
  NONE,
  PHONE,
  EMAIL,
  BOTH
};

@Entity
@Table(name = "Users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Getter
  @Setter
  private UUID id;

  @Column(unique = true)
  @Getter
  @Setter
  private String name;

  @Column(unique = true)
  @Getter
  @Setter
  private String email;

  @Column(unique = true)
  @Getter
  @Setter
  private String phone;

  @Getter
  @Setter
  private String picture = "";

  @Getter
  @Setter
  private String password;

  @Getter
  @Setter
  private int donated = 0;

  @Getter
  @Setter
  private int recovered = 0;

  @Getter
  @Setter
  private int finds = 0;

  @Enumerated(EnumType.ORDINAL)
  @Getter
  @Setter
  private ContactType contact;

  @OneToMany(cascade = CascadeType.ALL)
  @JoinColumn(name = "owner")
  private Set<It> its;
};
