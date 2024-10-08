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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

enum ContactType {
  NONE,
  PHONE,
  EMAIL,
  BOTH
};

@Entity
@Table(name = "Users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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
  private ContactType contact;

  @OneToMany(cascade = CascadeType.ALL)
  @JoinColumn(name = "owner")
  private Set<It> its;
};
