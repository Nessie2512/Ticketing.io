import { EventRepository } from "../../core/repo/eventRepo";


export class eventService {

    constructor(private readonly eventRepository: EventRepository) {}

    async createEvent(event: any): Promise<void> {
        try {
            await this.eventRepository.create(event);
        } catch (error: any) {
            throw new Error("Error creating event: " + error.message);
        }
    }

    async findAllEvents(): Promise<any[]> {
        try {
            return await this.eventRepository.findAll();
        } catch (error: any) {
            throw new Error("Error finding all events: " + error.message);
        }
    }

    async findEventById(id: string): Promise<any> {
        try {
            return await this.eventRepository.findbyId(id);
        } catch (error: any ) {
            throw new Error("Error finding event by ID: " + error.message);
        }
    }
}