import { EventRepository } from "../repo/eventRepo";


type createInvitationDTO = {
    eventId: string;
    invitationQty:number
}

export class createInvitation{
    
    constructor(private readonly eventRepository: EventRepository){}

    public async execute(data:createInvitationDTO){

        const foundEvent = await this.eventRepository.findbyId(data.eventId);
        await foundEvent.addInvitation(data.invitationQty);
    }
}