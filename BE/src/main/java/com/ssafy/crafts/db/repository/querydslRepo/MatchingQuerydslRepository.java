package com.ssafy.crafts.db.repository.querydslRepo;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.crafts.db.entity.MBoard;
import com.ssafy.crafts.db.entity.MBoardTeacher;
import com.ssafy.crafts.db.entity.QMBoard;
import com.ssafy.crafts.db.entity.QMBoardTeacher;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MatchingQuerydslRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QMBoard qmBoard = QMBoard.mBoard;
    QMBoardTeacher qmBoardTeacher = QMBoardTeacher.mBoardTeacher;

    public List<Integer> findMBoardIdListByTeacherId(String teacherId) {
        List<Integer> mBoardIdList = jpaQueryFactory.select(qmBoardTeacher.mBoard.id)
                .from(qmBoardTeacher)
                .where(qmBoardTeacher.member.id.eq(teacherId)).fetch();
        return mBoardIdList;
    }

    public List<MBoard> findMBoardListByAuthId(String authId) {
        return jpaQueryFactory.select(qmBoard).from(qmBoard)
                    .where(qmBoard.member.id.eq(authId)).fetch();
    }
}
