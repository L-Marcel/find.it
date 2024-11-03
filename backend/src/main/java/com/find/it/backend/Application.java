package com.find.it.backend;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.find.it.backend.search.Indexer;
import com.find.it.backend.security.Auth;

@SpringBootApplication
public class Application {
	public static void main(String[] args) {
		Auth.prepare();
		SpringApplication.run(Application.class, args);
	};

	@Bean
	public ApplicationRunner buildIndex(Indexer indexer) {
		return (ApplicationArguments args) -> {
			indexer.indexPersistedData("com.find.it.backend.models.Item");
		};
	}
};
