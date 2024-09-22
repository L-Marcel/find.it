package com.find.it.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

enum ItType {
  DONATION,
  LOST,
  FIND
};

@Entity
@Table(name = "Its")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class It {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private long id;

  @Enumerated(EnumType.ORDINAL)
  private ItType type;

  private String title;

  private String picture = "";

  private String description = "";

  private String city;

  private String state;

  private String street = "";

  private String district = "";

  private String number = "";

  private String complement = "";
};
