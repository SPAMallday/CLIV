//package com.ssafy.crafts.db.entity;
//
//import io.micrometer.core.annotation.Counted;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import org.hibernate.annotations.DynamicInsert;
//
//import javax.persistence.*;
//
//@Getter
//@Entity
//@NoArgsConstructor
//@DynamicInsert
//@Table(name = "PRIVATE_CLASS")
//public class PrivateClass {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "pc_id")
//    private int id;
//
//    @Column(name = "class_name")
//    private String className;
//
//    @Column(name = "class_datetime")
//    private String classDatetime;
//
//    @Column(name = "tuition_fee")
//    private String tuitionFee;
//
//    // 1:1 관계 - 1:1수업 - 매칭_선생님
//    @OneToOne
//    @JoinColumn
//    private MBoardTeacher mBoardTeacher;
//
//    @Builder
//    public PrivateClass(int id, String className, String classDatetime, String tuitionFee, MBoardTeacher mBoardTeacher) {
//        this.id = id;
//        this.className = className;
//        this.classDatetime = classDatetime;
//        this.tuitionFee = tuitionFee;
//        this.mBoardTeacher = mBoardTeacher;
//    }
//}
