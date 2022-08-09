package com.ssafy.crafts.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Table(name = "MEMBER")
@NoArgsConstructor
@DynamicInsert
@Entity
public class Member {

    @Id
    @Column(name = "auth_id")
    private String id;

    @Column(name = "profile_image", length = 250)
    private String profileImage;

    @Column(nullable = false, unique = true, length = 20)
    private String nickname;

    @Column(length = 10)
    private String gender;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_type", length = 10)
    private Status status;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_type", length = 10)
    private RoleType roleType;

    @OneToOne
    @MapsId
    @JoinColumn(name = "auth_id")
    private Auth auth;

    @OneToMany(mappedBy = "member")
    private List<Review> reviews = new ArrayList<>();
    @Builder
    public Member(String id, String profileImage, String nickname, String gender, Status status, RoleType roleType, Auth auth) {
        this.id = id;
        this.profileImage = profileImage;
        this.nickname = nickname;
        this.gender = gender;
        this.status = status;
        this.roleType = roleType;
        this.auth = auth;
    }

    public static enum RoleType {
    TEACHER, MEMBER;
    }

    public static enum Status {
        ACTIVE,
        RESIGNATION
    }

    // MBoardTeacher 엔티티에 있는 Member 필드와 매핑 되었다는 것을 의미.
    // 이 mBoardTeacher 필드는 읽기 전용 필드이다.
//    @OneToOne(mappedBy = "member")
//    private MBoardTeacher mBoardTeacher;

}

