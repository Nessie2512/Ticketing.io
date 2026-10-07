import { Event } from "../../../core/entities/Event.entity";
import { EventRepository } from "../../../core/repo/eventRepo";
import { PrismaService } from "./prisma.service";


class eventMapper {

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

export class RepositoryEvent implements EventRepository {

    constructor(private prisma: PrismaService) {}

    public async create(event: Event): Promise<void> {
        
        try {
            await this.prisma.event.create({
                data: eventMapper.toPrisma(event)
            });

        } catch (error: any) {
            throw new Error("Error creating event: " + error.message);
        }
    }

    public async findAll(): Promise<any[]> {

        try {
            const prismaEvents = await this.prisma.event.findMany();
            return prismaEvents.map(eventMapper.fromPrisma);

        } catch (error: any) {
            throw new Error("Error finding all events: " + error.message);
        }
    }
      

    public async findbyEvent(eventname: string): Promise<any> {
        try {
            const prismaEvent = await this.prisma.event.findFirst({ where: { eventname} });
            return eventMapper.fromPrisma(prismaEvent);

        } catch (error: any) {
            throw new Error("Error finding event by name: " + error.message);
        }
    }

    public async findbyId(id: string): Promise<any> {
        try {
            const prismaEvent = await this.prisma.event.findUnique({ where: { uuid: id } });
            return eventMapper.fromPrisma(prismaEvent);
        } catch (error: any) {
            throw new Error("Error finding event by ID: " + error.message);
        }
    }   
}
