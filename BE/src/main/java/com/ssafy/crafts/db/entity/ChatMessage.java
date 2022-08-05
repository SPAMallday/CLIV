package com.ssafy.crafts.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@NoArgsConstructor
@DynamicInsert
@Table(name = "CHATMESSAGE")
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private int id;     // 메시지 ID (PK)

    @Column(name="chat_content", nullable = false, length = 200)
    private String chatContent;     // 메시지 내용

    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp regDate;      // 생성날짜

    // N:1 관계 : 채팅방메시지 - 채팅방
    @ManyToOne
    @JoinColumn(name = "croom_id")
    private ChatRoom chatRoom;

    @Builder
    public ChatMessage(int id, String chatContent, Timestamp regDate, ChatRoom chatRoom) {
        this.id = id;
        this.chatContent = chatContent;
        this.regDate = regDate;
        this.chatRoom = chatRoom;
    }
}