package com.ssafy.crafts.api.service;

import com.ssafy.crafts.api.response.LoginResponse;
import com.ssafy.crafts.api.response.OauthTokenResponse;
import com.ssafy.crafts.common.auth.KakaoUserInfo;
import com.ssafy.crafts.common.auth.Oauth2UserInfo;
import com.ssafy.crafts.common.util.JwtTokenProvider;
import com.ssafy.crafts.db.entity.Member;
import com.ssafy.crafts.db.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;

import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class KakaoService {

    private static final String BEARER_TYPE = "Bearer";

    private final InMemoryClientRegistrationRepository inMemoryRepository;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    /*
     * @InMemoryRepository application-oauth properties 정보를 담고 있음
     * @getToken() 넘겨받은 code 로 Oauth 서버에 Token 요청
     * @getUserProfile 첫 로그인 시 회원가입
     * 유저 인증 후 Jwt AccessToken, Refresh Token 생성
     */
    public LoginResponse login(String providerName, String code) {
        ClientRegistration provider = inMemoryRepository.findByRegistrationId(providerName);
        OauthTokenResponse tokenResponse = getToken(code, provider);
        Member member = getMemberProfile(providerName, tokenResponse, provider);

        String accessToken = jwtTokenProvider.createAccessToken(String.valueOf(member.getId()));
        String refreshToken = jwtTokenProvider.createRefreshToken();

        return LoginResponse.builder()
                .id(member.getId())
                .nickName(member.getNickname())
                .email(member.getEmail())
                .profileImage(member.getProfileImage())
                .status(member.getStatus())
                .tokenType(BEARER_TYPE)
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    private Member getMemberProfile(String providerName, OauthTokenResponse tokenResponse, ClientRegistration provider) {
        Map<String, Object> memberAttributes = getMemberAttributes(provider, tokenResponse);
        Oauth2UserInfo oauth2UserInfo = null;
        if (providerName.equals("kakao")) {
            oauth2UserInfo = new KakaoUserInfo(memberAttributes);
        } else {
            log.info("허용되지 않은 접근입니다.");
        }

        String provide = oauth2UserInfo.getProvider();
        String providerId = oauth2UserInfo.getProviderId();
        String nickName = oauth2UserInfo.getNickName();
        String email = oauth2UserInfo.getEmail();
        String profileImage = oauth2UserInfo.getProfileImage();

        Member extract = memberRepository.findMemberByEmail(email);

        if (extract == null) {
            extract = new Member(profileImage, nickName, email);
            memberRepository.save(extract);
        }
        return extract;
    }

    private Map<String, Object> getMemberAttributes(ClientRegistration provider, OauthTokenResponse tokenResponse) {
        log.info("getUserAttributes In");
        log.info("userinfoUri = {}", provider.getProviderDetails().getUserInfoEndpoint().getUri());
        return WebClient.create()
                .get()
                .uri(provider.getProviderDetails().getUserInfoEndpoint().getUri())
                .headers(header -> header.setBearerAuth(tokenResponse.getAccessToken()))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                .block();
    }

    private OauthTokenResponse getToken(String code, ClientRegistration provider) {
        log.info("OauthService.getToken In");
        log.info("provider.TokenUri = {}" , provider.getProviderDetails().getTokenUri());
        return WebClient.create()
                .post()
                .uri(provider.getProviderDetails().getTokenUri())
                .headers(header -> {
                    header.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
                    header.setAcceptCharset(Collections.singletonList(StandardCharsets.UTF_8));
                    log.info("header = {}", header);
                })
                .bodyValue(tokenRequest(code, provider))
                .retrieve()
                .bodyToMono(OauthTokenResponse.class)
                .block();

    }

    private MultiValueMap<String, String> tokenRequest(String code, ClientRegistration provider) {
        log.info("tokenRequest In");
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("code", code);
        formData.add("grant_type", "authorization_code");
        formData.add("redirect_uri", provider.getRedirectUri());
        formData.add("client_secret",provider.getClientSecret());
        formData.add("client_id",provider.getClientId());
        log.info("redirectUri = {}", provider.getRedirectUri());
        return formData;
    }
}
