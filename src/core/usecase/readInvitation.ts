import { EventRepository } from "../repo/eventRepo";
import { InvitationRepo } from "../repo/invitationRepo";

type readInvitationDTO = {
    invitationId: string;
}

export class readInvitation{
    
    constructor(
        private readonly InvitationRepository:InvitationRepo,
        private readonly EventRepository:EventRepository,
    ){}

    public async execute(data:readInvitationDTO){
        const invitation = await this.InvitationRepository.findbyId(data.invitationId);
        const foundEvent = await this.EventRepository.findbyId(invitation.eventId);
        
        return {
            invitationId: invitation.id,
            eventId: foundEvent.id,
            eventName: foundEvent.eventName,
            venue: foundEvent.venue,
            eventDate: foundEvent.eventDate,
            eventTime: foundEvent.eventTime,
            eventDescription: foundEvent.eventDescription,
            invitationStatus: invitation.invitationStatus
        }
    }
}