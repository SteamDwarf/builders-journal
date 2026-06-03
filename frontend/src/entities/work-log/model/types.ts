import type { WorkType } from 'src/entities/work-type/model/types';

export interface WorkLog {
    id: number;
    date: string;
    workTypeId: number;
    volume: number;
    unit: string;
    performerName: string;
    workType: WorkType;
}

export interface CreateWorkLogDto {
    date: string;
    workTypeId: number;
    volume: number;
    unit: string;
    performerName: string;
}
