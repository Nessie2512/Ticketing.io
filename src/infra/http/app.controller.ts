import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { invitationService } from './invitation.service';
import { eventService } from './event.service';

@Controller()
export class AppController {
  constructor(
    private readonly invitationService: invitationService,
    private readonly eventService: eventService
  ) {}

  @Get('allinvitations/:eventId')
  async getAllInvitations(eventId: string): Promise<any[]> {
    return this.invitationService.findAllInvitations(eventId);
  }

  @Get('invitations/:invitationId')
    async getInvitationbyId(@Param('invitationId') invitationId:string ): Promise<any[]> {
    return this.invitationService.getInvitationById(invitationId);
  }

  @Get('events')
  async getAllEvents(): Promise<any[]> {
    return this.eventService.getAllEvents();
  }

  @Get('events/:id')
  async getEventById(@Param('id') id: string): Promise<any> {
    return this.eventService.getEventById(id);
  }

  @Post('invitations/:eventId')
  async createInvitation(@Param('eventId') eventId: string, @Body() data: { invitationQty: number }): Promise<void> {
    return this.invitationService.createInvitation({ ...data, eventId });
  }

  @Post('events')
  async createEventcontroller(@Body() event: any): Promise<void> {
    //console.log('Received event data:', event);
    return this.eventService.createEvent(event);
  }

  @Post('invitations/add-to-event/:invitationId/:eventId/:quantity')
  async addInvitationToEvent(@Param('invitationId') invitationId: string, @Param('eventId') eventId: string, @Param('quantity') quantity: number): Promise<void> {
    return this.invitationService.createInvitation({  eventId, invitationQty: quantity });
  }

  @Post('invitations/book-to-event/:eventId')
  async bookInvitationToEvent(@Param('eventId') eventId: string, @Body() data: { invitationEmail: string }): Promise<void> {
    return this.invitationService.buyInvitation({eventId, invitationEmail: data.invitationEmail});
  }

  @Post('invitations/cancel-from-event/:invitationId/:eventId')
  async cancelInvitationFromEvent(@Param('invitationId') invitationId: string, @Param('eventId') eventId: string): Promise<void> {
    return this.invitationService.cancelInvitation({invitationId, eventId});
  }

}
