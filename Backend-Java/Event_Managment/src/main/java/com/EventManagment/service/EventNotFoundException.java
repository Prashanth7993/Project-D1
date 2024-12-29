package com.EventManagment.service;

public class EventNotFoundException extends Exception {
	public EventNotFoundException(String message) {
        super(message);
    }

    // Optional: Constructor that takes a message and cause
    public EventNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

}
