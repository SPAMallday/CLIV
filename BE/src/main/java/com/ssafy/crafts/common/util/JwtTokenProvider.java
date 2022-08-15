package com.ssafy.crafts.common.util;

import com.ssafy.crafts.api.response.AuthResponse;
import com.ssafy.crafts.db.entity.Member;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class JwtTokenProvider {

    private final Key key;

    public JwtTokenProvider(@Value("${jwt.token.secret-key}") String secretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // Access Token 유효기간 - 하루
    private static final Long accessTokenValidTime = 24 * 60 * 60 * 1000L;

    // Refresh Token 유효기간 - 7일
    private static final Long refreshTokenValidTime = 7 * 24 * 60 * 60 * 1000L;

    @Autowired
    private UserDetailsService memberDetailsService;

    // 토큰 생성
    public AuthResponse createToken(Member member) {

        Map<String, Object> headers = new HashMap<>();
        headers.put("typ", "JWT");

        Claims claims = Jwts.claims().setSubject(member.getId());
        claims.put("nickname", member.getNickname());
        claims.put("role", member.getRoleType().toString());

        Date now = new Date();

        String accessToken = Jwts.builder()
                .setHeader(headers)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + accessTokenValidTime))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
//        System.out.println(accessToken);
        String refreshToken = Jwts.builder()
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshTokenValidTime))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        return AuthResponse.builder()
                .appToken(accessToken)
                .accessTokenExpiresIn(accessTokenValidTime)
                .refreshToken(refreshToken)
                .build();
    }

    // 토큰에서 회원 정보 추출
    public String getUserPk(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
    }

    // JWT 토큰에서 인증 정보 조회
    public Authentication getAuthentication(String token) {
        UserDetails memberDetails = memberDetailsService.loadUserByUsername(this.getUserPk(token));
        return new UsernamePasswordAuthenticationToken(memberDetails, "", memberDetails.getAuthorities());
    }

    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }

    // 토큰의 유효성 + 만료일자 확인
    public JwtReturn validateToken(String jwtToken) {
        System.out.println(jwtToken);
        try {
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwtToken);
            if (claims.getBody().getExpiration().after(new Date())) {
                return JwtReturn.SUCCESS;
            } else {
                return JwtReturn.FAIL;
            }
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다");
            return JwtReturn.EXPIRED;
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다");
        } catch (MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다");
        } catch (Exception e) {
            log.info(e.getMessage());
        }
        return JwtReturn.FAIL;
    }

    public String getAccessTokenPayload(String accessToken) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken)
                .getBody().getSubject();
    }

    public Long getUserIdFromToken(String token) {
        Claims claims = getAllClaims(token);
        return Long.valueOf(String.valueOf(claims.getSubject()));
    }

    private Claims getAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}