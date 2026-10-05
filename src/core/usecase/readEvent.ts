import { EventRepository } from "../repo/eventRepo";

export class ReadEvent {

    constructor(
        private readonly eventRepository: EventRepository,
    ) { }

    public async execute(eventId: string) {
        const foundEvent = await this.eventRepository.findbyId(eventId);

        return {
            eventId: foundEvent.id,
            eventName: foundEvent.eventName,
            venue: foundEvent.venue,
            eventDate: foundEvent.eventDate,
            eventTime: foundEvent.eventTime,
            eventDescription: foundEvent.eventDescription
        }
    }   
}