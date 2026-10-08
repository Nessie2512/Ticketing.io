import { EventRepository } from "../repo/eventRepo";


export class getEventbyName{

    constructor(private readonly EventRepository:EventRepository){}

    public async execute(name:string){

        const event = await this.EventRepository.findbyEvent(name);
        return event;
    }
}