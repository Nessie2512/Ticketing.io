import { describe, test, expect } from '@jest/globals';
import { Event } from './Event.entity';


describe("testing event", () => {
    const newEvent = Event.create({
        eventName: "Test Event",
        venue: "Test Venue",
        eventDate: new Date("2023-01-01"),
        eventTime: "18:00",
        eventDescription: "This is a test event",
    });

    test("should create a new event with the given properties", () => {
        expect(newEvent).toBeDefined();
        expect(newEvent.props.eventName).toBe("Test Event");
        expect(newEvent.props.venue).toBe("Test Venue");
        expect(newEvent.props.eventDate).toEqual(new Date("2023-01-01"));
        expect(newEvent.props.eventTime).toBe("18:00");
        expect(newEvent.props.eventDescription).toBe("This is a test event");
    });

    test("should have createdAt and editedAt properties", () => {
        expect(newEvent.createdAt).toBeInstanceOf(Date);
        expect(newEvent.editedAt).toBeUndefined();
    });

    test("should set new event properties", () => {
        newEvent.eventName = "Updated Event";
        newEvent.venue = "Updated Venue";
        newEvent.eventDate = new Date("2023-02-01");
        newEvent.eventTime = "19:00";
        newEvent.eventDescription = "This is an updated test event";

        expect(newEvent.props.eventName).toBe("Updated Event");
        expect(newEvent.props.venue).toBe("Updated Venue");
        expect(newEvent.props.eventDate).toEqual(new Date("2023-02-01"));
        expect(newEvent.props.eventTime).toBe("19:00");
        expect(newEvent.props.eventDescription).toBe("This is an updated test event");
    });

    test("should add  invitations", () => {
        newEvent.addInvitation(3);
        expect(newEvent.invitations.length).toBe(3);
    });
}); 