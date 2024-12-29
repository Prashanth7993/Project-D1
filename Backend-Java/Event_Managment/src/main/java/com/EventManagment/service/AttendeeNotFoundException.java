package com.EventManagment.service;

public class AttendeeNotFoundException extends RuntimeException {
	public AttendeeNotFoundException(String message) {
        super(message); // Pass the message to the superclass constructor
    }
}
