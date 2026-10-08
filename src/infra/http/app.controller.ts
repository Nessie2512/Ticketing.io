import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { invitationService } from './invitation.service';
import { eventService } from './event.service';

@Controller()
export class AppController {
  constructor(
    private readonly invitationService: invitationService,
    private readonly eventService: eventService
  ) {}

  @Get('invitations/:eventId')
  async getAllInvitations(eventId: string): Promise<any[]> {
    return this.invitationService.findAllInvitations(eventId);
  }

  @Get('events')
  async getAllEvents(): Promise<any[]> {
    return this.eventService.getAllEvents();
  }

  @Get('events/:id')
  async getEventById(id: string): Promise<any> {
    return this.eventService.getEventById(id);
  }

  @Post('invitations')
  async createInvitation(invitation: any): Promise<void> {
    return this.invitationService.createInvitation(invitation);
  }

  @Post('events')
  async createEvent(event: any): Promise<void> {
    return this.eventService.createEvent(event);
  }

  @Post('invitations/add-to-event/:invitationId/:eventId/:quantity')
  async addInvitationToEvent(invitationId: string, eventId: string, quantity: number): Promise<void> {
    return this.invitationService.createInvitation({  eventId, invitationQty: quantity });
  }

  @Post('invitations/book-to-event/:eventId')
  async bookInvitationToEvent(eventId: string, @Body() data: { invitationEmail: string }): Promise<void> {
    return this.invitationService.buyInvitation({eventId, invitationEmail: data.invitationEmail});
  }

  @Post('invitations/cancel-from-event/:invitationId/:eventId')
  async cancelInvitationFromEvent(invitationId: string, eventId: string): Promise<void> {
    return this.invitationService.cancelInvitation({invitationId, eventId});
  }

}
