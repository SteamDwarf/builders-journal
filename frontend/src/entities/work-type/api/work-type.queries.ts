import { useQuery } from '@tanstack/react-query';
import { apiInstance } from 'src/shared/api/base';
import type { WorkType } from '../model/types';

export const useWorkTypes = () => {
    return useQuery({
        queryKey: ['work-types'],
        queryFn: async () => {
            const { data } = await apiInstance.get<WorkType[]>('/work-types');
            return data;
        },
    });
};
