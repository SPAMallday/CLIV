package com.ssafy.crafts.db.repository.querydslRepo;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.crafts.api.response.ClassInfoResponse;
import com.ssafy.crafts.db.entity.ClassInfo;
import com.ssafy.crafts.db.entity.QClassInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ClassInfoQuerydslRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final MemberQuerydslRepository memberQuerydslRepository;
    QClassInfo qClassInfo = QClassInfo.classInfo;
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
    public List<ClassInfoResponse> findClassInfoAll(){
        /**
         * @Method Name : findClassInfoAll
         * @작성자 : 허성은
         * @Method 설명 : 예정 수업 리스트 전체 조회
         */
        return jpaQueryFactory
                .select(Projections.fields(ClassInfoResponse.class,
                        qClassInfo.id.as("classId"),
                        qClassInfo.teacher.id.as("teacherId"),
                        qClassInfo.category.id.as("categoryId"),
                        qClassInfo.members.as("members"),
                        qClassInfo.className.as("className"),
                        qClassInfo.classDatetime.as("classDatetime"),
                        qClassInfo.classStatus.as("classStatus"),
                        qClassInfo.classImg.as("classImg"),
                        qClassInfo.content.as("content"),
                        qClassInfo.headcount.as("headcount"),
                        qClassInfo.level.as("level"),
                        qClassInfo.price.as("price")))
                .from(qClassInfo)
                .where(qClassInfo.classStatus.eq(ClassInfo.ClassStatus.EXPECTED))
                .fetch();
    }
    public List<ClassInfoResponse> findClassInfoByCategory(int categoryId) {
        /**
         * @Method Name : findClassInfoByCategory
         * @작성자 : 허성은
         * @Method 설명 : 카테고리 아이디로 수업 리스트 조회
         */
        return jpaQueryFactory
                .select(Projections.fields(ClassInfoResponse.class,
                        qClassInfo.id.as("classId"),
                        qClassInfo.teacher.id.as("teacherId"),
                        qClassInfo.category.id.as("categoryId"),
                        qClassInfo.members.as("members"),
                        qClassInfo.className.as("className"),
                        qClassInfo.classDatetime.as("classDatetime"),
                        qClassInfo.classStatus.as("classStatus"),
                        qClassInfo.classImg.as("classImg"),
                        qClassInfo.content.as("content"),
                        qClassInfo.headcount.as("headcount"),
                        qClassInfo.level.as("level"),
                        qClassInfo.price.as("price")))
                .from(qClassInfo)
                .where(qClassInfo.category.id.eq(categoryId)
                        .and(qClassInfo.classStatus.eq(ClassInfo.ClassStatus.EXPECTED)))
                .fetch();

    }

    public List<ClassInfoResponse> findClassInfoByClassTime() {
        /**
         * @Method Name : findClassInfoByClassTime
         * @작성자 : 허성은
         * @Method 설명 : 수업 마감 시간이 임박한 수업 리스트 조회
         */
        return jpaQueryFactory
                .select(Projections.fields(ClassInfoResponse.class,
                        qClassInfo.id.as("classId"),
                        qClassInfo.teacher.id.as("teacherId"),
                        qClassInfo.category.id.as("categoryId"),
                        qClassInfo.members.as("members"),
                        qClassInfo.className.as("className"),
                        qClassInfo.classDatetime.as("classDatetime"),
                        qClassInfo.classStatus.as("classStatus"),
                        qClassInfo.classImg.as("classImg"),
                        qClassInfo.content.as("content"),
                        qClassInfo.headcount.as("headcount"),
                        qClassInfo.level.as("level"),
                        qClassInfo.price.as("price")))
                .from(qClassInfo)
                .where(qClassInfo.classStatus.eq(ClassInfo.ClassStatus.EXPECTED))
                .orderBy(qClassInfo.classDatetime.desc())
                .fetch();
    }

    public List<ClassInfoResponse> findClassInfoByHeadcount() {
        /**
         * @Method Name : findClassInfoByHeadcount
         * @작성자 : 허성은
         * @Method 설명 : 인원 마감이 임박한 수업 리스트 조회
         */
        return jpaQueryFactory
                .select(Projections.fields(ClassInfoResponse.class,
                        qClassInfo.id.as("classId"),
                        qClassInfo.teacher.id.as("teacherId"),
                        qClassInfo.category.id.as("categoryId"),
                        qClassInfo.members.as("members"),
                        qClassInfo.className.as("className"),
                        qClassInfo.classDatetime.as("classDatetime"),
                        qClassInfo.classStatus.as("classStatus"),
                        qClassInfo.classImg.as("classImg"),
                        qClassInfo.content.as("content"),
                        qClassInfo.headcount.as("headcount"),
                        qClassInfo.level.as("level"),
                        qClassInfo.price.as("price")))
                .from(qClassInfo)
                .where(qClassInfo.classStatus.eq(ClassInfo.ClassStatus.EXPECTED)
                        .and(qClassInfo.headcount.subtract(qClassInfo.members.size()).eq(1)))
                .fetch();
    }

    public List<ClassInfoResponse> findClassInfoByMemberId(String authId) {
        /**
         * @Method Name : findClassInfoByMemberId
         * @작성자 : 허성은
         * @Method 설명 : 회원이 수강신청을 한 수업 리스트 조회
         */
        return jpaQueryFactory
                .select(Projections.fields(ClassInfoResponse.class,
                        qClassInfo.id.as("classId"),
                        qClassInfo.teacher.id.as("teacherId"),
                        qClassInfo.category.id.as("categoryId"),
                        qClassInfo.members.as("members"),
                        qClassInfo.className.as("className"),
                        qClassInfo.classDatetime.as("classDatetime"),
                        qClassInfo.classStatus.as("classStatus"),
                        qClassInfo.classImg.as("classImg"),
                        qClassInfo.content.as("content"),
                        qClassInfo.headcount.as("headcount"),
                        qClassInfo.level.as("level"),
                        qClassInfo.price.as("price")))
                .from(qClassInfo)
                .where(qClassInfo.classStatus.eq(ClassInfo.ClassStatus.EXPECTED)
                        .and(qClassInfo.members.contains(memberQuerydslRepository.findMemberByAuthId(authId))))
                .orderBy(qClassInfo.classDatetime.desc())
                .fetch();
    }

    public List<ClassInfoResponse> findClassInfoByTeacherId(String authId) {
        /**
         * @Method Name : findClassInfoByTeacherId
         * @작성자 : 허성은
         * @Method 설명 : 회원이 개설한 수업 리스트 조회
         */
        return jpaQueryFactory
                .select(Projections.fields(ClassInfoResponse.class,
                        qClassInfo.id.as("classId"),
                        qClassInfo.teacher.id.as("teacherId"),
                        qClassInfo.category.id.as("categoryId"),
                        qClassInfo.members.as("members"),
                        qClassInfo.className.as("className"),
                        qClassInfo.classDatetime.as("classDatetime"),
                        qClassInfo.classStatus.as("classStatus"),
                        qClassInfo.classImg.as("classImg"),
                        qClassInfo.content.as("content"),
                        qClassInfo.headcount.as("headcount"),
                        qClassInfo.level.as("level"),
                        qClassInfo.price.as("price")))
                .from(qClassInfo)
                .where(qClassInfo.classStatus.eq(ClassInfo.ClassStatus.EXPECTED)
                        .and(qClassInfo.teacher.id.eq(authId)))
                .orderBy(qClassInfo.classDatetime.desc())
                .fetch();
    }
}
