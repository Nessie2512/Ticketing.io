import { describe, expect, test } from '@jest/globals';
import { Event } from '../../../core/entities/Event.entity';
import { eventMapper } from './eventMapper';

describe('eventMapper', () => {
    const date = new Date('2023-01-01T18:00:00.000Z');
    const event = Event.create({
        eventName: 'Test Event',
        venue: 'Test Venue',
        eventDate: date,
        eventTime: '18:00',
        eventDescription: 'Test description',
    }, 'event-id');

    test('maps entity getter values to Prisma fields', () => {
        expect(eventMapper.toPrisma(event)).toEqual({
            uuid: 'event-id',
            eventname: 'Test Event',
            description: 'Test description',
            date,
            location: 'Test Venue',
            time: '18:00',
            createdAt: event.createdAt,
            editedAt: undefined,
        });
    });

    test('maps Prisma fields to entity properties and preserves the ID', () => {
        const mappedEvent = eventMapper.fromPrisma({
            uuid: 'event-id',
            eventname: 'Test Event',
            location: 'Test Venue',
            date,
            time: '18:00',
            description: 'Test description',
        });

        expect(mappedEvent.id).toBe('event-id');
        expect(mappedEvent.eventName).toBe('Test Event');
        expect(mappedEvent.venue).toBe('Test Venue');
        expect(mappedEvent.eventDate).toEqual(date);
        expect(mappedEvent.eventTime).toBe('18:00');
        expect(mappedEvent.eventDescription).toBe('Test description');
    });
});
