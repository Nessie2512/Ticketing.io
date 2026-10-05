
import { EventRepository } from "../repo/eventRepo";

type buyInvitationDTO = {
    eventId: string;
}

export class buyInvitation{
    
    constructor(private readonly EventRepository:EventRepository){}

    public async execute(data:buyInvitationDTO){
        const event = await this.EventRepository.findbyId(data.eventId);
        event.bookInvitation();
    }
}