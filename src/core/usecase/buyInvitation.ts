
import { EventRepository } from "../repo/eventRepo";

type buyInvitationDTO = {
    eventId: string;
    invitationEmail: string;
}

export class buyInvitation{
    
    constructor(private readonly EventRepository:EventRepository){}

    public async execute(data:buyInvitationDTO){
        const event = await this.EventRepository.findbyId(data.eventId);
        event.bookInvitation(data.invitationEmail);
    }
}