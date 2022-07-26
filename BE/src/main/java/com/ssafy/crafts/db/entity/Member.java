package com.ssafy.crafts.db.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Table(name = "OAUTH")
@NoArgsConstructor
@Entity
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, name = "oauth_id")
    private Long id;

    @Column(name = "profile_image")
    private String profileImage;

    @Column(nullable = false, unique = true, length = 20)
    private String nickname;

    @Column(nullable = false, unique = true)
    private String email;

    private String gender;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_type")
    private Status status;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP")
    @JsonFormat(shape = JsonFormat.Shape.STRING, timezone = "Asia/Seoul")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Builder
    public Member(String profileImage, String nickname, String email){
        this.createdAt = LocalDateTime.now();
        this.status = Status.ACTIVE;
        this.profileImage = profileImage;
        this.nickname = nickname;
        this.email = email;
    }

    @Builder
    public Member(String profileImage, String nickname, String email, String gender, String phoneNumber){
        this.createdAt = LocalDateTime.now();
        this.status = Status.ACTIVE;
        this.profileImage = profileImage;
        this.nickname = nickname;
        this.email = email;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
    }
}
