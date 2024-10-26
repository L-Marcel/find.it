package com.find.it.backend.security;

import java.util.Base64;
import java.util.Date;
import java.util.UUID;

import javax.crypto.SecretKey;

import com.find.it.backend.errors.Unauthorized;

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

  public static void validate(UUID id, String token) {
    if (token == null)
      throw new Unauthorized("Permissão negada!");

    try {
      Claims claims = Jwts
          .parser()
          .verifyWith(Auth.key)
          .build()
          .parseSignedClaims(token)
          .getPayload();

      if (!id.toString().equals(claims.getSubject()))
        throw new Unauthorized("Permissão negada!");
    } catch (Exception e) {
      throw new Unauthorized("Permissão negada!");
    }
  };
}
