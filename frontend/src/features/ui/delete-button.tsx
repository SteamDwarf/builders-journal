import { type FC } from 'react';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteWorkLogs } from '../delete-work-log/api/mutations';

interface DeleteButtonProps {
    logId: number;
}

export const DeleteButton: FC<DeleteButtonProps> = ({ logId }) => {
    const { mutate, isPending } = useDeleteWorkLogs();

    return (
        <Popconfirm
            title='Удалить эту запись?'
            onConfirm={() => mutate(logId)}
            okText='Да'
            cancelText='Нет'
        >
            <Button
                type='link'
                danger
                icon={<DeleteOutlined />}
                loading={isPending}
            >
                Удалить
            </Button>
        </Popconfirm>
    );
};
