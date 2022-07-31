package com.ssafy.crafts.db.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.crafts.db.dto.UserInfoResponse;
import com.ssafy.crafts.db.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.crafts.db.entity.QMember.member;


@Repository
@RequiredArgsConstructor
public class MemberQuerydslRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Transactional(readOnly = true)
    public Member findById(String id) {
        return jpaQueryFactory
                .selectFrom(member)
                .where(member.id.like(id))
                .fetchOne();
    }

    public UserInfoResponse findByMemberId(String memberId) {
        return jpaQueryFactory
                .select(Projections.fields(UserInfoResponse.class,
                        member.gender.as("gender"),
                        member.email))
                .from(member)
                .where(member.id.like(memberId))
                .fetchOne();
    }
}