package com.ssafy.crafts.common.auth;

import com.ssafy.crafts.common.util.AuthToken;
import com.ssafy.crafts.common.util.AuthTokenProvider;
import com.ssafy.crafts.common.util.JwtHeaderUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
* Controller에서 로그인 요청을 보내기 전에 거쳐간다
*/
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final AuthTokenProvider tokenProvider;
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)  throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String tokenStr = JwtHeaderUtil.getAccessToken(request);
            AuthToken token = tokenProvider.convertAuthToken(tokenStr);

            if (token.validate()) {
                Authentication authentication = tokenProvider.getAuthentication(token);
                // 토큰으로 부터 획득한 인증 정보(authentication) 설정
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

            filterChain.doFilter(request, response);
        }
    }
}
