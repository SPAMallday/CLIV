package com.ssafy.crafts.db.repository.querydslRepo;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.crafts.db.entity.MBoard;
import com.ssafy.crafts.db.entity.MBoardTeacher;
import com.ssafy.crafts.db.entity.QMBoard;
import com.ssafy.crafts.db.entity.QMBoardTeacher;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MBoardTeacherQuerydslRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QMBoard qmBoard = QMBoard.mBoard;
    QMBoardTeacher qmBoardTeacher = QMBoardTeacher.mBoardTeacher;

    public List<MBoardTeacher> findMBTeacherListByTeacherId(String teacherId) {
        return jpaQueryFactory.select(qmBoardTeacher).from(qmBoardTeacher)
                .where(qmBoardTeacher.teacher.auth.authId.eq(teacherId))
                .fetch();
    }

    public int findMBoardIdById(int mtId) {
        return jpaQueryFactory.select(qmBoardTeacher.mBoard.id).from(qmBoardTeacher)
                .where(qmBoardTeacher.id.eq(mtId))
                .fetchOne();
    }
}
