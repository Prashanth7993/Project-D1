import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Spinner, Alert } from "react-bootstrap";
import { getTasks, createTask, updateTaskStatus, deleteTask, getEvents } from "../services/api";

function TaskTracker() {
    const [tasks, setTasks] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [taskForm, setTaskForm] = useState({
        id: "",
        name: "",
        eventId: "",
        status: "Pending",
    });

    // Fetch tasks and events on component load
    useEffect(() => {
        loadTasks();
        loadEvents();
    }, []);

    const loadTasks = async () => {
        setLoading(true);
        try {
            const { data } = await getTasks();
            setTasks(data);
            setError(null);
        } catch (err) {
            console.error("Error fetching tasks:", err);
            setError("Failed to load tasks. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const loadEvents = async () => {
        try {
            const { data } = await getEvents();
            setEvents(data);
        } catch (err) {
            console.error("Error fetching events:", err);
            setError("Failed to load events.");
        }
    };

    const handleSaveTask = async () => {
        if (!taskForm.status) {
            setError("Status is required.");
            return;
        }

        // Task data to be sent for both update and create operations
        const taskData = {
            status: taskForm.status,  // Only send status when updating the task
        };

        setLoading(true);
        try {
            if (taskForm.id) {
                // If taskForm.id exists, update the task status
                await updateTaskStatus(taskForm.id, taskData);
                setError(null);
            } else {
                // Create a new task if ID doesn't exist
                const newTaskData = {
                    name: taskForm.name,
                    eventId: taskForm.eventId,
                    status: taskForm.status,
                };
                await createTask(newTaskData, taskForm.eventId);
            }

            setShowModal(false);  // Close the modal after save
            loadTasks();  // Reload tasks after successful save/update
            setError(null);  // Clear any previous error
        } catch (error) {
            console.error("Error saving task:", error.response?.data || error.message);
            const errorMessage = error.response?.data?.message || "Failed to save task. Please try again later.";
            setError(errorMessage);
        } finally {
            setLoading(false);  // Set loading to false after operation is completed
        }
    };

    const handleDeleteTask = async (taskId) => {
        setLoading(true);
        try {
            await deleteTask(taskId);
            loadTasks();
        } catch (err) {
            console.error("Error deleting task:", err);
            setError("Failed to delete task.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Task Tracker</h2>
            <p className="lead text-center">
                Manage tasks and track their status for different events.
            </p>
            {error && <Alert variant="danger">{error}</Alert>}

            <Button
                className="mb-3"
                variant="primary"
                onClick={() => {
                    setTaskForm({ id: "", name: "", eventId: "", status: "Pending" });
                    setShowModal(true);
                }}
            >
                Add Task
            </Button>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Task Name</th>
                            <th>Event Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.name}</td>
                                <td>{task.event ? task.event.name : "Not Assigned"}</td>
                                <td>
                                    <span
                                        className={`badge ${task.status === "Completed" ? "bg-success" : "bg-warning text-dark"}`}
                                    >
                                        {task.status}
                                    </span>
                                </td>
                                <td>
                                    <Button
                                        variant="warning"
                                        className="me-2"
                                        onClick={() => {
                                            setTaskForm(task);
                                            setShowModal(true);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDeleteTask(task.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {taskForm.id ? "Edit Task Status" : "Add Task"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {taskForm.id ? (
                            // Only show the status dropdown when editing
                            <Form.Group controlId="formTaskStatus" className="mt-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={taskForm.status}
                                    onChange={(e) =>
                                        setTaskForm({ ...taskForm, status: e.target.value })
                                    }
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                </Form.Control>
                            </Form.Group>
                        ) : (
                            <>
                                <Form.Group controlId="formTaskName">
                                    <Form.Label>Task Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter task name"
                                        value={taskForm.name}
                                        onChange={(e) =>
                                            setTaskForm({ ...taskForm, name: e.target.value })
                                        }
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEvent" className="mt-3">
                                    <Form.Label>Event</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={taskForm.eventId}
                                        onChange={(e) => {
                                            setTaskForm({ ...taskForm, eventId: e.target.value });
                                        }}
                                    >
                                        <option value="">Select Event</option>
                                        {events.map((event) => (
                                            <option key={event.id} value={event.id}>
                                                {event.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formTaskStatus" className="mt-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={taskForm.status}
                                        onChange={(e) =>
                                            setTaskForm({ ...taskForm, status: e.target.value })
                                        }
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                    </Form.Control>
                                </Form.Group>
                            </>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSaveTask}
                        disabled={loading}
                    >
                        {loading ? <Spinner animation="border" size="sm" /> : "Save Task"}
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default TaskTracker;