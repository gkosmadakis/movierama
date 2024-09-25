package com.movierama.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

	@GetMapping(value = {"/movierama", "/"})
    public String index() {
        return "index.html";
    }
}

