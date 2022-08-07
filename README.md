
# 🐻시스템 환경 및 구성
- OS: Windows10
- Backend Framework: Spring Boot 2.4.5
- Frontend Framework: React 18.2.0
- DB: MYSQL 8.0.30
- WAS: Gradle
- JVM: openJDK (1.8.0_332)
- Node.js: 18.7.0
- WebRTC: openVidu 2.20.0
- Docker: 20.10.17
- WEB: Nginx 1.18.0

# 포트 번호


# 🐳도커 설치
```
sudo apt-get update
```

## 필수 패키지 설치
```
$ sudo apt-get install \
       apt-transport-https \
       ca-certificates \
       curl \
       gnupg \
       lsb-release
```

### GPG Key 인증
```
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

### docker repository 등록
```
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $ (lsb_release -cs) stable"
```

## 도커 설치
```
$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

## docker 네트워크 설정
```
sudo docker network create thxstorecicdnetwork
```

## 컨테이너 생성
```
docker run -i -t ubuntu:20.04

# 생성과 동시에 컨테이너 안으로 들어옴
```
![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c2f88afd-14e3-46dc-847b-e641e7da8e9b/Untitled.png)
