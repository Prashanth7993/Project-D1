package com.EventManagment.service;

import com.EventManagment.Repository.AttendeeRepository;
import com.EventManagment.Repository.EventRepository;
import com.EventManagment.model.Attendee;
import com.EventManagment.model.Event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AttendeeService {

    @Autowired
    private AttendeeRepository attendeeRepository;

    @Autowired
    private EventRepository eventRepository;

    public Attendee save(Attendee attendee) {
        return attendeeRepository.save(attendee);
    }

    // Fetch all attendees
    public List<Attendee> getAllAttendees() {
        return attendeeRepository.findAll();
    }



    public void deleteAttendee(Long id) throws AttendeeNotFoundException {
        Optional<Attendee> attendee = attendeeRepository.findById(id);
        if (attendee.isPresent()) {
            attendeeRepository.deleteById(id);
        } else {
            throw new AttendeeNotFoundException(null);
        }
    }
    public Optional<Attendee> findById(Long id) {
        return attendeeRepository.findById(id);  // Retrieve an attendee by their ID, returns Optional
    }
    
    public Attendee updateAttendee(Long id, Attendee attendee) {
        attendee.setId(id);
        return attendeeRepository.save(attendee);
    }
    
    public Attendee assignEventToAttendee(Long attendeeId, Long eventId) throws AttendeeNotFoundException, EventNotFoundException {
        Attendee attendee = attendeeRepository.findById(attendeeId).orElseThrow(() -> new AttendeeNotFoundException("Attendee not found"));
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new EventNotFoundException("Event not found"));

        attendee.setEvent(event);  // Link the event to the attendee
        return attendeeRepository.save(attendee);
    }

}
