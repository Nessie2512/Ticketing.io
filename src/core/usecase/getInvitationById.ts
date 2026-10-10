import { Injectable } from "@nestjs/common";
import { EventRepository } from "../repo/eventRepo";
import { InvitationRepo } from "../repo/invitationRepo";

@Injectable()
export class getInvitationbyId{

    constructor(
        private readonly invitationRepository:InvitationRepo,
        private readonly eventRepository: EventRepository
    ){}

    public async execute(id:string){

        const invitation = await this.invitationRepository.findbyId(id);


        if(!invitation){
             throw new Error('Invitation not found');
        }

        const event = await this.eventRepository.findEventbyDBId(Number(invitation.eventId))
        
        if(!event){
            throw new Error('Event not found');
        }
        
        return {
            Event: event.eventname,
            Description:event.description,
            Date:event.date,
            Location:event.location,
            time: event.time,
            code:id,
            ownerEmail:invitation.email
        };
    }
}