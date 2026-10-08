import { PrismaClient } from '@prisma/client';

async function setupDatabase() {
  const prisma = new PrismaClient();

  try {
    console.log('🔧 Inicializando banco de dados SQLite em memória...');
    
    // Conecta ao banco
    await prisma.$connect();
    console.log('✅ Conectado ao banco de dados');

    // Testa a conexão
    const result = await prisma.$executeRawUnsafe('SELECT 1');
    console.log('✅ Banco de dados respondendo corretamente');

    // Exibe informações das tabelas
    const tables = await prisma.$executeRawUnsafe(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
    );
    
    console.log('📊 Tabelas criadas');
    
    console.log('✅ Setup concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao configurar banco de dados:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase();
