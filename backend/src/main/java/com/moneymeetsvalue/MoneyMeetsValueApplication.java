package com.moneymeetsvalue;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MoneyMeetsValueApplication {

	/**
	 * main function that's apart of Spring Boot.
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		/**
		 * Make an indented JSON output. It makes the JSON output be considered as
		 * "pretty printed".
		 */
		System.setProperty("spring.jackson.serialization.INDENT_OUTPUT", "true");
		SpringApplication.run(MoneyMeetsValueApplication.class, args);
	}

}
