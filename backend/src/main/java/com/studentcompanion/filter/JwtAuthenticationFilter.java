package com.studentcompanion.filter;

import com.studentcompanion.service.CustomUserDetailsService;
import com.studentcompanion.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    // List of public endpoints that don't need JWT validation
    private final List<String> publicEndpoints = Arrays.asList(
        "/login", 
        "/register", 
        "/api/auth/login", 
        "/api/auth/register",
        "/api/auth/test",
        "/api/users/register"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        
        String requestPath = request.getRequestURI();
        String method = request.getMethod();
        
        // Skip JWT validation for public endpoints
        if (isPublicEndpoint(requestPath)) {
            logger.debug("Skipping JWT validation for public endpoint: " + requestPath);
            filterChain.doFilter(request, response);
            return;
        }
        
        // For OPTIONS requests (CORS preflight), skip JWT validation
        if ("OPTIONS".equals(method)) {
            filterChain.doFilter(request, response);
            return;
        }
        
        final String authorizationHeader = request.getHeader("Authorization");
        
        String username = null;
        String jwt = null;
        
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            try {
                username = jwtUtil.extractUsername(jwt);
                logger.debug("Extracted username from JWT: " + username);
            } catch (Exception e) {
                logger.error("JWT token extraction failed: " + e.getMessage());
                // Continue without setting authentication - Spring Security will handle appropriately
            }
        } else {
            logger.debug("No Authorization header found or doesn't start with Bearer for: " + requestPath);
        }
        
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
                
                if (jwtUtil.validateToken(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = 
                            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                    logger.debug("JWT validation successful for user: " + username);
                } else {
                    logger.warn("JWT validation failed for user: " + username);
                }
            } catch (Exception e) {
                logger.error("JWT validation failed: " + e.getMessage());
                // Continue without setting authentication
            }
        }
        
        filterChain.doFilter(request, response);
    }

    private boolean isPublicEndpoint(String requestPath) {
        return publicEndpoints.stream().anyMatch(endpoint -> 
            requestPath.equals(endpoint) || requestPath.startsWith(endpoint + "/"));
    }
}