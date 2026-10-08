import { EventRepository } from "../repo/eventRepo";


export class getAllEvents{

    constructor(private readonly EventRepository:EventRepository){}

    public async execute(){

        const events = await this.EventRepository.findAll();
        return events;
    }
}