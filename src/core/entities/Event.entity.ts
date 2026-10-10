import { Entity } from "../@seed/Entity";
import { Invitation } from "./invitation.entity";

type eventProps = {
    eventName: string;
    venue: string;
    eventDate: Date;
    eventTime: string;
    eventDescription: string;
}

export class Event extends Entity<eventProps> {
     Invitations: Invitation[];

    private constructor(props: eventProps, id?: string) {
        super(props, id);
        this.Invitations = []
    }

    static create(props: eventProps, id?: string): Event {
        return new Event(props, id);
    }

    get eventName(): string {
        return this.props.eventName;
    }

    get venue(): string {
        return this.props.venue;
    }

    get eventDate(): Date {
        return this.props.eventDate;
    }

    get eventTime(): string {
        return this.props.eventTime;
    }

    get eventDescription(): string {
        return this.props.eventDescription;
    }

    get invitations(): Invitation[] {
        return this.Invitations;
    }

    set eventName(name: string) {
        this.props.eventName = name;
    }

    set venue(venue: string) {
        this.props.venue = venue;
    }

    set eventDate(date: Date) {
        this.props.eventDate = date;
    }

    set eventTime(time: string) {
        this.props.eventTime = time;
    }

    set eventDescription(description: string) {
        this.props.eventDescription = description;
    }



  public  bookInvitation(email: string): void {

        const availableInvitation = this.invitations.find
        (inv => inv.invitationStatus === 'Available');

        console.log('Available invitation:', availableInvitation);
        if (!availableInvitation) {
            throw new Error('there is not available for booking.');
        }
        availableInvitation.inviteEmail(email);
        availableInvitation.book();
    }

    public cancelInvitation(invitationId: string): void {
        const bookedInvitation = this.invitations.find
        (inv => inv.id === invitationId && inv.invitationStatus === 'Booked');

        if (!bookedInvitation) {
            throw new Error('Invitation is not booked and cannot be canceled.');
        }
        bookedInvitation.cancel();
    }

    public addInvitation(qty: number): void {

        for (let i = 0; i < qty; i++) {
            const newInvitation = Invitation.create({
                eventId: this.id,
            });
            this.invitations.push(newInvitation);
        }   
    }


    public feedInvitations(invitations: Invitation): void {
        this.Invitations.push(invitations);
    }
}