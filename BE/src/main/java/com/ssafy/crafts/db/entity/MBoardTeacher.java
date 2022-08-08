package com.ssafy.crafts.db.entity;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.naming.Name;
import javax.persistence.*;

@Getter
@Table(name = "MBOARD_TEACHER")
@NoArgsConstructor
@DynamicInsert
@Entity
public class MBoardTeacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mt_id")
    private int id;

    // 1:1 관계 : 매칭_선생님 - 회원
    // MBoardTeacher 테이블의 teacher_id(PFK)를 사용해서 Member 테이블과 Join을 수행하고
    // 그 결과로 나온 값은 1건이며 이 데이터를 MBoardTeacher Entity의 Member에 매핑한다.
    @OneToOne
    @JoinColumn(name = "teacher_id")
    private Member teacher;

    // 1:1 관계 : 매칭_선생님 - 매칭보드
    @OneToOne
    @JoinColumn(name = "mboard_id")
    private MBoard mBoard;

    // 1:1 관계 : 매칭_선생님 - 채팅방
    @OneToOne(mappedBy = "mBoardTeacher")
    private ChatRoom chatRoom;

    @Builder
    public MBoardTeacher(int id, Member teacher, MBoard mBoard, ChatRoom chatRoom) {
        this.id = id;
        this.teacher = teacher;
        this.mBoard = mBoard;
        this.chatRoom = chatRoom;
    }
}