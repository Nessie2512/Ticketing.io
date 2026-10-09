
import { EventRepository } from "../repo/eventRepo";
import { InvitationRepo } from "../repo/invitationRepo";

type createInvitationDTO = {
    eventId: string;
    invitationQty: number;
}

export class createInvitation{
    
    constructor(
        private readonly EventRepository:EventRepository,
        private readonly invitationRepository: InvitationRepo
    ){}

    public async execute(data:createInvitationDTO){
        
        const eventExists = await this.EventRepository.findbyId(data.eventId);
        if (!eventExists) {
            throw new Error(`Event with ID ${data.eventId} does not exist.`);
        }
        eventExists.addInvitation(data.invitationQty);
        console.log('Updated event after adding invitation:', eventExists);

        for (const invitation of eventExists.invitations) {
            await this.invitationRepository.create(invitation);
            console.log('Invitation to be created:', invitation);
        }
        
    }
}