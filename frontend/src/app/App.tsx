import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { WorkLog } from '../entities/work-log/model/types';
import { WorkLogsTable } from '../widgets/jobs-table/ui/jobs-table';
import { UpsertWorkLogModal } from '../features/upsert-work-log/ui/upsert-modal';

const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingLog, setEditingLog] = useState<WorkLog | null>(null);

    const handleOpenModal = (log: WorkLog | null = null) => {
        setEditingLog(log);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingLog(null);
    };

    return (
        <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '24px' }}>Журнал работ</h1>

            <Button
                type='primary'
                icon={<PlusOutlined />}
                onClick={() => handleOpenModal(null)}
                style={{ marginBottom: '16px' }}
            >
                Добавить запись
            </Button>

            <WorkLogsTable onEdit={handleOpenModal} />

            <UpsertWorkLogModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                editingLog={editingLog}
            />
        </div>
    );
};

export default App;
