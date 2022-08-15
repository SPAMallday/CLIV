package com.ssafy.crafts.db.repository.querydslRepo;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.crafts.db.entity.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ChatRoomQuerydslRepository {

    private final JPAQueryFactory jpaQueryFactory;

    QMBoard qmBoard = QMBoard.mBoard;
    QChatRoom qChatRoom = QChatRoom.chatRoom;
    QMBoardTeacher qmBoardTeacher = QMBoardTeacher.mBoardTeacher;

    public List<ChatRoom> findAllRoomByAuthId(String authId) {
        /**
         * @Method Name : findAllRoomByAuthId
         * @작성자 : 김민주
         * @Method 설명 : 회원 아이디로 채팅방 목록 조회
         */
        List chatRooms = jpaQueryFactory.selectFrom(qChatRoom)
                .where(qChatRoom.mBoardTeacher.mBoard.member.id.eq(authId)).fetch();
        // 채팅방 생성순서 최근 순으로 반환
        Collections.reverse(chatRooms);
        return chatRooms;
    }

    public ChatRoom findByMtId(int mtId){
        /**
         * @Method Name : findByMtId
         * @작성자 : 김민주
         * @Method 설명 : 선생님_매칭보드 아이디로 채팅방 조회
         */
        return jpaQueryFactory.selectFrom(qChatRoom)
                .where(qChatRoom.mBoardTeacher.id.eq(mtId))
                .fetchOne();
    }

}
