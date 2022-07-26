package com.ssafy.crafts.api.response;

import com.ssafy.crafts.db.entity.Status;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LoginResponse {
    private Long id;
    private String email;
    private String nickName;
    private String gender;
    private Status status;
    private String profileImage;
    private String tokenType;
    private String accessToken;
    private String refreshToken;

    @Builder
    public LoginResponse(Long id, String nickName, String email, String gender, Status status, String profileImage, String tokenType, String accessToken, String refreshToken) {
        this.id = id;
        this.nickName = nickName;
        this.email = email;
        this.gender = gender;
        this.status = status;
        this.profileImage = profileImage;
        this.tokenType = tokenType;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

}
