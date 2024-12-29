import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table, Alert, Spinner } from 'react-bootstrap';
import { getAttendees, getEvents, createAttendee, updateAttendee, deleteAttendee, assignEventToAttendee } from '../services/api';

function AttendeeManagement() {
  const [attendees, setAttendees] = useState([]);
  const [events, setEvents] = useState([]); // State to store events
  const [showModal, setShowModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false); // Modal for assigning events
  const [attendeeForm, setAttendeeForm] = useState({
    id: '',
    fullName: '',
    email: '',
    phone: ''
  });
  const [selectedEvent, setSelectedEvent] = useState(null); // State to store selected event
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load attendees and events on initial render
  useEffect(() => {
    loadAttendees();
    loadEvents();
  }, []);

  const loadAttendees = async () => {
    setLoading(true);
    try {
      const { data } = await getAttendees();
      setAttendees(data);
      setError(null);
    } catch (error) {
      console.error('Error loading attendees:', error.response?.data || error.message);
      setError('Failed to load attendees. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const loadEvents = async () => {
    try {
      const { data } = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const handleAssignEvent = async (attendeeId) => {
    if (!attendeeId) {
      console.error("Attendee ID is null or undefined.");
      setError("Attendee ID is missing.");
      return;
    }

    if (!selectedEvent) {
      console.error("Selected Event is null or undefined.");
      setError("Please select an event.");
      return;
    }

    try {
      setLoading(true);
      console.log("Assigning Event:", selectedEvent, "to Attendee:", attendeeId);
      await assignEventToAttendee(attendeeId, selectedEvent);
      setShowAssignModal(false);
      loadAttendees();
    } catch (error) {
      console.error("Error assigning event:", error);
      setError("Failed to assign event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAttendee = async () => {
    if (!attendeeForm.fullName || !attendeeForm.email || !attendeeForm.phone) {
      setError('All fields are required.');
      return;
    }

    const attendeeData = {
      fullName: attendeeForm.fullName,
      email: attendeeForm.email,
      phone: attendeeForm.phone
    };

    setLoading(true);
    try {
      if (attendeeForm.id) {
        // If the ID exists, update the attendee
        await updateAttendee(attendeeForm.id, attendeeData);
        setError(null);
      } else {
        // If no ID, create a new attendee
        await createAttendee(attendeeData);
      }
      setShowModal(false);
      loadAttendees(); // Reload attendees after successful save or update
      setError(null);
    } catch (error) {
      console.error('Error saving attendee:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || 'Failed to save attendee. Please try again later.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAttendee = async (id) => {
    setLoading(true);
    try {
      await deleteAttendee(id);
      loadAttendees();
      setError(null);
    } catch (error) {
      console.error('Error deleting attendee:', error.response?.data || error.message);
      setError('Failed to delete attendee. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditAttendee = (attendee) => {
    setAttendeeForm({
      id: attendee.id,
      fullName: attendee.fullName,
      email: attendee.email,
      phone: attendee.phone
    });
    setShowModal(true); // Show the Edit Attendee modal
  };

  const handleAddAttendee = () => {
    setAttendeeForm({
      id: '',
      fullName: '',
      email: '',
      phone: ''
    });
    setShowModal(true); // Show the Add Attendee modal
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Attendee Management</h2>
      <p className="lead text-center">Manage your event attendees. Add, edit, and delete attendees.</p>
      {error && <Alert variant="danger">{error}</Alert>}

      <Button className="mb-3" variant="primary" onClick={handleAddAttendee}>
        Add Attendee
      </Button>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Assigned</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((attendee) => (
              <tr key={attendee.id}>
                <td>{attendee.fullName}</td>
                <td>{attendee.email}</td>
                <td>{attendee.phone}</td>
                <td>{attendee.event ? attendee.event.name : 'Not Assigned'}</td>
                <td>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => handleEditAttendee(attendee)}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteAttendee(attendee.id)}>
                    Delete
                  </Button>
                  <Button
                    variant="warning"
                    className="ms-2"
                    onClick={() => {
                      setSelectedEvent(null); // Reset selected event
                      setShowAssignModal(true); // Show modal for assigning event
                      setAttendeeForm({
                        id: attendee.id,
                        fullName: attendee.fullName,
                        email: attendee.email,
                        phone: attendee.phone
                      }); // Set the correct attendee information
                    }}
                  >
                    Assign Event
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Add/Edit Attendee Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{attendeeForm.id ? 'Edit Attendee' : 'Add Attendee'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAttendeeFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                name="fullName"
                value={attendeeForm.fullName}
                onChange={(e) => setAttendeeForm({ ...attendeeForm, fullName: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formAttendeeEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={attendeeForm.email}
                onChange={(e) => setAttendeeForm({ ...attendeeForm, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formAttendeePhone" className="mt-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="phone"
                value={attendeeForm.phone}
                onChange={(e) => setAttendeeForm({ ...attendeeForm, phone: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveAttendee} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Save Attendee'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Assign Event Modal */}
      <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Event to Attendee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEventSelect">
              <Form.Label>Select Event</Form.Label>
              <Form.Control
                as="select"
                value={selectedEvent || ""}
                onChange={(e) => setSelectedEvent(e.target.value)}
              >
                <option value="">Select an Event</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleAssignEvent(attendeeForm.id)}
            disabled={loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : 'Assign Event'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AttendeeManagement;