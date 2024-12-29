package com.EventManagment.Controllers;


import com.EventManagment.model.*;
import com.EventManagment.service.EventNotFoundException;
import com.EventManagment.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/events")
public class EventController {
    @Autowired
    private EventService eventService;

    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event createdEvent = eventService.createEvent(event); // Call service to save the event
        return new ResponseEntity<>(createdEvent, HttpStatus.CREATED);
    }

    // PUT request - Update Event by ID
    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable("id") Long id, @RequestBody Event event) throws EventNotFoundException {
        Event updatedEvent = eventService.updateEvent(id, event);
        return new ResponseEntity<>(updatedEvent, HttpStatus.OK);
    }

    // DELETE request - Delete Event by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable("id") Long id) throws EventNotFoundException {
        eventService.deleteEvent(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    @GetMapping  // This will handle the GET request for /api/events
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();  // Replace with your service logic
    }
}