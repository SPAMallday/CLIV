package com.ssafy.crafts.db.repository.querydslRepo;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.crafts.db.entity.ClassInfo;
import com.ssafy.crafts.db.entity.QClassInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class ClassInfoQuerydslRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QClassInfo qClassInfo = QClassInfo.classInfo;

    public Optional<ClassInfo> findClassInfoById(int id) {
        ClassInfo classInfo = jpaQueryFactory.select(qClassInfo).from(qClassInfo)
                .where(qClassInfo.id.eq(id)).fetchOne();
        return Optional.ofNullable(classInfo);
    }
}
