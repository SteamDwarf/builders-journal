import { Controller, Get } from '@nestjs/common';
import { WorkTypesService } from './work-types.service';

@Controller('api/work-types')
export class WorkTypesController {
    constructor(private readonly workTypesService: WorkTypesService) {}

    @Get()
    async getAll() {
        return this.workTypesService.findAll();
    }
}
