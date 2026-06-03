import Button from 'antd/es/button';
import Space from 'antd/es/space';
import Table from 'antd/es/table';
import type { ColumnsType } from 'antd/es/table'; // Импортируем тип для колонок
import { useWorkLogs } from 'src/entities/work-log/api';
import { useWorkTypes } from 'src/entities/work-type/api';
import { EditOutlined } from '@ant-design/icons';
import type { WorkLog } from 'src/entities/work-log/model/types';
import type { FC } from 'react';
import { DeleteButton } from 'src/features/ui/delete-button';

interface WorkLogsTableProps {
    onEdit: (workLog: WorkLog) => void;
}

export const WorkLogsTable: FC<WorkLogsTableProps> = ({ onEdit }) => {
    const { data: logs = [], isLoading: isLogsLoading } = useWorkLogs();
    const { data: workTypes = [] } = useWorkTypes();

    const columns: ColumnsType<WorkLog> = [
        {
            title: 'Дата',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) =>
                new Date(a.date).getTime() - new Date(b.date).getTime(),
            render: (value: string) => {
                if (!value) return '-';
                const dateObj = new Date(value);
                if (isNaN(dateObj.getTime())) return value;
                return new Intl.DateTimeFormat('ru-RU').format(dateObj);
            },
        },
        {
            title: 'Вид работы',
            dataIndex: ['workType', 'name'],
            key: 'workType',
            filters: workTypes.map((t) => ({ text: t.name, value: t.id })),
            onFilter: (value, record) => record.workTypeId === value,
        },
        {
            title: 'Объем',
            dataIndex: 'volume',
            key: 'volume',
            render: (text: number, record) => `${text} ${record.unit}`,
        },
        {
            title: 'Исполнитель (Бригадир)',
            dataIndex: 'performerName',
            key: 'performerName',
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (_: unknown, record) => (
                <Space size='middle'>
                    <Button
                        type='link'
                        icon={<EditOutlined />}
                        onClick={() => onEdit(record)}
                    >
                        Редактировать
                    </Button>
                    <DeleteButton logId={record.id} />
                </Space>
            ),
        },
    ];

    return (
        <Table
            dataSource={logs}
            columns={columns}
            rowKey='id'
            loading={isLogsLoading}
            bordered
            scroll={{ x: 'max-content' }}
        />
    );
};
