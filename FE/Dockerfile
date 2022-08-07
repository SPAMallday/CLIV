FROM node:18 as build-stage
# 현재 경로에 있는 모든 파일들을 /app으로 모두 파일을 복사
WORKDIR /app  
ADD . .
RUN npm install
RUN npm start

# 도커 허브에 있는 이미지를 가져온다.
FROM nginx:stable-alpine as production-stage

# 위에 build-stage 작업에서  /app/dist 를  /user/share/nginx/html로 옮겨준다. 
COPY --from=build-stage /app/dist /usr/share/nginx/html
# 컨테이너가 실행할 때 nginx를 실행해 준다. 
CMD ["nginx", "-g", "daemon off;"]