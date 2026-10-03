import { Entity } from "./Entity";

type eventProps ={
    eventName: string;
    venue: string;
    eventDate: Date;
    eventTime: string;
    eventDescription: string;
}

export class Event extends Entity<eventProps> {

}