import { useMutation, useQueryClient } from '@tanstack/react-query';
import message from 'antd/es/message';
import { apiInstance } from 'src/shared/api/base';

export const useDeleteWorkLogs = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (logId: number) =>
            apiInstance.delete(`/work-logs/${logId}`),
        onSuccess: () => {
            message.success('Запись удалена');
            queryClient.invalidateQueries({ queryKey: ['work-logs'] });
        },
        onError: () => message.error('Не удалось удалить запись'),
    });
};
