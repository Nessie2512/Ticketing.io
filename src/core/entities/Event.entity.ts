import { Entity } from "../seed/Entity";
import { Invitation } from "./invitation.entity";

type eventProps ={
    eventName: string;
    venue: string;
    eventDate: Date;
    eventTime: string;
    eventDescription: string;
    invitations: Invitation[];
}

export class Event extends Entity<eventProps> {

    private constructor(props: eventProps, id?: string) {
        super(props, id);
    }

    static create(props: eventProps, id?: string): Event {
        return new Event(props, id);
    }

    get eventName(): string {
        return this.eventName;
    }

    get venue(): string {
        return this.venue;
    }

    get eventDate(): Date {
        return this.eventDate;
    }

    get eventTime(): string {
        return this.eventTime;
    }

    get eventDescription(): string {
        return this.eventDescription;
    }

    get invitations(): Invitation[] {
        return this.props.invitations;
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



  public  bookInvitation(invitation: Invitation): void {
        const availableInvitation = this.invitations.find
        (inv => inv.id === invitation.id && inv.invitationStatus === 'Available');

        if (!availableInvitation) {
            throw new Error('Invitation is not available for booking.');
        }
        availableInvitation.book();
    }

    public cancelInvitation(invitation: Invitation): void {
        const bookedInvitation = this.invitations.find
        (inv => inv.id === invitation.id && inv.invitationStatus === 'Booked');

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
}