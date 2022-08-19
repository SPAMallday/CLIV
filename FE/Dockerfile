# 빌드용 이미지
FROM node:18 AS build-stage

# root에 app 작업 폴더를 만들기 (컨테이너 안에서의 폴더)
RUN mkdir /app
# work dir 고정
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package* ./

# /app 폴더에서 npm 설치 - package.json 파일에 적힌 dependecies 파일들을 설치
RUN npm install
RUN npm install react-scripts@5.0.1 -g

# COPY <local folder> <container folder>
# local folder: Dockerfile이 존재하는 파일의 위치
# container folder: WORKDIR로 설정해준 /app 폴더
COPY ./ ./

# 3000 포트 오픈
EXPOSE 3000

RUN npm run build

FROM nginx:stable-alpine as production-stage
#컨테이너 안에 nginx.conf를 옆 해당경로에 옮겨준다.
# COPY  ./nginx/nginx.conf /etc/nginx/conf.d/default.conf 
COPY  ./nginx/nginx.conf /app

# COPY --from=build-stage /app/build /usr/share/nginx/html

# npm start 명령어를 실행시킨다.
CMD ["npm", "start"]
# CMD ["nginx", "-g", "daemon off;"]
