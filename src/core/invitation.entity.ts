import { Entity } from "./Entity";

type InvitationStatus = 'Available' | 'Booked' | 'Pending' | 'Cancelled';

type invitationProps = {
    eventId: string;
    inviteeEmail: string;
}

export class Invitation extends Entity<invitationProps> {
    private _invitationStatus: InvitationStatus;

    private constructor(props: invitationProps, id?: string) {
        super(props, id);
        this._invitationStatus = 'Available';
    }

    static create(props: invitationProps, id?: string): Invitation {
        return new Invitation(props, id);
    }

    get eventId(): string {
        return this.eventId;
    }

    get inviteeEmail(): string {
        return this.inviteeEmail;
    }

    get invitationStatus(): InvitationStatus {
        return this.invitationStatus;
    }
}