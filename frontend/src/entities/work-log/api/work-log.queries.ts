import { useQuery } from '@tanstack/react-query';
import { apiInstance } from 'src/shared/api/base';
import type { WorkLog } from '../model/types';

export const useWorkLogs = () => {
    return useQuery({
        queryKey: ['work-logs'],
        queryFn: async () => {
            const { data } = await apiInstance.get<WorkLog[]>('/work-logs');
            return data;
        },
    });
};
