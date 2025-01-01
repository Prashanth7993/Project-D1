import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table, Alert, Spinner } from 'react-bootstrap';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../services/api';

function EventManagement() {
  const [events, setEvents] = useState([]); // Store events
  const [showModal, setShowModal] = useState(false);
  const [eventForm, setEventForm] = useState({ name: '', description: '', location: '', date: '', eventId: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  // Load all events
  const loadEvents = async () => {
    setLoading(true);
    try {
      const { data } = await getEvents(); // Assuming this gets all events
      setEvents(data);
      setError(null);
    } catch (error) {
      console.error("Error loading events:", error);
      setError("Failed to load events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle modal to show a blank form for adding an event
  const handleShow = () => {
    setEventForm({ name: '', description: '', location: '', date: '', eventId: '' });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleInputChange = (e) => {
    setEventForm({ ...eventForm, [e.target.name]: e.target.value });
  };

  // Handle saving event with eventId
  const handleSaveEvent = async () => {
    if (!eventForm.name || !eventForm.description || !eventForm.location || !eventForm.date) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      if (eventForm.id) {
        await updateEvent(eventForm.id, eventForm);
      } else {
        await createEvent(eventForm);
      }
      setShowModal(false);
      loadEvents();
    } catch (error) {
      console.error("Error saving event:", error);
      setError("Failed to save event. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting event
  const handleDeleteEvent = async (id) => {
    setLoading(true);
    try {
      await deleteEvent(id);
      loadEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      setError("Failed to delete event. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Event Management</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Button className="mb-3" variant="primary" onClick={handleShow}>
        Add Event
      </Button>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Event_Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Location</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.name}</td>
                <td>{event.description}</td>
                <td>{event.location}</td>
                <td>{event.date}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={() => {
                      setEventForm(event);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteEvent(event.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{eventForm.id ? 'Edit Event' : 'Add Event'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEventName">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event name"
                name="name"
                value={eventForm.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEventDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event description"
                name="description"
                value={eventForm.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEventLocation" className="mt-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event location"
                name="location"
                value={eventForm.location}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEventDate" className="mt-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={eventForm.date}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEvent} disabled={loading}>
            Save Event
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EventManagement;
