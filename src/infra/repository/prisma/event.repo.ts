import { Event } from "../../../core/entities/Event.entity";
import { EventRepository } from "../../../core/repo/eventRepo";
import { eventMapper } from "./eventMapper";
import { InvitationMapper } from "./invitationMapper";
import { PrismaService } from "./prisma.service";



export class RepositoryEvent implements EventRepository {

    constructor(private prisma: PrismaService) {}

    public async create(event: Event): Promise<void> {
        
        try {
            //console.log('Creating event with data:', event);
            await this.prisma.event.create({
                data: eventMapper.toPrisma(event)
            });

        } catch (error: any) {
            throw new Error("Error creating event: " + error.message);
        }
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

            console.log('Finding event by ID:', id);
            const prismaEvent = await this.prisma.event.findUnique({ where: { uuid: id } });
            const allInvitations = await this.prisma.invitation.findMany({ where: { eventId: prismaEvent?.id } });
            
            const event = eventMapper.fromPrisma(prismaEvent);
            
            for (const invitation of allInvitations) {
                event.feedInvitations(InvitationMapper.fromPrisma(invitation));
            }

            //console.log('Event found:', event);
            return event;


        } catch (error: any) {
            throw new Error("Error finding event by ID: " + error.message);
        }
    }

}
