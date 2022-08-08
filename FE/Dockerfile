# 1. 빌드용 이미지
FROM node:18 AS build
WORKDIR /app
COPY ./package* ./
RUN npm install
COPY ./ ./
EXPOSE 3000
RUN npm run build

# 2. 빌드 된 파일을 배포용 이미지에 복사
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
