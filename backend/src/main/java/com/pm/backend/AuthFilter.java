package com.pm.backend;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class AuthFilter implements Filter {

    private static final String SESSION_ATTR_USER = "authenticatedUser";
    private static final String[] PUBLIC_PATHS = {"/api/auth/", "/api/health", "/_next", "/_static"};

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        String requestURI = httpRequest.getRequestURI();

        if (isPublicPath(requestURI)) {
            chain.doFilter(request, response);
            return;
        }

        HttpSession session = httpRequest.getSession(false);
        boolean authenticated = session != null && session.getAttribute(SESSION_ATTR_USER) != null;

        if (!authenticated) {
            httpResponse.setStatus(401);
            httpResponse.setContentType("application/json");
            httpResponse.getWriter().write("{\"error\":\"Unauthorized\"}");
            return;
        }

        chain.doFilter(request, response);
    }

    private boolean isPublicPath(String requestURI) {
        for (String path : PUBLIC_PATHS) {
            if (requestURI.startsWith(path) || requestURI.equals("/") || requestURI.equals("/index.html")) {
                return true;
            }
        }
        return false;
    }
}
