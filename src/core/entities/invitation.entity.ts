import { Entity } from "../@seed/Entity";

export type InvitationStatus = 'Available' | 'Booked' |  'Cancelled';

type invitationProps = {
    eventId: string;
}

export class Invitation extends Entity<invitationProps> {
    private _invitationStatus: InvitationStatus;
     email?: string;

    private constructor(props: invitationProps, id?: string) {
        super(props, id);
        this._invitationStatus = 'Available';
    }

    static create(props: invitationProps, id?: string): Invitation {
    
        return new Invitation(props, id);
    }

    get eventId(): string {
        return this.props.eventId;
    }

    // get inviteeEmail(): string {
    //     return this.props.inviteEmail;
    // }

    get invitationStatus(): InvitationStatus {
        return this._invitationStatus;
    }
    

    // I need to change to private
    public inviteEmail(email: string) {
        if (!this.isEmail(email)) {
            throw new Error('Invalid email address');
        }
        this.email = email;
    }


  protected isEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public book(): void {
    if (this._invitationStatus !== 'Available') {
      throw new Error('Invitation cannot be booked. Current status: ' + this._invitationStatus);
    }
    this._invitationStatus = 'Booked';
  }

  public cancel(): void {
    if (this._invitationStatus !== 'Booked') {
      throw new Error('Invitation cannot be cancelled. Current status: ' + this._invitationStatus);
    }
    this._invitationStatus = 'Cancelled';
  }

  public restoreStatus(status: InvitationStatus, email?: string): void {
    this._invitationStatus = status;
    if (email) this.email = email;
}
  
}