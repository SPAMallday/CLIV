package com.ssafy.crafts.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@DynamicInsert
@Table(name = "ChatRoom")
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "croom_id")
    private int id;     // 채팅방 ID (PK)

    @Id
    @Column(name = "teacher_id")
    private String teacherId;   // 강사 ID (PFK)

    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp regDate;      // 생성일

    // 1:1 관계 : 채팅방 - 매칭_선생님
    @OneToOne
    @MapsId
    @JoinColumn(name = "teacher_id")
    private MBoardTeacher mBoardTeacher;

    // 1:N 관계 (N:1 양방향) : 채팅방 - 채팅방메시지
    // 어디에 매핑 되었는지에 관한 정보
    // ChatRoom의 messages 필드가 ChatMessage 엔티티의 chatRoom 필드에 의해 매핑되었음을 의미.
    @OneToMany(mappedBy = "chatRoom")
    private List<ChatMessage> messages = new ArrayList<>();
}

