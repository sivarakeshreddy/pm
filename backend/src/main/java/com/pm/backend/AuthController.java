package com.pm.backend;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class AuthController {

    private static final String VALID_USERNAME = "user";
    private static final String VALID_PASSWORD = "password";
    private static final String SESSION_ATTR_USER = "authenticatedUser";

    @PostMapping("/api/auth/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials, HttpSession session) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        if (VALID_USERNAME.equals(username) && VALID_PASSWORD.equals(password)) {
            session.setAttribute(SESSION_ATTR_USER, username);
            return ResponseEntity.ok(Map.of("success", true, "username", username));
        }
        return ResponseEntity.status(401).body(Map.of("success", false, "error", "Invalid credentials"));
    }

    @PostMapping("/api/auth/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(Map.of("success", true));
    }

    @GetMapping("/api/auth/status")
    public ResponseEntity<?> status(HttpSession session) {
        String user = (String) session.getAttribute(SESSION_ATTR_USER);
        if (user != null) {
            return ResponseEntity.ok(Map.of("authenticated", true, "username", user));
        }
        return ResponseEntity.ok(Map.of("authenticated", false));
    }
}
