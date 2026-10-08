import { Controller, Get, Post } from '@nestjs/common';
import { invitationService } from './invitation.service';
import { eventService } from './event.service';

@Controller()
export class AppController {
  constructor(
    private readonly invitationService: invitationService,
    private readonly eventService: eventService
  ) {}

  @Get('invitations')
  async getAllInvitations(): Promise<any[]> {
    return this.invitationService.findAllInvitations();
  }

  @Get('events')
  async getAllEvents(): Promise<any[]> {
    return this.eventService.findAllEvents();
  }

  @Get('invitations/:id')
  async getInvitationById(id: string): Promise<any> {
    return this.invitationService.findInvitationById(id);
  }

  @Get('events/:id')
  async getEventById(id: string): Promise<any> {
    return this.eventService.findEventById(id);
  }

  @Post('invitations')
  async createInvitation(invitation: any): Promise<void> {
    return this.invitationService.createInvitation(invitation);
  }

  @Post('events')
  async createEvent(event: any): Promise<void> {
    return this.eventService.createEvent(event);
  }

  @Post('invitations/add-to-event')
  async addInvitationToEvent(invitationId: string, eventId: string): Promise<void> {
    return this.eventService.addInvitationToEvent(invitationId, eventId);
  }

  @Post('invitations/book-to-event')
  async bookInvitationToEvent(invitationId: string, eventId: string): Promise<void> {
    return this.eventService.bookInvitationToEvent(invitationId, eventId);
  }

  @Post('invitations/cancel-from-event')
  async cancelInvitationFromEvent(invitationId: string, eventId: string): Promise<void> {
    return this.eventService.cancelInvitationFromEvent(invitationId, eventId);
  }

}
