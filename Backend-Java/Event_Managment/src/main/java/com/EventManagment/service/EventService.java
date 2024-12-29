package com.EventManagment.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.EventManagment.Repository.EventRepository;
import com.EventManagment.model.*;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event event) {
        event.setId(id);
        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
    
    public Optional<Event> getEventById(Long eventId) {
        return eventRepository.findById(eventId); // Fetch event by ID from DB
    }
    
//    public Optional<Event> findById(Long id) {
//        return eventRepository.findById(id);
//    }
    
    public Event findById(Long eventId) {
        return eventRepository.findById(eventId).orElse(null); // Return null if event not found
    }
	
}
