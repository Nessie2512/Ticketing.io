import { Entity } from "./Entity";

type InvitationStatus = 'Available' | 'Booked' | 'Pending' | 'Cancelled';

type invitationProps = {
    eventId: string;
    inviteeEmail: string;
    invitationStatus: InvitationStatus;
}

export class Invitation extends Entity<invitationProps> {

}