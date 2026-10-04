import { InvitationRepo } from "../repo/invitationRepo";


export class getInvitationbyId{

    constructor(private readonly invitationRepository:InvitationRepo){}

    public async execute(id:string){

        const invitation = await this.invitationRepository.findbyId(id);
        return invitation;
    }
}