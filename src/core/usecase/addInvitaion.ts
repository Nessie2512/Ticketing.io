
import { EventRepository } from "../repo/eventRepo";

type createInvitationDTO = {
    eventId: string;
    invitationQty: number;
}

export class createInvitation{
    
    constructor(private readonly EventRepository:EventRepository){}

    public async execute(data:createInvitationDTO){
        const event = await this.EventRepository.findbyId(data.eventId);
        event.addInvitation(data.invitationQty);
    }
}