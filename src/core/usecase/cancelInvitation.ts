
import { EventRepository } from "../repo/eventRepo";

type cancelInvitationDTO = {
    eventId: string;
    invitationId: string;
}

export class cancelInvitation{
    
    constructor(private readonly EventRepository:EventRepository){}

    public async execute(data:cancelInvitationDTO){
        const event = await this.EventRepository.findbyId(data.eventId);
        event.cancelInvitation(data.invitationId);
    }
}