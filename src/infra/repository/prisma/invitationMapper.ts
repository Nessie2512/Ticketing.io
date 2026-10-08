import { Invitation } from "../../../core/entities/invitation.entity";


export class InvitationMapper{


     public static toPrisma( invitation: Invitation): any {
          return {
               uuid: invitation.id,
               email: invitation.email,
               status: invitation.invitationStatus,
               createdAt: invitation.createdAt,
               editedAt: invitation.editedAt,
               event: {
                    connect: { uuid: invitation.eventId }
               }
          }
     }

     public static fromPrisma(prismaInvitation: any): Invitation {
          return  Invitation.create(
               prismaInvitation?.uuid,
               prismaInvitation.eventId,
          );
     }
}