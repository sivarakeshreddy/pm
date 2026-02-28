FROM node:22-alpine AS frontend

WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci
COPY frontend ./
RUN npm run build

FROM maven:3.9.11-eclipse-temurin-17 AS backend

WORKDIR /app/backend
COPY backend/pom.xml /app/backend/pom.xml
RUN mvn -q -DskipTests dependency:go-offline

COPY backend/src /app/backend/src
COPY --from=frontend /app/frontend/out /app/backend/src/main/resources/static

RUN mvn -q -DskipTests package

FROM eclipse-temurin:17-jre

WORKDIR /app
COPY --from=backend /app/backend/target/backend-0.0.1-SNAPSHOT.jar /app/backend.jar

EXPOSE 8000

ENTRYPOINT ["java", "-jar", "/app/backend.jar"]
