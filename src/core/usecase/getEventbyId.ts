import { EventRepository } from "../repo/eventRepo";
import { InvitationRepo } from "../repo/invitationRepo";


export class getEventbyId{

    constructor(private readonly EventRepository:EventRepository){}

    public async execute(id:string){

        const event = await this.EventRepository.findbyId(id);
        return event;
    }
}