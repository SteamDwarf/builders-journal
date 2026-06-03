import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { WorkLogsService } from './work-logs.service';
import { CreateWorkLogDto } from './dto/create-work-log.dto';

@Controller('api/work-logs')
export class WorkLogsController {
    constructor(private readonly workLogsService: WorkLogsService) {}

    @Get()
    async getAll() {
        return this.workLogsService.findAll();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateWorkLogDto) {
        return this.workLogsService.create(dto);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: CreateWorkLogDto,
    ) {
        return this.workLogsService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.workLogsService.remove(id);
    }
}
