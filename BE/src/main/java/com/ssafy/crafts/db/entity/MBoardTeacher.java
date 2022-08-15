package com.ssafy.crafts.db.entity;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

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

    @Column(name = "agree_yn", length = 1)
    @Convert(converter = BooleanToYNConverter.class)
    private boolean agreeYn = false;  // 클래스 개설 수강생 동의 여부

    // N:1 관계 : 선생님_매칭보드 - 회원
    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Member teacher;

    // 1:1 관계 : 선생님_매칭보드 - 매칭보드
    @ManyToOne
    @JoinColumn(name = "mboard_id")
    private MBoard mBoard;

    // 1:1 관계 : 선생님_매칭보드 - 채팅방
    @OneToOne(mappedBy = "mBoardTeacher")
    private ChatRoom chatRoom;

    // 1:1 관계 : 선생님_매칭보드 - 1:1수업
    @OneToOne(mappedBy = "mBoardTeacher")
    private PrivateClass privateClass;

    @Builder
    public MBoardTeacher(int id, boolean agreeYn, Member teacher, MBoard mBoard, ChatRoom chatRoom) {
        this.id = id;
        this.agreeYn = agreeYn;
        this.teacher = teacher;
        this.mBoard = mBoard;
        this.chatRoom = chatRoom;
    }

}