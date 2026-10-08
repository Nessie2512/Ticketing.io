import { createEvent } from "../../core/usecase/createEvent";
import { getAllEvents } from "../../core/usecase/getAllEvent";
import { getEventbyId } from "../../core/usecase/getEventbyId";



export class eventService {

    constructor(
        private readonly createEventUseCase:createEvent,
        private readonly getAllEventsUseCase:getAllEvents,
        private readonly getEventByIdUseCase:getEventbyId,
    ) {}

    public async createEvent(data:any){
        try {
            await this.createEventUseCase.execute(data);
        } catch (error:any) {
            throw new Error("Error creating event: " + error.message);
        }
    }

    public async getAllEvents(){
        try {
            return await this.getAllEventsUseCase.execute();
        } catch (error:any) {
            throw new Error("Error getting all events: " + error.message);
        }
    }


    public async getEventById(id:string){
        try {
            return await this.getEventByIdUseCase.execute(id);
        } catch (error:any) {
            throw new Error("Error getting event by ID: " + error.message);
        }
    }   
}