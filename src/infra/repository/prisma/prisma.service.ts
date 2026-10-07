import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    // Conecta ao banco de dados SQLite em memória
    await this.$connect();
    // Sincroniza o schema (cria tabelas se não existirem)
    await this.$executeRawUnsafe('SELECT 1');
  }

  async onModuleDestroy() {
    // Desconecta do banco de dados
    await this.$disconnect();
  }
}
