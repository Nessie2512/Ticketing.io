import { Injectable } from '@nestjs/common';
import { InvitationRepository } from '../repository/prisma/invitation.repo';

@Injectable()
export class invitationService { 

  constructor(private readonly invitationRepository: InvitationRepository) {}

  async createInvitation(invitation: any): Promise<void> {
    try {
      await this.invitationRepository.create(invitation);
    } catch (error: any) {
      throw new Error("Error creating invitation: " + error.message);
    }
  }

  async findAllInvitations(): Promise<any[]> {
    try {
      return await this.invitationRepository.findAll();
    } catch (error: any) {
      throw new Error("Error finding all invitations: " + error.message);
    }
  }

  async findInvitationById(id: string): Promise<any> {
    try {
      return await this.invitationRepository.findbyId(id);
    } catch (error: any ) {
      throw new Error("Error finding invitation by ID: " + error.message);
    }
  }

}
