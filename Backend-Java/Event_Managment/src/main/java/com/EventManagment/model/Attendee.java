package com.EventManagment.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "attendees")
public class Attendee {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String FullName;

   
    private String email;

    
    private String phone;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;
}

