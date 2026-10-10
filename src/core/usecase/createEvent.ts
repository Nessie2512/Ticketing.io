import { Event } from "../entities/Event.entity";
import { EventRepository } from "../repo/eventRepo";

type createEventDTO = {
    eventName: string;
    venue: string;
    eventDate: Date;
    eventTime: string;
    eventDescription: string;
}

export class createEvent{
    
    constructor(
        private readonly EventRepository:EventRepository
    ){}

    public async execute(data:createEventDTO){
        const newEvent = Event.create(data)
        //console.log('Creating event with data:', newEvent);
        await this.EventRepository.save(newEvent);
    }
}