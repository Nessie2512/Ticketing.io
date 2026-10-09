import { BadRequestException } from '@nestjs/common';
import { describe, expect, test } from '@jest/globals';
import { normalizeCreateEventRequest } from './event.service';

describe('normalizeCreateEventRequest', () => {
    test('accepts domain property names and parses JSON dates', () => {
        const event = normalizeCreateEventRequest({
            eventName: 'Test Event',
            venue: 'Test Venue',
            eventDate: '2026-10-09T18:00:00.000Z',
            eventTime: '18:00',
            eventDescription: 'Test description',
        });

        expect(event).toEqual({
            eventName: 'Test Event',
            venue: 'Test Venue',
            eventDate: new Date('2026-10-09T18:00:00.000Z'),
            eventTime: '18:00',
            eventDescription: 'Test description',
        });
    });

    test('accepts Prisma property names', () => {
        expect(normalizeCreateEventRequest({
            eventname: 'Test Event',
            location: 'Test Venue',
            date: '2026-10-09',
            time: '18:00',
            description: 'Test description',
        })).toMatchObject({
            eventName: 'Test Event',
            venue: 'Test Venue',
            eventTime: '18:00',
            eventDescription: 'Test description',
        });
    });

    test('reports missing fields as a bad request', () => {
        expect(() => normalizeCreateEventRequest({})).toThrow(
            new BadRequestException(
                'Missing required event fields: eventName, venue, eventDate, eventTime, eventDescription.',
            ),
        );
    });

    test('rejects invalid dates', () => {
        expect(() => normalizeCreateEventRequest({
            eventName: 'Test Event',
            venue: 'Test Venue',
            eventDate: 'not-a-date',
            eventTime: '18:00',
            eventDescription: 'Test description',
        })).toThrow(new BadRequestException('eventDate must be a valid date.'));
    });
});
