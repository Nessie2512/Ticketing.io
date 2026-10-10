
import { EventRepository } from "../repo/eventRepo";

type buyInvitationDTO = {
    eventId: string;
    invitationEmail: string;
}

export class buyInvitation{
    
    constructor(private readonly EventRepository:EventRepository){}

    public async execute(data:buyInvitationDTO){
        const eventExits = await this.EventRepository.findbyId(data.eventId);
        //console.log('Event exists:', eventExits);
        if(!eventExits){
            throw new Error("Event not found");
        }
        eventExits.bookInvitation(data.invitationEmail);
        await this.EventRepository.save(eventExits);
    }
}