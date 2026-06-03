import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkLogDto } from './dto/create-work-log.dto';

@Injectable()
export class WorkLogsService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll() {
        return this.prisma.workLog.findMany({
            include: {
                workType: true,
            },
            orderBy: {
                date: 'desc',
            },
        });
    }

    async create(dto: CreateWorkLogDto) {
        return this.prisma.workLog.create({
            data: {
                date: new Date(dto.date),
                workTypeId: dto.workTypeId,
                volume: dto.volume,
                unit: dto.unit,
                performerName: dto.performerName,
            },
            include: {
                workType: true,
            },
        });
    }

    async update(id: number, dto: CreateWorkLogDto) {
        const log = await this.prisma.workLog.findUnique({ where: { id } });
        if (!log) {
            throw new NotFoundException(
                `Запись в журнале с ID ${id} не найдена`,
            );
        }

        return this.prisma.workLog.update({
            where: { id },
            data: {
                date: new Date(dto.date),
                workTypeId: dto.workTypeId,
                volume: dto.volume,
                unit: dto.unit,
                performerName: dto.performerName,
            },
            include: {
                workType: true,
            },
        });
    }

    async remove(id: number) {
        const log = await this.prisma.workLog.findUnique({ where: { id } });
        if (!log) {
            throw new NotFoundException(
                `Запись в журнале с ID ${id} не найдена`,
            );
        }

        await this.prisma.workLog.delete({ where: { id } });
    }
}
