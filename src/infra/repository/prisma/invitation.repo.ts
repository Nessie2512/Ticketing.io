import { Prisma } from "@prisma/client";
import { InvitationRepo } from "../../../core/repo/invitationRepo";
import { PrismaService } from "./prisma.service";
import { Invitation } from "../../../core/entities/invitation.entity";

export class InvitationRepository implements InvitationRepo {
     constructor(private prisma: PrismaService) {}

     create(invitation: Invitation): Promise<void> {

          try{

               

          }
          catch(error: any){
               throw new Error("Error creating invitation: " + error.message);
          }
          
     }

     findAll(): Promise<Invitation[]> {
          
          
          try{

          }
          catch(error: any){
               throw new Error("Error finding all invitations: " + error.message);
          }
     }

     findbyId(id: string): Promise<Invitation> {
          
          
          try{

          }
          catch(error: any){
               throw new Error("Error finding invitation by ID: " + error.message);
          }
     }
}