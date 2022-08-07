package com.ssafy.crafts.db.repository.querydslRepo;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.crafts.db.entity.MBoard;
import com.ssafy.crafts.db.entity.QMBoard;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MatchingQuerydslRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QMBoard qmBoard = QMBoard.mBoard;

    public Optional<MBoard> findMBoardById(int id) {
        MBoard mBoard = jpaQueryFactory.select(qmBoard).from(qmBoard)
                .where(qmBoard.id.eq(id)).fetchOne();
        return Optional.ofNullable(mBoard);
    }
}
