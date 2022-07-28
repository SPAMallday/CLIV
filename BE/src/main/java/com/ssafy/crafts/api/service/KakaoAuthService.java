package com.ssafy.crafts.api.service;

import com.ssafy.crafts.api.request.AuthRequest;
import com.ssafy.crafts.api.response.AuthResponse;
import com.ssafy.crafts.common.auth.ClientKakao;
import com.ssafy.crafts.common.util.AuthToken;
import com.ssafy.crafts.common.util.AuthTokenProvider;
import com.ssafy.crafts.db.entity.Member;
import com.ssafy.crafts.db.entity.RoleType;
import com.ssafy.crafts.db.entity.Status;
import com.ssafy.crafts.db.repository.MemberQuerydslRepository;
import com.ssafy.crafts.db.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/*
*	카카오 로그인 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
*/
@Service
@RequiredArgsConstructor
public class KakaoAuthService {

    private final ClientKakao clientKakao;
    private final MemberQuerydslRepository memberQuerydslRepository;
    private final AuthTokenProvider authTokenProvider;
    private final MemberRepository memberRepository;

    /*
    * access token을 가지고 ClientKakao을 호출하여 카카오의 사용자 정보를 조회
    * 사용자 정보 조회 후, 내려받은 사용자식별 ID 값으로 DB에서 이미 가입된 사람인지를 판별 후, 새로운 유저라면 저장, JWT 토큰을 발급
    * 기존 사용자라면 토큰 만료로 인한 재요청이기 때문에 DB와의 커넥션 없이 바로 새로운 토큰만 발급하여 반환
    */
    @Transactional
    public AuthResponse login(AuthRequest authRequest) {
        Member kakaoMember = clientKakao.getUserData(authRequest.getAccessToken());
        String id = kakaoMember.getId();
        Member member = memberQuerydslRepository.findById(id);

        AuthToken appToken = authTokenProvider.createUserAppToken(id);

        if (member == null) {
            Member newbie = Member.builder()
                            .email(kakaoMember.getEmail())
                            .gender(kakaoMember.getGender())
                            .id(UUID.randomUUID().toString())
                            .status(Status.ACTIVE)
                            .roleType(RoleType.MEMBER)
                            .nickname(kakaoMember.getEmail())
                            .build();

            memberRepository.save(newbie);

            return AuthResponse.builder()
                    .appToken(appToken.getToken())
                    .isNewMember(Boolean.TRUE)
                    .build();
        }

        return AuthResponse.builder()
                .appToken(appToken.getToken())
                .isNewMember(Boolean.FALSE)
                .build();
    }
}
