package com.ssafy.crafts.common.model.service;

import com.ssafy.crafts.common.model.dto.MemberDetailsImpl;
import com.ssafy.crafts.db.entity.Member;
import com.ssafy.crafts.db.repository.jpaRepo.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberDetailsServiceImpl implements UserDetailsService {

    private final MemberRepository memberRepository;

    public MemberDetailsImpl loadUserByUsername(String authId) throws UsernameNotFoundException {
        Member member = memberRepository.findById(authId)
                .orElseThrow(() -> new UsernameNotFoundException(authId + "은 존재하지 않는 아이디입니다."));

        return new MemberDetailsImpl(member);
    }
}