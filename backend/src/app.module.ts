import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { WorkTypesService } from './work-types/work-types.service';
import { WorkTypesController } from './work-types/work-types.controller';
import { WorkTypesModule } from './work-types/work-types.module';
import { WorkLogsService } from './work-logs/work-logs.service';
import { WorkLogsController } from './work-logs/work-logs.controller';
import { WorkLogsModule } from './work-logs/work-logs.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        PrismaModule,
        WorkTypesModule,
        WorkLogsModule,
    ],
    controllers: [WorkTypesController, WorkLogsController],
    providers: [PrismaService, WorkTypesService, WorkLogsService],
})
export class AppModule {}
