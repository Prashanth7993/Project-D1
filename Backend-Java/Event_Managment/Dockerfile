# FROM maven:3.6.3-jdk-11 AS build
# COPY src /usr/src/app/src
# COPY pom.xml /usr/src/app
# RUN mvn -f /usr/src/app/pom.xml clean package

# FROM openjdk:11-jre-slim
# COPY --from=build /usr/src/app/target/event-management-0.0.1-SNAPSHOT.jar /usr/app/event-management-0.0.1-SNAPSHOT.jar
# EXPOSE 8080
# ENTRYPOINT ["java","-jar","/usr/app/event-management-0.0.1-SNAPSHOT.jar"]
# Use a JDK 17 base image
FROM openjdk:17-jdk-slim AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy project files
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app

# Build the application
RUN mvn clean package

# Use a lightweight JRE for running the app
FROM openjdk:17-jre-slim

WORKDIR /app
COPY --from=build /usr/src/app/target/Event_Managment-0.0.1-SNAPSHOT.jar app.jar

# Run the application
CMD ["java", "-jar", "app.jar"]

