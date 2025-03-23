FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /usr/src/app
COPY pom.xml . 
RUN mvn dependency:go-offline
COPY . .
RUN mvn clean package -DskipTests
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /usr/src/app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]



# FROM maven:3.6.3-jdk-11 AS build
# WORKDIR /usr/src/app
# COPY src /usr/src/app/src
# COPY pom.xml /usr/src/app
# RUN mvn -f /usr/src/app/pom.xml clean package

# FROM openjdk:21-jre-slim
# COPY --from=build /usr/src/app/target/*.jar /usr/app/app.jar
# EXPOSE 8080
# ENTRYPOINT ["java","-jar","app.jar"]


