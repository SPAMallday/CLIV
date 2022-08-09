//package com.ssafy.crafts.db.entity;
//
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import org.hibernate.annotations.DynamicInsert;
//
//import javax.persistence.*;
//import java.sql.Timestamp;
//import java.util.ArrayList;
//import java.util.List;
//
//@Entity
//@Getter
//@NoArgsConstructor
//@DynamicInsert
//@Table(name = "CHAT_ROOM")
//public class ChatRoom {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "croom_id")
//    private int id;     // 채팅방 ID (PK)
//
//    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
//    private Timestamp regDate;      // 생성일
//
//    // 1:1 관계 : 채팅방 - 매칭_선생님
////    @OneToOne
////    @JoinColumn(name = "teacher_id")
////    private MBoardTeacher mBoardTeacher;
//
////    @Builder
////    public ChatRoom(int id, Timestamp regDate, MBoardTeacher mBoardTeacher) {
////        this.id = id;
////        this.regDate = regDate;
////        this.mBoardTeacher = mBoardTeacher;
////    }
//}
//
