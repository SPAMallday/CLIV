# 1. 빌드용 이미지
FROM node:18 AS build-stage
WORKDIR /app
COPY ./package* ./
RUN npm install
COPY ./ ./
EXPOSE 3000
RUN npm run build

FROM nginx:stable-alpine as production-stage
#컨테이너 안에 nginx.conf를 옆 해당겨로에 옮겨준다.
COPY  ./nginx/nginx.conf /etc/nginx/conf.d/default.conf 

COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
