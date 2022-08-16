package com.ssafy.crafts.common.util;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.crafts.common.exception.TokenValidFailedException;
import com.ssafy.crafts.db.entity.Member;
import com.ssafy.crafts.db.repository.querydslRepo.MemberQuerydslRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
public class AuthTokenProvider {

    @Value("${jwt.access-token.expire-length}") //1h
    private String expiry;

    private final Key key;
    private final MemberQuerydslRepository memberQuerydslRepository;
    private static final String AUTHORITIES_KEY = "role";

    public AuthTokenProvider(@Value("${jwt.token.secret-key}") String secretKey) {
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
        this.memberQuerydslRepository = new MemberQuerydslRepository(new JPAQueryFactory(new EntityManager()));
    }

    public AuthToken createToken(String id, String nickname, Member.RoleType roleType, String expiry) {
        Date expiryDate = getExpiryDate(expiry);
        return new AuthToken(id, nickname, roleType, expiryDate, key);
    }

    public AuthToken createUserAppToken(String id, String nickname) {
        return createToken(id, nickname, Member.RoleType.MEMBER, expiry);
    }

    public AuthToken convertAuthToken(String token) {
        return new AuthToken(token, key);
    }

    public static Date getExpiryDate(String expiry) {
        return new Date(System.currentTimeMillis() + Long.parseLong(expiry));
    }

    public Authentication getAuthentication(AuthToken authToken) {

        if(authToken.validate()) {

            Claims claims = authToken.getTokenClaims();
            Collection<? extends GrantedAuthority> authorities =
                    Arrays.stream(new String[]{claims.get(AUTHORITIES_KEY).toString()})
                            .map(SimpleGrantedAuthority::new)
                            .collect(Collectors.toList());

            User principal = new User(claims.getSubject(), "", authorities);

            return new UsernamePasswordAuthenticationToken(principal, authToken, authorities);
        } else {
            throw new TokenValidFailedException();
        }
    }

}