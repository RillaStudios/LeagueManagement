package com.iforddow.league_management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class LeagueManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(LeagueManagementApplication.class, args);
	}

}
