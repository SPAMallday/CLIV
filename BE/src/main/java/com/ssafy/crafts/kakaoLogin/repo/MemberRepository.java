package com.ssafy.crafts.kakaoLogin.repo;

import com.ssafy.crafts.kakaoLogin.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findMemberByEmail(String email);
}
