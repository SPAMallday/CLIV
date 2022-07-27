package com.ssafy.crafts.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Table(name = "OAUTH")
@NoArgsConstructor
@Entity
public class Member {

    @Id
    @Column(nullable = false, name = "oauth_id", length = 250)
    private String id; //UUID 변경

    @Column(name = "profile_image", length = 250)
    private String profileImage;

    @Column(nullable = false, unique = true, length = 200)
    private String nickname;

    @Column(nullable = false, unique = true, length = 40)
    private String email;

    @Column(length = 10)
    private String gender;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_type", length = 10)
    private Status status;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_type", length = 10)
    private RoleType roleType;

    @Column(name = "reg_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Builder
    public Member(String email, String gender){
        this.id = UUID.randomUUID().toString();
        this.status = Status.ACTIVE;
        this.roleType = RoleType.MEMBER;
        this.nickname = "회원" + this.id;
        this.email = email;
        this.gender = gender;
    }

}
