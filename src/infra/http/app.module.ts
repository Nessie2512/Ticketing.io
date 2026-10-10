import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { invitationService } from './invitation.service';
import { eventService } from './event.service';
import { EventRepository } from '../../core/repo/eventRepo';
import { InvitationRepo } from '../../core/repo/invitationRepo';
import { buyInvitation } from '../../core/usecase/buyInvitation';
import { cancelInvitation } from '../../core/usecase/cancelInvitation';
import { createEvent } from '../../core/usecase/createEvent';
import { createInvitation as addInvitation } from '../../core/usecase/addInvitaion';
import { createInvitation } from '../../core/usecase/createInvitation';
import { getAllEvents } from '../../core/usecase/getAllEvent';
import { getAllInvitationFromEvent } from '../../core/usecase/getAllInvitation';
import { getEventbyId } from '../../core/usecase/getEventbyId';
import { getEventbyName } from '../../core/usecase/getEventbyName';
import { getInvitationbyId } from '../../core/usecase/getInvitationById';
import { ReadEvent } from '../../core/usecase/readEvent';
import { readInvitation } from '../../core/usecase/readInvitation';
import { InvitationRepository } from '../repository/prisma/invitation.repo';
import { PrismaService } from '../repository/prisma/prisma.service';
import { RepositoryEvent } from '../repository/prisma/event.repo';

@Module({
  controllers: [AppController],
  providers: [
    PrismaService,
    {
      provide: EventRepository,
      useFactory: (prisma: PrismaService) => new RepositoryEvent(prisma),
      inject: [PrismaService],
    },
    {
      provide: InvitationRepo,
      useFactory: (prisma: PrismaService) => new InvitationRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: createEvent,
      useFactory: (repository: EventRepository) => new createEvent(repository),
      inject: [EventRepository],
    },
    {
      provide: getAllEvents,
      useFactory: (repository: EventRepository) => new getAllEvents(repository),
      inject: [EventRepository],
    },
    {
      provide: getEventbyId,
      useFactory: (repository: EventRepository) => new getEventbyId(repository),
      inject: [EventRepository],
    },
    {
      provide: getEventbyName,
      useFactory: (repository: EventRepository) => new getEventbyName(repository),
      inject: [EventRepository],
    },
    {
      provide: ReadEvent,
      useFactory: (repository: EventRepository) => new ReadEvent(repository),
      inject: [EventRepository],
    },
    {
      provide: addInvitation,
      useFactory: (eventRepository: EventRepository, invitationRepository: InvitationRepo) => new addInvitation(eventRepository, invitationRepository),
      inject: [EventRepository, InvitationRepo],
    },
    {
      provide: createInvitation,
      useFactory: (repository: EventRepository) => new createInvitation(repository),
      inject: [EventRepository],
    },
    {
      provide: buyInvitation,
      useFactory: (repository: EventRepository) => new buyInvitation(repository),
      inject: [EventRepository],
    },
    {
      provide: cancelInvitation,
      useFactory: (repository: EventRepository) => new cancelInvitation(repository),
      inject: [EventRepository],
    },
    {
      provide: getInvitationbyId,
      useFactory: (repository: InvitationRepo, eventRepo: EventRepository) => new getInvitationbyId(repository, eventRepo),
      inject: [InvitationRepo, EventRepository],
    },
    {
      provide: getAllInvitationFromEvent,
      useFactory: (repository: InvitationRepo) =>
        new getAllInvitationFromEvent(repository),
      inject: [InvitationRepo],
    },
    {
      provide: readInvitation,
      useFactory: (invitationRepository: InvitationRepo, eventRepository: EventRepository) =>
        new readInvitation(invitationRepository, eventRepository),
      inject: [InvitationRepo, EventRepository],
    },
    {
      provide: eventService,
      useFactory: (
        createEventUseCase: createEvent,
        getAllEventsUseCase: getAllEvents,
        getEventByIdUseCase: getEventbyId,
      ) => new eventService(createEventUseCase, getAllEventsUseCase, getEventByIdUseCase),
      inject: [createEvent, getAllEvents, getEventbyId],
    },
    {
      provide: invitationService,
      useFactory: (
        createInvitationUseCase: addInvitation,
        readInvitationUseCase: getInvitationbyId,
        buyInvitationUseCase: buyInvitation,
        cancelInvitationUseCase: cancelInvitation,
        getAllInvitationUseCase: getAllInvitationFromEvent,
      ) =>
        new invitationService(
          createInvitationUseCase,
          readInvitationUseCase,
          buyInvitationUseCase,
          cancelInvitationUseCase,
          getAllInvitationUseCase,
        ),
      inject: [
        addInvitation,
        getInvitationbyId,
        buyInvitation,
        cancelInvitation,
        getAllInvitationFromEvent,
      ],
    },
  ],
})
export class AppModule {}
