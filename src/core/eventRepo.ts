import { Event } from "./Event.entity"
import { Repository } from "./Repository"

export abstract class eventRepository implements Repository<Event>{
    abstract create(event:Event):Promise<void>
    abstract findAll():Promise<Event[]>
    abstract findbyEvent(eventname:string):Promise<Event>

}