# Event Management Dashboard

The Event Management Dashboard is a web-based application designed to help organizations efficiently manage events, attendees, and tasks. It streamlines the process of creating events, assigning tasks, and tracking progress through a responsive and user-friendly interface.

---

## Features

1. **Event Management**: Create, edit, delete, and view events with details like name, description, location, and date.
2. **Attendee Management**: Add, remove attendees and assign them to events or tasks.
3. **Task Tracker**: Manage and track the status of tasks associated with events (Pending/Completed).

---

## Project Structure

### Frontend
- Built with React.
- Provides responsive and interactive user interfaces for managing events, attendees, and tasks.

### Backend
- Built with Java 8 and Spring Boot.
- Exposes RESTful APIs to handle business logic for events, attendees, and tasks.
- Database: PostgreSQL (can be configured for other relational databases).

---

## Prerequisites

### Frontend:
- Node.js (v14 or later)
- npm (Node Package Manager)

### Backend:
- Java 8 or later
- Spring Boot
- MySQL

---

## Setup Instructions

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/RASHANTH793/event-management-dashboard.git
   cd event-management-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The application will run on `http://localhost:3000`.

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/RASHANTH793/event-management-dashboard-backend.git
   cd event-management-dashboard-backend
   ```

2. Set up the database:
   - Create a MySQL database.
   - Update the `application.properties` file under `src/main/resources` with your database credentials:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:5432/event_db
     spring.datasource.username=yourusername
     spring.datasource.password=yourpassword
     ```

3. Build and run the backend:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   The backend server will run on `http://localhost:8080`.

---

## API Details

### Event Management API

- **Create Event**:
  ```http
  POST /api/events
  ```
  **Request Body:**
  ```json
  {
    "name": "Event Name",
    "description": "Event Description",
    "location": "Event Location",
    "date": "2024-12-30"
  }
  ```

- **Get All Events**:
  ```http
  GET /api/events
  ```

- **Update Event**:
  ```http
  PUT /api/events/{id}
  ```
  **Request Body:** Same as `Create Event`.

- **Delete Event**:
  ```http
  DELETE /api/events/{id}
  ```

### Attendee Management API

- **Add Attendee**:
  ```http
  POST /api/attendees
  ```
  **Request Body:**
  ```json
  {
    "name": "Attendee Name",
    "email": "attendee@example.com",
    "event": "Event Name"
  }
  ```

- **Get All Attendees**:
  ```http
  GET /api/attendees
  ```

- **Delete Attendee**:
  ```http
  DELETE /api/attendees/{id}
  ```

### Task Management API

- **Create Task**:
  ```http
  POST /api/tasks/{eventId}
  ```
  **Request Body:**
  ```json
  {
    "name": "Task Name",
    "deadline": "2024-12-31",
    "status": "Pending",
    "attendee": "Attendee Name"
  }
  ```

- **Get Tasks for an Event**:
  ```http
  GET /api/tasks/{eventId}
  ```

- **Update Task Status**:
  ```http
  PUT /api/tasks/{taskId}/status
  ```
  **Request Body:**
  ```json
  {
    "status": "Completed"
  }
  ```

- **Delete Task**:
  ```http
  DELETE /api/tasks/{taskId}
  ```

---

## Running the Full Project

1. **Start the Backend**:
   - Follow the backend setup instructions and ensure the Spring Boot server is running on `http://localhost:8080`.

2. **Start the Frontend**:
   - Follow the frontend setup instructions and ensure the React development server is running on `http://localhost:3000`.

3. **Access the Dashboard**:
   - Open your browser and navigate to `http://localhost:3000` to use the application.

---

## Bonus Features

1. **Authentication**:
   - JWT-based login/logout functionality for secure access.
2. **Progress Visualization**:
   - Progress bars to show task completion.
3. **Calendar View**:
   - Visualize events using a calendar component.
4. **Real-time Updates**:
   - WebSockets to push real-time updates on task progress.

---

## License
This project is licensed under the MIT License.

---

## Contributors
- J Prashanth ([GitHub Profile](https://github.com/RASHANTH793))

