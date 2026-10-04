import { Invitation } from "../entities/invitation.entity";
import { Repository } from "../@seed/Repository";


export abstract class InvitationRepo implements Repository<Invitation>{
    abstract create(invitation:Invitation):Promise<void>
    abstract findAll():Promise<Invitation[]>
    abstract findbyId(id:string):Promise<Invitation>
}