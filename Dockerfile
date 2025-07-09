# Stage 1: Build the application using Maven
FROM maven:3.6.3-openjdk-11 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and source code into the container
COPY pom.xml .
COPY src ./src

# Run Maven build to generate the jar file
RUN mvn clean package -DskipTests

# Stage 2: Run the application using OpenJDK
FROM openjdk:11-jre-slim

# Set environment variables for MySQL connection (optional)
ENV MYSQL_HOST=mysql
ENV MYSQL_DATABASE=genome
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=root

# Set the working directory inside the container
WORKDIR /app

# Copy the jar file from the build stage into this stage
COPY --from=build /app/target/custom_shield_gen_two-0.0.1-SNAPSHOT.jar /app/app.jar

# Expose port 80 for the Spring Boot app
EXPOSE 80

# Run the Spring Boot application with active profile 'ck'
ENTRYPOINT ["java", "-Dspring.profiles.active=ck", "-jar", "/app/app.jar"]