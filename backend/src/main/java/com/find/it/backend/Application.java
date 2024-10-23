package com.find.it.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.find.it.backend.security.Auth;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		// MARK: Remove bug that delete images from the server (at the moment user only)
		Auth.prepare();
		SpringApplication.run(Application.class, args);
	};
};
