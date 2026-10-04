import { Invitation } from "./invitation.entity";
import { Repository } from "./Repository";


export abstract class InvitationRepo implements Repository<Invitation>{
    abstract create(invitation:Invitation):Promise<void>
    abstract findAll():Promise<Invitation[]>
    abstract findbyEvent(eventname:string):Promise<Invitation>
}