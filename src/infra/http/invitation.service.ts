import { Injectable } from '@nestjs/common';
import { createInvitation } from '../../core/usecase/addInvitaion';
import { buyInvitation } from '../../core/usecase/buyInvitation';
import { getInvitationbyId } from '../../core/usecase/getInvitationById';
import { cancelInvitation } from '../../core/usecase/cancelInvitation';


@Injectable()
export class invitationService { 

  constructor(
    private readonly createInvitationUsecase: createInvitation,
    private readonly readInvitationUsecase: getInvitationbyId,
    private readonly buyInvitationUsecase: buyInvitation,
    private readonly cancelInvitationUsecase: cancelInvitation,
  ) {}

  public async createInvitation(data: any): Promise<void> {
    try {
      await this.createInvitationUsecase.execute(data);
    } catch (error: any) {
      throw new Error('Error creating invitation: ' + error.message);
    }
  }

  public async getInvitationById(id: string): Promise<any> {
    try {
      return await this.readInvitationUsecase.execute(id);
    } catch (error: any) {
      throw new Error('Error getting invitation by ID: ' + error.message);
    }
  }

  public async buyInvitation(data: any): Promise<void> {
    try {
      await this.buyInvitationUsecase.execute(data);
    } catch (error: any) {
      throw new Error('Error buying invitation: ' + error.message);
    }
  }

  public async cancelInvitation(data: any): Promise<void> {
    try {
      await this.cancelInvitationUsecase.execute(data);
    } catch (error: any) {
      throw new Error('Error canceling invitation: ' + error.message);
    }
  }

  
}
