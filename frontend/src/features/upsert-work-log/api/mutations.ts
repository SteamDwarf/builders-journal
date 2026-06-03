import { useMutation, useQueryClient } from '@tanstack/react-query';
import message from 'antd/es/message';
import type { CreateWorkLogDto } from 'src/entities/work-log/model/types';
import { apiInstance } from 'src/shared/api/base';

export const useCreateWorkLogs = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newLog: CreateWorkLogDto) =>
            apiInstance.post(`/work-logs`, newLog),
        onSuccess: () => {
            message.success('Запись успешно добавлена');
            queryClient.invalidateQueries({ queryKey: ['work-logs'] });
        },
        onError: () => message.error('Ошибка при создании записи'),
    });
};

export const useUpdateWorkLogs = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: CreateWorkLogDto }) =>
            apiInstance.put(`/work-logs/${id}`, data),
        onSuccess: () => {
            message.success('Запись успешно обновлена');
            queryClient.invalidateQueries({ queryKey: ['work-logs'] });
        },
        onError: () => message.error('Ошибка при обновлении записи'),
    });
};
