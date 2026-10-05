import { describe, test, expect } from '@jest/globals';
import { Invitation } from './invitation.entity';


describe("testing invitation", () => {

    const newInvitation = Invitation.create({ eventId: "event123"});

    test("should create a new invitation with the given properties", () => {
        expect(newInvitation).toBeDefined();
        //expect(newInvitation.props.inviteEmail).toBe("test@example.com");
        expect(newInvitation.props.eventId).toBe("event123");
    });

    test("should have the correct invitation status", () => {
        expect(newInvitation.invitationStatus).toBe("Available");
    });

    // test("should throw an error for invalid email", () => {
    //     expect(() => {
    //         Invitation.create({inviteEmail: "invalid-email", eventId: "event123"});
    //     }).toThrow("Invalid email address");
    // });

    test("should book the invitation", () => {
        newInvitation.book();
        expect(newInvitation.invitationStatus).toBe("Booked");
    });

    test("should throw an error when booking an already booked invitation", () => {
        expect(() => {
            newInvitation.book();
        }).toThrow("Invitation cannot be booked. Current status: Booked");
    });


    test("should cancel the invitation", () => {
        newInvitation.cancel();
        expect(newInvitation.invitationStatus).toBe("Cancelled");
    });

    test("should throw an error when cancelling an invitation that is not booked", () => {
        expect(() => {
            newInvitation.cancel();
        }).toThrow("Invitation cannot be cancelled. Current status: Cancelled");
    });

    // test("should set a new valid invitee email", () => {
    //     newInvitation.inviteEmail = "newtest@example.com";
    //     expect(newInvitation.props.inviteEmail).toBe("newtest@example.com");
    // });

    // test("should throw an error for setting an invalid invitee email", () => {
    //     expect(() => {
    //         newInvitation.inviteEmail = "invalid-email";
    //     }).toThrow("Invalid email address");
    // });

    test("should have createdAt and editedAt properties", () => {
        expect(newInvitation.createdAt).toBeInstanceOf(Date);
        expect(newInvitation.editedAt).toBeUndefined();
    });
});