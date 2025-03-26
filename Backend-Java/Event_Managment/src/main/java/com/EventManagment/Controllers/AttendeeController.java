package com.EventManagment.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.EventManagment.model.Attendee;
import com.EventManagment.service.AttendeeNotFoundException;
import com.EventManagment.service.AttendeeService;
import com.EventManagment.service.EventNotFoundException;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/attendees")
public class AttendeeController {

    @Autowired
    private AttendeeService attendeeService;
    
    // POST request - Create new Attendee
    @PostMapping
    public ResponseEntity<Attendee> createAttendee(@RequestBody Attendee attendee) {
        Attendee savedAttendee = attendeeService.save(attendee);
        return new ResponseEntity<>(savedAttendee, HttpStatus.CREATED);
    }

    // GET request - Get all attendees
    @GetMapping
    public List<Attendee> getAllAttendees() {
        return attendeeService.getAllAttendees();
    }

    // DELETE request - Delete attendee by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttendee(@PathVariable("id") Long id) throws AttendeeNotFoundException {
        attendeeService.deleteAttendee(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // PUT request - Update attendee by ID
    @PutMapping("/{id}")
    public ResponseEntity<Attendee> updateAttendee(@PathVariable("id") Long id, @RequestBody Attendee attendee) throws AttendeeNotFoundException {
        // Update the attendee using the attendeeService
        Attendee updatedAttendee = attendeeService.updateAttendee(id, attendee);
        return new ResponseEntity<>(updatedAttendee, HttpStatus.OK);  // Return the updated attendee with HTTP 200 OK status
    }
    
    @PutMapping("/{attendeeId}/assign/{eventId}")
    public ResponseEntity<Attendee> assignEventToAttendee(@PathVariable("attendeeId") Long attendeeId, @PathVariable("eventId") Long eventId) throws AttendeeNotFoundException, EventNotFoundException {
        Attendee updatedAttendee = attendeeService.assignEventToAttendee(attendeeId, eventId);
        return ResponseEntity.ok(updatedAttendee);
    }

}
