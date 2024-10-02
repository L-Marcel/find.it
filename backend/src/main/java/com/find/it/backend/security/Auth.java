package com.find.it.backend.security;

import java.util.Base64;
import java.util.Date;
import java.util.UUID;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class Auth {
  /// I got angry trying to configure .env and we won't deploy it anyway...
  private static String secret = "U29tZVNlY3JldEtleU5lZWRzVG9CZUF0TGVhc3QzMkJ5dGVz";
  private static SecretKey key;

  public static void prepare() {
    byte[] encodedKey = Base64.getDecoder().decode(Auth.secret);
    Auth.key = Keys.hmacShaKeyFor(encodedKey);
  };

  public static String encrypt(UUID id) {
    long currentTime = System.currentTimeMillis();
    Date now = new Date(currentTime);
    Date expiration = new Date(currentTime + (1000 * 60 * 60 * 24));

    return Jwts.builder()
        .subject(id.toString())
        .issuedAt(now)
        .expiration(expiration)
        .signWith(Auth.key)
        .compact();
  };

  public static boolean validate(UUID id, String token) {
    Claims claims = Jwts
        .parser()
        .decryptWith(Auth.key)
        .build()
        .parseSignedClaims(token)
        .getPayload();

    return id.toString().equals(claims.getSubject());
  };
}
