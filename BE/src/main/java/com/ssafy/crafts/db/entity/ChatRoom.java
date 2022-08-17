package com.ssafy.crafts.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.kurento.client.internal.client.RomClientObjectManager;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor
@DynamicInsert
@Table(name = "CHAT_ROOM")
public class ChatRoom {

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "croom_id")
    private String roomId;     // PK

    @Column(name = "roomName")
    private String roomName;    // 채팅방 이름

    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp regDate;      // 생성일

//    @Column
//    private String sender;      // 보내는 사람

    // 1:1 관계 : 채팅방 - 매칭_선생님
    @OneToOne
    @JoinColumn(name = "teacher_id")
    private MBoardTeacher mBoardTeacher;

    @OneToMany(mappedBy = "chatRoom")
    private List<ChatMessage> chatMessageList = new ArrayList<>();

    @Builder
    public ChatRoom(String roomId, String roomName, Timestamp regDate, MBoardTeacher mBoardTeacher) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.regDate = regDate;
        this.mBoardTeacher = mBoardTeacher;
    }

    /**
     * @Method Name : createRoom
     * @param name 방 이름
     * @Method 설명 : 채팅방 생성
     */
    public static ChatRoom createRoom(String name){
        return ChatRoom.builder()
                .roomId(UUID.randomUUID().toString())
                .roomName(name)
                .build();
    }
}

