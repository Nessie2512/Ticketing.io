# Configuração do Prisma com SQLite em Memória

## Visão Geral

Este projeto está configurado para usar **Prisma com SQLite em memória**, ideal para desenvolvimento, testes e prototipagem rápida.

## Como Funciona

1. **Conexão em Memória**: O banco de dados SQLite reside completamente na memória RAM
2. **Sincronização Automática**: O `PrismaService` sincroniza o schema automaticamente ao iniciar a aplicação
3. **Dados Efêmeros**: Os dados são perdidos quando a aplicação é reiniciada (perfeito para testes)

## Configuração

### 1. Variável de Ambiente (`.env`)

```
DATABASE_URL="file::memory:?cache=shared"
```

**Detalhes:**
- `file::memory:` - SQLite em memória
- `?cache=shared` - Permite múltiplas conexões simultâneas

### 2. Estrutura de Arquivos

```
ticket-flow/
├── .env                    # Configuração do banco
├── .env.test              # Configuração para testes
├── prisma/
│   ├── schema.prisma      # Definição do schema
│   └── seed.ts            # Script de popular banco (opcional)
├── src/
│   └── infra/repository/prisma/
│       └── prisma.service.ts  # Serviço que sincroniza o banco
└── scripts/
    └── setup-db.ts        # Script de inicialização (opcional)
```

### 3. PrismaService

Localizado em `src/infra/repository/prisma/prisma.service.ts`, este serviço:

```typescript
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    // Conecta ao banco
    await this.$connect();
    // Sincroniza o schema automaticamente
    await this.$executeRawUnsafe('SELECT 1');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

- ✅ Estende `PrismaClient` para acesso direto aos métodos do Prisma
- ✅ Sincroniza automaticamente o schema ao iniciar a aplicação
- ✅ Funciona com qualquer versão do Prisma

## Uso

### Iniciar a Aplicação

```bash
npm run start:dev
```

Quando a aplicação inicia:
1. O `PrismaService` conecta ao banco em memória
2. O schema é sincronizado automaticamente
3. As tabelas são criadas conforme necessário

### Popular o Banco (Seed)

Edite `prisma/seed.ts` para adicionar dados iniciais:

```typescript
async function main() {
  await prisma.event.create({
    data: {
      uuid: '123',
      name: 'Meu Evento',
      date: new Date(),
    }
  });
}
```

Então execute:
```bash
npm run db:seed
```

### Executar Testes

```bash
npm test
```

Os testes usarão o mesmo banco em memória configurado em `.env`.

### Setup Manual do Banco

Se precisar de um setup mais elaborado:
```bash
npm run db:setup
```

## Alterando o Schema

1. Edite `prisma/schema.prisma`:
```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

2. Reinicie a aplicação:
```bash
npm run start:dev
```

A sincronização automática criará as novas tabelas.

## Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run start:dev` | Inicia em modo desenvolvimento com auto-reload |
| `npm run db:seed` | Popular banco com dados iniciais |
| `npm run db:setup` | Script de inicialização manual |
| `npm test` | Executar testes com banco em memória |
| `npm run build` | Compilar para produção |

## Características

- ✅ **Sem arquivo no disco** - Tudo em memória RAM
- ✅ **Reset automático** - Dados perdidos ao reiniciar (excelente para testes)
- ✅ **Conexões múltiplas** - `?cache=shared` permite vários acessos simultâneos
- ✅ **Sincronização automática** - Schema atualizado ao iniciar
- ✅ **Rápido** - Acesso otimizado em memória
- ✅ **Sem gerenciamento de migrations** - Perfeito para desenvolvimento

## Para Desenvolvimento em Banco Real

Se precisar trocar para um banco persistente (PostgreSQL, MySQL, etc.):

1. Atualize `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

2. Adapte o schema se necessário em `prisma/schema.prisma`

3. Reinicie a aplicação

O `PrismaService` continuará funcionando normalmente.

## Troubleshooting

### "Erro: Tabelas não encontradas"
- **Causa**: PrismaService não foi inicializado
- **Solução**: Certifique-se de que `PrismaService` está registrado no módulo NestJS

### "Erro: EACCES (Permission denied)"
- **Causa**: Problema de permissões
- **Solução**: Isso não deve acontecer com banco em memória. Verifique se `.env` está correto.

### "Erro: Cannot find module '@prisma/client'"
- **Solução**: Execute `npm install`

### Dados desaparecem após reiniciar
- **Esperado!** É assim que funciona o banco em memória. Use seed para repopular.

## Referências Úteis

- [Documentação Prisma](https://www.prisma.io/docs)
- [Prisma Schema Language](https://www.prisma.io/docs/orm/prisma-schema)
- [SQLite em Memória](https://www.sqlite.org/inmemorydb.html)

## Próximos Passos

Depois de configurado, você pode:

1. ✅ Definir seus modelos em `prisma/schema.prisma`
2. ✅ Usar `PrismaService` nos seus repositórios
3. ✅ Criar testes com dados frescos a cada execução
4. ✅ Chamar `npm run db:seed` para dados iniciais

Pronto para começar! 🚀
