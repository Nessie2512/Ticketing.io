import { InvitationRepo } from "../repo/invitationRepo";


export class getAllInvitationFromEvent {

    constructor(private readonly invitationRepository:InvitationRepo){}

    public async execute(eventId:string):Promise<any[]>{

        const invitations = await this.invitationRepository.findAll(eventId);
        return invitations;
    }
}