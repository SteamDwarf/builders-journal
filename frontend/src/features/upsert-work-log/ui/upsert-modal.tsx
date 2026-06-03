import Form from 'antd/es/form';
import React, { useEffect } from 'react';
import type {
    CreateWorkLogDto,
    WorkLog,
} from 'src/entities/work-log/model/types';
import { useWorkTypes } from 'src/entities/work-type/api';
import { useCreateWorkLogs, useUpdateWorkLogs } from '../api/mutations';
import Input from 'antd/es/input';
import InputNumber from 'antd/es/input-number';
import Modal from 'antd/es/modal';
import Select from 'antd/es/select';
import Row from 'antd/es/row';
import Col from 'antd/es/col';

interface UpsertWorkLogModalProps {
    isOpen: boolean;
    onClose: () => void;
    editingLog: WorkLog | null;
}

interface FormValues {
    date: string;
    workTypeId: number;
    volume: number | null;
    unit: string;
    performerName: string;
}

export const UpsertWorkLogModal: React.FC<UpsertWorkLogModalProps> = ({
    isOpen,
    onClose,
    editingLog,
}) => {
    const [form] = Form.useForm<FormValues>();
    const { data: workTypes = [] } = useWorkTypes();

    const createMutation = useCreateWorkLogs();
    const updateMutation = useUpdateWorkLogs();

    const isPending = createMutation.isPending || updateMutation.isPending;

    useEffect(() => {
        if (isOpen) {
            if (editingLog) {
                const formattedDate = editingLog.date
                    ? new Date(editingLog.date).toISOString().split('T')[0]
                    : '';

                form.setFieldsValue({
                    date: formattedDate,
                    workTypeId: editingLog.workTypeId,
                    volume: editingLog.volume,
                    unit: editingLog.unit,
                    performerName: editingLog.performerName,
                });
            } else {
                form.resetFields();
            }
        }
    }, [editingLog, isOpen, form]);

    const handleFinish = (values: FormValues) => {
        const formattedPayload: CreateWorkLogDto = {
            ...values,
            volume: Number(values.volume ?? 0),
        };

        if (editingLog) {
            updateMutation.mutate(
                { id: editingLog.id, data: formattedPayload },
                { onSuccess: () => onClose() },
            );
        } else {
            createMutation.mutate(formattedPayload, {
                onSuccess: () => onClose(),
            });
        }
    };

    return (
        <Modal
            title={
                editingLog ? 'Редактировать запись' : 'Добавить новую запись'
            }
            open={isOpen}
            onOk={() => form.submit()}
            onCancel={onClose}
            confirmLoading={isPending}
            destroyOnHidden
            width={520}
            style={{ maxWidth: '100%', padding: '0 8px' }}
        >
            <Form form={form} layout='vertical' onFinish={handleFinish}>
                <Form.Item
                    name='date'
                    label='Дата выполнения'
                    rules={[
                        { required: true, message: 'Пожалуйста, выбери дату' },
                    ]}
                >
                    <Input type='date' />
                </Form.Item>

                <Form.Item
                    name='workTypeId'
                    label='Вид работы'
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, выбери вид работы',
                        },
                    ]}
                >
                    <Select
                        placeholder='Выбери тип работы из справочника'
                        options={workTypes.map((t) => ({
                            value: t.id,
                            label: t.name,
                        }))}
                    />
                </Form.Item>

                <Row gutter={[12, 0]}>
                    <Col xs={24} sm={16}>
                        <Form.Item
                            name='volume'
                            label='Объем'
                            rules={[{ required: true, message: 'Укажи объем' }]}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={0.01}
                                placeholder='Например: 24'
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={8}>
                        <Form.Item
                            name='unit'
                            label='Ед. изм.'
                            rules={[
                                { required: true, message: 'Выбери ед. изм.' },
                            ]}
                        >
                            <Select
                                placeholder='м³'
                                options={[
                                    { value: 'м³', label: 'м³' },
                                    { value: 'м²', label: 'м²' },
                                    { value: 'т', label: 'т' },
                                    { value: 'шт', label: 'шт' },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name='performerName'
                    label='ФИО исполнителя (бригадира)'
                    rules={[
                        { required: true, message: 'Введи ФИО исполнителя' },
                    ]}
                >
                    <Input placeholder='Иванов И. И.' />
                </Form.Item>
            </Form>
        </Modal>
    );
};
