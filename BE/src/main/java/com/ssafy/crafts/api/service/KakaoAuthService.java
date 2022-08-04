package com.ssafy.crafts.api.service;

import com.ssafy.crafts.api.request.AuthRequest;
import com.ssafy.crafts.api.response.AuthResponse;
import com.ssafy.crafts.common.util.AuthToken;
import com.ssafy.crafts.common.util.AuthTokenProvider;
import com.ssafy.crafts.db.entity.Auth;
import com.ssafy.crafts.db.entity.Member;
import com.ssafy.crafts.db.repository.jpaRepo.AuthRepository;
import com.ssafy.crafts.db.repository.querydslRepo.MemberQuerydslRepository;
import com.ssafy.crafts.db.repository.jpaRepo.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @FileName : KakaoAuthService
 * @작성자 : 허성은
 * @Class 설명 : 카카오 로그인 관련 비즈니스 로직 처리를 위한 서비스 구현 정의
 */
@Service
@RequiredArgsConstructor
public class KakaoAuthService {

    private final ClientKakao clientKakao;
    private final MemberQuerydslRepository memberQuerydslRepository;
    private final AuthTokenProvider authTokenProvider;
    private final MemberRepository memberRepository;
    private final AuthRepository authRepository;
    @Transactional
    public AuthResponse login(AuthRequest authRequest) {
        /**
        * access token을 가지고 ClientKakao을 호출하여 카카오의 사용자 정보를 조회
        * 사용자 정보 조회 후, 내려받은 사용자식별 ID 값으로 DB에서 이미 가입된 사람인지를 판별 후, 새로운 유저라면 저장, JWT 토큰을 발급
        * 기존 사용자라면 토큰 만료로 인한 재요청이기 때문에 DB와의 커넥션 없이 바로 새로운 토큰만 발급하여 반환
        */
        Member kakaoMember = clientKakao.getUserData(authRequest.getAccessToken());
        String id = kakaoMember.getAuth().getAuthId();
        Member member = memberQuerydslRepository.findMemberByAuthId(id).get();


        // 회원가입
        if (member == null) {
            Auth auth = Auth.builder()
                    .authId(id)
                    .email(kakaoMember.getAuth().getEmail())
                    .build();
            authRepository.save(auth);

            Member newbie = Member.builder()
                            .auth(authRepository.getOne(id))
                            .gender(kakaoMember.getGender())
                            .status(Member.Status.ACTIVE)
                            .roleType(Member.RoleType.MEMBER)
                            .nickname("회원_"+id)
                            .build();

            memberRepository.save(newbie);

        }

        String nickname = memberQuerydslRepository.findMemberByAuthId(id).get().getNickname();
        AuthToken appToken = authTokenProvider.createUserAppToken(id, nickname);

        return AuthResponse.builder()
                .appToken(appToken.getToken())
                .build();
    }
}
