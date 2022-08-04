package com.ssafy.crafts.db.entity;


import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.Id;

import javax.naming.Name;
import javax.persistence.*;

@Getter
@Table(name = "MBoard_Teacher")
@NoArgsConstructor
@DynamicInsert
@Entity
public class MBoardTeacher {

    @Id
    @Column(name = "mboard_id")
    private int mboardId;   // 매칭보드 id

    @Id
    @Column(name = "teacher_id")
    private String teacherId;   // 강사 id

    @Column(columnDefinition = "TINYINT", nullable = false, length = 1)
    private int matStatus;      // 매칭 완료 여부

    @OneToOne
    @MapsId
    @JoinColumn(name = "mboard_id")
    private MBoard mboard;

    // 1:1 관계 : 매칭_선생님 - 회원
    // MBoardTeacher 테이블의 teacher_id(PFK)를 사용해서 Member 테이블과 Join을 수행하고
    // 그 결과로 나온 값은 1건이며 이 데이터를 MBoardTeacher Entity의 Member에 매핑한다.
    @OneToOne
    @MapsId
    @JoinColumn(name = "teacher_id", referencedColumnName = "auth_id")
    private Member member;

    // 1:1 관계 : 매칭_선생님 - 채팅방
    @OneToOne(mappedBy = "mBoardTeacher")
    @PrimaryKeyJoinColumn
    private ChatRoom chatRoom;
}