import { InvitationRepo } from "../repo/invitationRepo";


export class getAllInvitation{

    constructor(private readonly invitationRepository:InvitationRepo){}

    public async execute(){

        const invitations = await this.invitationRepository.findAll();
        return invitations;
    }
}