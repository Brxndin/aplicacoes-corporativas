import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log('Criando usuário inicial...');

    const administrador = await prisma.usuarios.create({
        data: {
            nome: 'Administrador',
            email: 'admin@ifrs.edu.br',
            tipo: 1,
            senha: '123456',
        },
    });

    console.log('Usuário criado: ', administrador);

    console.log('Seed concluído.');
}

main()
    .catch((error) => {
        console.error('Erro no seed: ', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
