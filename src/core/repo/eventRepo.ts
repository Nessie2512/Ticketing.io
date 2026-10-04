import { Event } from "../entities/Event.entity"
import { Repository } from "../seed/Repository"

export abstract class EventRepository implements Repository<Event>{
    abstract create(event:Event):Promise<void>
    abstract findAll():Promise<Event[]>
    abstract findbyEvent(eventname:string):Promise<Event>
}