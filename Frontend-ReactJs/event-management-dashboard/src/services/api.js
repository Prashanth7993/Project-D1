import axios from 'axios';

const BASE_URL = 'http://spring-boot-service:30000/api'; // Replace with your backend's API base URL


//Create an Events
export const createEvent = async (event) => {
    try {
        const response = await axios.post(`${BASE_URL}/events`, event);
        return response;
    } catch (error) {
        console.error("Error creating event:", error);
        throw error;
    }
};

//Get all Events 
export const getEvents = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/events`);
        return response;
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
};

// Update an event
export const updateEvent = async (id, event) => {
    try {
        const response = await axios.put(`${BASE_URL}/events/${id}`, event);
        return response;
    } catch (error) {
        console.error("Error updating event:", error);
        throw error;
    }
};

// Delete an event
export const deleteEvent = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/events/${id}`);
        return response;
    } catch (error) {
        console.error("Error deleting event:", error);
        throw error;
    }
};





// ==============================================================================================================================


//Create An Attendee
export const createAttendee = async (attendee) => {
    try {
        const response = await axios.post(`${BASE_URL}/attendees`, attendee, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error("Error creating attendee:", error);
        throw error;
    }
};

//    Delete an attendee
export const deleteAttendee = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/attendees/${id}`);
        return response;
    } catch (error) {
        console.error("Error deleting attendee:", error);
        throw error;
    }
};

// Get all attendees
export const getAttendees = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/attendees`);
        return response;
    } catch (error) {
        console.error("Error fetching attendees:", error);
        throw error;
    }
};

// Update an existing attendee
export const updateAttendee = async (id, attendeeData) => {
    try {
        const response = await axios.put(`${BASE_URL}/attendees/${id}`, attendeeData); // Assuming your API endpoint for updating is /api/attendees/{id}
        return response.data;
    } catch (error) {
        throw error;
    }
};

//Assign Event To Atttendee
export const assignEventToAttendee = async (attendeeId, eventId) => {
    try {
        if (!attendeeId || !eventId) {
            throw new Error("Missing attendeeId or eventId");
        }
        console.log("API Request - Attendee ID:", attendeeId, "Event ID:", eventId);
        const response = await axios.put(`${BASE_URL}/attendees/${attendeeId}/assign/${eventId}`);
        return response.data;
    } catch (error) {
        console.error("API Error in assignEventToAttendee:", error);
        throw error;
    }
};

//===============================================================================================================

//Get All in TaskTracker
export const getTasks = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/tasks`);
        return response;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

//Create a Task in TaskTracker
export const createTask = async (task, eventId) => {
    try {
        const response = await axios.post(`${BASE_URL}/tasks/assign/${eventId}`, task);
        return response.data;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};


//Update Task in Task Tracker
export const updateTaskStatus = async (taskId, taskData) => {
    try {
        const response = await axios.put(`${BASE_URL}/tasks/${taskId}`, taskData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//Delete Task in Task Tracker
export const deleteTask = async (taskId) => {
    return await axios.delete(`${BASE_URL}/tasks/${taskId}`);
};
