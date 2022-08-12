package com.ssafy.crafts.db.repository.querydslRepo;

import com.querydsl.core.types.Path;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.crafts.api.response.ClassInfoResponse;
import com.ssafy.crafts.db.entity.ClassInfo;
import com.ssafy.crafts.db.entity.Member;
import com.ssafy.crafts.db.entity.QClassInfo;
import com.ssafy.crafts.db.entity.QMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;

@Repository
@RequiredArgsConstructor
public class ClassInfoQuerydslRepository {
    static SimpleDateFormat timeStampFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
    private final JPAQueryFactory jpaQueryFactory;
    private final MemberQuerydslRepository memberQuerydslRepository;
    QClassInfo qClassInfo = QClassInfo.classInfo;
    QMember qMember = QMember.member;
    public ClassInfo findClassInfoById(int id) {
        /**
         * @Method Name : findClassInfoById
         * @작성자 : 허성은
         * @Method 설명 : 클래스 아이디로 비디오 조회
         */
        ClassInfo classInfo = jpaQueryFactory.select(qClassInfo).from(qClassInfo)
                .where(qClassInfo.id.eq(id)).fetchOne();
        return classInfo;
    }
    public List<ClassInfo> findClassInfoAll() {
        /**
         * @Method Name : findClassInfoAll
         * @작성자 : 허성은
         * @Method 설명 : 예정 수업 리스트 전체 조회
         */
        return jpaQueryFactory
                .select(qClassInfo)
                .from(qClassInfo)
                .where(qClassInfo.classStatus.eq(ClassInfo.ClassStatus.EXPECTED))
                .fetch();
    }
    public List<ClassInfo> findClassInfoByCategory(int categoryId) {
        /**
         * @Method Name : findClassInfoByCategory
         * @작성자 : 허성은
         * @Method 설명 : 카테고리 아이디로 수업 리스트 조회
         */
        return jpaQueryFactory
                .select(qClassInfo)
                .from(qClassInfo)
                .where(qClassInfo.category.id.eq(categoryId)
                        .and(qClassInfo.classStatus.eq(ClassInfo.ClassStatus.EXPECTED)))
                .fetch();

    }

    public List<ClassInfo> findClassInfoByClassTime() {
        /**
         * @Method Name : findClassInfoByClassTime
         * @작성자 : 허성은
         * @Method 설명 : 수업 마감 시간이 임박한 수업 5개(변경 가능) 조회
         */
        return jpaQueryFactory
                .select(qClassInfo)
                .from(qClassInfo)
                .where(qClassInfo.classStatus.eq(ClassInfo.ClassStatus.EXPECTED))
                .orderBy(qClassInfo.classDatetime.desc())
                .limit(4)
                .fetch();
    }

    public List<ClassInfo> findClassInfoByHeadcount() {
        /**
         * @Method Name : findClassInfoByHeadcount
         * @작성자 : 허성은
         * @Method 설명 : 인원 마감이 임박한 수업 5개(변경 가능) 조회
         */
        return jpaQueryFactory
                .select(qClassInfo)
                .from(qClassInfo)
                .where(qClassInfo.classStatus.eq(ClassInfo.ClassStatus.EXPECTED))
                .orderBy(qClassInfo.headcount.subtract(qClassInfo.members.size()).asc())
                .limit(4)
                .fetch();
    }

    public List<ClassInfo> findClassInfoByMemberId(String authId) {
        /**
         * @Method Name : findClassInfoByMemberId
         * @작성자 : 허성은
         * @Method 설명 : 회원이 수강신청을 한 수업 리스트 조회
         */
        return jpaQueryFactory
                .select(qClassInfo)
                .from(qClassInfo)
                .leftJoin(qClassInfo.members, qMember)
                .where(qClassInfo.members.contains(qMember)
                    .and(qClassInfo.classStatus.eq(ClassInfo.ClassStatus.EXPECTED)))
                .orderBy(qClassInfo.classDatetime.desc())
                .fetch();
    }

    public List<ClassInfo> findClassInfoByTeacherId(String authId) {
        /**
         * @Method Name : findClassInfoByTeacherId
         * @작성자 : 허성은
         * @Method 설명 : 회원이 개설한 수업 리스트 조회
         */
        return jpaQueryFactory
                .select(qClassInfo)
                .from(qClassInfo)
                .where(qClassInfo.classStatus.eq(ClassInfo.ClassStatus.EXPECTED)
                        .and(qClassInfo.teacher.id.eq(authId)))
                .orderBy(qClassInfo.classDatetime.desc())
                .fetch();
    }

    public List<ClassInfo> findClassInfoByRegdate() {
        /**
         * @Method Name : findClassInfoByRegdate
         * @작성자 : 허성은
         * @Method 설명 : 수업 개설순으로 조회.
         */
        return jpaQueryFactory
                .select(qClassInfo)
                .from(qClassInfo)
                .where(qClassInfo.classStatus.eq(ClassInfo.ClassStatus.EXPECTED))
                .orderBy(qClassInfo.regdate.desc())
                .fetch();
    }
}
