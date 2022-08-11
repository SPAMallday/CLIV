package com.ssafy.crafts.db.repository.querydslRepo;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.crafts.db.entity.Auth;
import com.ssafy.crafts.db.entity.Member;
import com.ssafy.crafts.db.entity.QAuth;
import com.ssafy.crafts.db.entity.QMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
@RequiredArgsConstructor
public class MemberQuerydslRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QMember qMember = QMember.member;
    QAuth qAuth = QAuth.auth;

    public Member findMemberByAuthId(String authId) {
        Member member = jpaQueryFactory.select(qMember).from(qMember)
                .where(qMember.auth.authId.eq(authId)).fetchOne();
        return member;
    }

    public Optional<Auth> findAuthByAuthId(String authId) {
        Auth auth = jpaQueryFactory.select(qAuth).from(qAuth)
                .where(qAuth.authId.eq(authId)).fetchOne();
        return Optional.ofNullable(auth);
    }

}