package com.ssafy.crafts.db.repository;

import com.ssafy.crafts.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findMemberByEmail(String email);
    Member findByMemberId(Long id);
}
