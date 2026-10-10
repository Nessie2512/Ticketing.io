import { Prisma } from "@prisma/client";
import { InvitationRepo } from "../../../core/repo/invitationRepo";
import { PrismaService } from "./prisma.service";
import { Invitation } from "../../../core/entities/invitation.entity";
import { InvitationMapper } from "./invitationMapper";


export class InvitationRepository implements InvitationRepo {
     constructor(private prisma: PrismaService) {}

    public async create(invitation: Invitation): Promise<void> {

          try{

               console.log('Creating invitation with data:', invitation);
           await this.prisma.invitation.create({
                    data: InvitationMapper.toPrisma(invitation)
               });

          }
          catch(error: any){
               throw new Error("Error creating invitation: " + error.message);
          }
          
     }

    public async findAll(): Promise<any[]> {
          
          
          try{
               return await this.prisma.invitation.findMany()
          }
          catch(error: any){
               throw new Error("Error finding all invitations: " + error.message);
          }
     }

   public async findbyId(id: string): Promise<any> {
          
          
          try{


               return await this.prisma.invitation.findUnique({
                    where: { uuid: id },
               });
               
          }
          catch(error: any){
               throw new Error("Error finding invitation by ID: " + error.message);
          }
     }
}