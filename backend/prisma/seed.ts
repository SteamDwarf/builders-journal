import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma/client';

const adapter = new PrismaMariaDb({
    host: 'db',
    port: 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 1,
});

const prisma = new PrismaClient({ adapter });

async function main() {
    const defaultTypes = [
        'Кладка перегородок',
        'Монтаж опалубки',
        'Армирование',
        'Бетонирование',
        'Штукатурные работы',
    ];

    console.log('Начало заполнения справочника видов работ...');

    for (const name of defaultTypes) {
        await prisma.workType.upsert({
            where: { name },
            update: {},
            create: { name },
        });
    }

    console.log('Справочник успешно заполнен!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
