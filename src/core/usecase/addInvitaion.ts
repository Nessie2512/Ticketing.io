
import { EventRepository } from "../repo/eventRepo";

type createInvitationDTO = {
    eventId: string;
    invitationQty: string;
}

export class createInvitation{
    
    constructor(private readonly EventRepository:EventRepository){}

    public async execute(data:createInvitationDTO){
        const event = await this.EventRepository.findbyId(data.eventId);
        event.addInvitation(parseInt(data.invitationQty));
    }
}