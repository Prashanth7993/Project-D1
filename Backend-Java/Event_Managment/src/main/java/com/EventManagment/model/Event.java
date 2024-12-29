package com.EventManagment.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String location;
    private String date;

    @OneToMany
    private List<Attendee> attendees;
    
//    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Attendee> attendees;

//    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Task> tasks;
    
    @OneToMany
    private List<Task> tasks;
}
