package com.movierama.config;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.movierama.utils.CachedBodyHttpServletRequest;
import com.movierama.utils.JwtUtil;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private JwtUtil jwtUtil;
    private UserDetailsService userDetailsService;
    private static final List<String> EXCLUDE_URLS = List.of(
            "/signup",      // Exclude signup endpoint
            "/static/",     // Exclude static resources
            "/css/",        // Static CSS resources
            "/js/",         // Static JavaScript resources
            "/images/",      // Static images
            "/movierama/styles-5INURTSO.css",
            "/movierama/main-MN2YCNCT.js",
            "/movierama/polyfills-FFHMD2TL.js",
            "/movierama/favicon.ico",
            "/movierama/",
            "/movierama/api/movies"
    );
    public JwtAuthenticationFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
    	 // Skip the filter for excluded URLs
        if (shouldSkipFilter(request.getRequestURI())) {
            filterChain.doFilter(request, response);
            return;
        }
    	final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")
        		&& !request.getRequestURI().endsWith("signup")) {
        	if(request.getRequestURI().endsWith("login")) {
        		filterChain.doFilter(request, response);
        		jwt = authorizationHeader.substring(7);
        		username = jwtUtil.extractUsername(jwt);
        		UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        		System.out.println("Username from login request: " + username);
        		if (jwtUtil.validateToken(jwt, userDetails.getUsername())) {
                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        		}
        	}else {
        		jwt = authorizationHeader.substring(7);
            	username = jwtUtil.extractUsername(jwt);
        	}
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        	UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            if (jwtUtil.validateToken(jwt, userDetails.getUsername())) {
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        filterChain.doFilter(request, response);
    }
    // Method to check if the current request should be skipped
    private boolean shouldSkipFilter(String requestURI) {
        return EXCLUDE_URLS.stream().anyMatch(requestURI::equals);
    }
	
}


