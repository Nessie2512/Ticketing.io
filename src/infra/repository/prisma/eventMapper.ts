import { Event } from "../../../core/entities/Event.entity";

export class eventMapper {

    public static toPrisma(event: Event): any {
        return {
            uuid: event.id,
            eventname: event.eventName,
            description: event.eventDescription,
            date: event.eventDate,
            location: event.venue,
            time: event.eventTime,
            createdAt: event.createdAt,
            editedAt: event.editedAt
        }
    }

    public static fromPrisma(prismaEvent: any): Event {
        return Event.create(
            {
                eventName: prismaEvent.name,
                venue: prismaEvent.location,
                eventDate: prismaEvent.date,
                eventTime: prismaEvent.time,
                eventDescription: prismaEvent.description
            },
        );
    }
}