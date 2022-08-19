export const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
export const REDIRECT_URI =
  process.env.NODE_ENV === 'production'
    ? `https://${process.env.REACT_APP_DOMAIN}/kakao-login`
    : `http://${process.env.REACT_APP_DOMAIN}/kakao-login`;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
