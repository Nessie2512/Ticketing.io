import { Event } from "../entities/Event.entity";
import { EventRepository } from "../repo/eventRepo";
import { InvitationRepo } from "../repo/invitationRepo";

type createInvitationDTO = {
    eventId: string;
    invitationQty:number
}

export class createInvitation{
    
    constructor(private readonly eventRepository: EventRepository){}

    public async execute(data:createInvitationDTO){

        const foundEvent = await this.eventRepository.findbyId(data.eventId);
        foundEvent.addInvitation(data.invitationQty)
    }
}