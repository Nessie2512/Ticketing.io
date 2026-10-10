import { Event } from "../../../core/entities/Event.entity";
import { Invitation, InvitationStatus } from "../../../core/entities/invitation.entity";
import { EventRepository } from "../../../core/repo/eventRepo";
import { eventMapper } from "./eventMapper";
import { InvitationMapper } from "./invitationMapper";
import { PrismaService } from "./prisma.service";



export class RepositoryEvent implements EventRepository {

    constructor(private prisma: PrismaService) {}


            async save(event: Event): Promise<void> {
            await this.prisma.event.update({
                where: {
                uuid: event.id, // O UUID do evento
                },
                data: {
                eventname: event.eventName,
                description: event.eventDescription,
                date: event.eventDate,
                location: event.venue,
                time: event.eventTime,
                
                invitations: {
                    upsert: event.invitations.map((invitation) => {
                    // CAPTURA DO UUID DO CONVITE:
                    // Se o id da classe base for o UUID, usamos invitation.id.
                    // Caso contrário, extraímos o valor real em string que está no campo props.
                    const invitationUuid = typeof invitation.id === 'string' && invitation.id.length > 5
                        ? invitation.id 
                        : (invitation as any).props;

                    // Validação visual de segurança (podes apagar depois de funcionar)
                    //console.log(`Mapeando Convite UUID: ${invitationUuid} para o Status: ${invitation.invitationStatus}`);

                    return {
                        where: { 
                        uuid: invitationUuid // Tem de ser a string pura (ex: "1418873d-...")
                        }, 
                        update: {
                        email: invitation.email || null,
                        status: invitation.invitationStatus,
                        },
                        create: {
                        uuid: invitationUuid,
                        email: invitation.email || null,
                        status: invitation.invitationStatus,
                        },
                    };
                    }),
                },
                },
            });
            }

    public async findAll(): Promise<any[]> {

        try {
            const prismaEvents = await this.prisma.event.findMany();
            return prismaEvents.map(eventMapper.fromPrisma);

        } catch (error: any) {
            throw new Error("Error finding all events: " + error.message);
        }
    }
      

    public async findbyEvent(eventname: string): Promise<any> {
        try {
            const prismaEvent = await this.prisma.event.findFirst({ where: { eventname} });
            return eventMapper.fromPrisma(prismaEvent);

        } catch (error: any) {
            throw new Error("Error finding event by name: " + error.message);
        }
    }

    public async findbyId(id: string): Promise<any> {

        try {

            
             const eventData = await this.prisma.event.findUnique({
                where: { uuid: id },
                include: { invitations: true },
            });

            if (!eventData) throw new Error("Event not found");

            const domainEvent = Event.create({
                eventName: eventData.eventname,
                venue: eventData.location,
                eventDate: eventData.date,
                eventTime: eventData.time,
                eventDescription: eventData.description || '',
            }, eventData.uuid);

            eventData.invitations.forEach((invData) => {
                // 1. Criamos a instância (ela nasce por padrão como 'Available')
                const domainInv = Invitation.create({
                eventId: eventData.uuid,
                }, invData.uuid);
                
                // 2. CORREÇÃO CRÍTICA: Forçamos o status real que veio da Base de Dados!
                domainInv.restoreStatus(invData.status as InvitationStatus, invData.email || undefined);
                
                domainEvent.feedInvitations(domainInv);
            });

            return domainEvent;

            }
            
            // const event = eventMapper.fromPrisma(prismaEvent);
            
            // for (const invitation of allInvitations) {
            //     event.feedInvitations(InvitationMapper.fromPrisma(invitation));
            // }

            // //console.log('Event found:', event);
            // return event;
    
        catch (error: any) {
            throw new Error("Error finding event by ID: " + error.message);
        }
    }


    public async findEventbyDBId(id: number): Promise<any> {

        try{
            return await this.prisma.event.findUnique(
                {
                    where:{id}
                }
            )
        }
        catch(error: any){
            throw new Error("Error finding event by ID: " + error.message);
        }
    }

}
