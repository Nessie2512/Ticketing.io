import { BadRequestException } from "@nestjs/common";
import { createEvent } from "../../core/usecase/createEvent";
import { getAllEvents } from "../../core/usecase/getAllEvent";
import { getEventbyId } from "../../core/usecase/getEventbyId";

type CreateEventRequest = {
    eventName: string;
    venue: string;
    eventDate: Date;
    eventTime: string;
    eventDescription: string;
};

export function normalizeCreateEventRequest(data: unknown): CreateEventRequest {
    if (data === null || typeof data !== "object" || Array.isArray(data)) {
        throw new BadRequestException("The request body must be an event object.");
    }

    const body = data as Record<string, unknown>;
    const eventName = body.eventName ?? body.eventname;
    const venue = body.venue ?? body.location;
    const eventDate = body.eventDate ?? body.date;
    const eventTime = body.eventTime ?? body.time;
    const eventDescription = body.eventDescription ?? body.description;

    const missingFields = [
        ["eventName", eventName],
        ["venue", venue],
        ["eventDate", eventDate],
        ["eventTime", eventTime],
        ["eventDescription", eventDescription],
    ]
        .filter(([, value]) => value === undefined || value === null || value === "")
        .map(([name]) => name);

    if (missingFields.length > 0) {
        throw new BadRequestException(
            `Missing required event fields: ${missingFields.join(", ")}.`,
        );
    }

    if (
        typeof eventName !== "string" ||
        typeof venue !== "string" ||
        typeof eventTime !== "string" ||
        typeof eventDescription !== "string"
    ) {
        throw new BadRequestException(
            "eventName, venue, eventTime, and eventDescription must be strings.",
        );
    }

    const parsedDate =
        eventDate instanceof Date
            ? eventDate
            : typeof eventDate === "string"
              ? new Date(eventDate)
              : new Date(Number.NaN);

    if (Number.isNaN(parsedDate.getTime())) {
        throw new BadRequestException("eventDate must be a valid date.");
    }

    return {
        eventName,
        venue,
        eventDate: parsedDate,
        eventTime,
        eventDescription,
    };
}

export class eventService {

    constructor(
        private readonly createEventUseCase:createEvent,
        private readonly getAllEventsUseCase:getAllEvents,
        private readonly getEventByIdUseCase:getEventbyId,
    ) {}

    public async createEvent(data: unknown) {
        await this.createEventUseCase.execute(normalizeCreateEventRequest(data));
    }

    public async getAllEvents(){
        try {
            return await this.getAllEventsUseCase.execute();
        } catch (error:any) {
            throw new Error("Error getting all events: " + error.message);
        }
    }


    public async getEventById(id:string){
        try {
            return await this.getEventByIdUseCase.execute(id);
        } catch (error:any) {
            throw new Error("Error getting event by ID: " + error.message);
        }
    }   
}