package com.ssafy.crafts.common.auth;

import java.util.Map;

public interface Oauth2UserInfo {
    String getProviderId();
    String getProvider();
    String getEmail();
    String getNickName();
    String getProfileImage();
}