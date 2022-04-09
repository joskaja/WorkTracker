import { Box, Button, Grid, TextInput } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import ClientSelect from '../Clients/ClientSelect'
import { useForm } from '@mantine/form'
import { useWindowScroll } from '@mantine/hooks'
import TimeRangePicker from '../TimePicker/TimeRangePicker';
import ProjectSelect from '../Projects/ProjectSelect';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { apiRequestService } from '../../services/apiRequestService';
import { useNotifications } from '@mantine/notifications';
import { IoCheckmarkCircleSharp, IoCloseCircleSharp, IoSave } from 'react-icons/io5'
import { createWorkSession, updateWorkSession, resetStatus, setDate } from '../../features/WorkSessions/workSessionsSlice';
import { useFocus } from '../../utils/hooks';


function WorkSessionForm({ sessionId, editWorkSession }) {
    const dispatch = useDispatch();
    const notifications = useNotifications();
    const [scroll, scrollTo] = useWindowScroll();
    const { date, status, message, workSessions } = useSelector(state => state.workSessions);
    const [loading, setLoading] = useState(false);
    const [descriptionInputRef, setDescriptionInputFocus] = useFocus();

    const form = useForm({
        initialValues: {
            description: '',
            project: '',
            client: '',
            startTime: moment().subtract(1, 'hour').startOf('hour').format('HH:mm'),
            endTime: moment().startOf('hour').format('HH:mm'),
        },
        validate: {
            description: (value => value.length < 3 ? 'Popisek je povinný a musí mít alespoň 3 znaky' : null)
        }
    });

    useEffect(() => {
        if (sessionId) {
            setLoading(true);
            apiRequestService.get('/api/work-sessions/' + sessionId).then(data => {
                const formData = {
                    ...data,
                    startTime: moment(data.startTime).format('HH:mm'),
                    endTime: moment(data.endTime).format('HH:mm')
                };
                form.setValues(formData);
                dispatch(setDate(moment(data.startTime).format('DD.MM.YYYY')));
                setLoading(false);
                scrollTo({ y: 0 });
                setDescriptionInputFocus();
            }).catch(e => {
                notifications.showNotification({
                    title: 'Chyba!',
                    message: 'Záznam se nepodařilo načíst',
                    color: 'red',
                    icon: <IoCloseCircleSharp />
                })
            });
        }
    }, [sessionId]);

    useEffect(() => {
        if (status === 'create_error' || status === 'update_error') {
            notifications.showNotification({
                title: 'Chyba!',
                message: message,
                color: 'red',
                icon: <IoCloseCircleSharp />
            })
        }
        if (status === 'create_success') {
            form.reset();
            notifications.showNotification({
                title: 'Úspěch',
                message: 'Záznam byl úspěšně vložen.',
                color: 'green',
                icon: <IoCheckmarkCircleSharp />
            });
        }
        console.log(status);
        if (status === 'update_success') {
            form.reset();
            notifications.showNotification({
                title: 'Úspěch',
                message: 'Záznam byl úspěšně upraven.',
                color: 'green',
                icon: <IoCheckmarkCircleSharp />
            });
        }
        dispatch(resetStatus());
    }, [status]);

    useEffect(() => {
        if (workSessions.length > 0) {
            const sortedWorkSessions = [...workSessions].sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime());
            const latestTime = moment(sortedWorkSessions[sortedWorkSessions.length - 1].endTime);
            if (latestTime.hour() < 23) {
                form.setValues({
                    startTime: latestTime.format('HH:mm'),
                    endTime: latestTime.add(1, 'hour').format('HH:mm')
                });
            }
        }
    }, [workSessions]);

    const saveWorkSession = (values) => {
        form.validate();
        let formData = { ...values };
        formData.startTime = moment(`${date} ${form.values.startTime}`, 'DD.MM.YYYY HH:mm').toDate();
        formData.endTime = moment(`${date} ${form.values.endTime}`, 'DD.MM.YYYY HH:mm').toDate();
        if (sessionId) {
            formData.id = sessionId;
            dispatch(updateWorkSession(formData));
            editWorkSession('');
        } else {
            dispatch(createWorkSession(formData));
        }
    }

    return (
        <Box>
            <form onSubmit={form.onSubmit(saveWorkSession)}>
                <Grid>
                    <Grid.Col sm={12} md={6} >
                        <TextInput
                            {...form.getInputProps('description')}
                            placeholder="Popisek"
                            label="Popisek"
                            ref={descriptionInputRef}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={6}>
                        <ProjectSelect
                            {...form.getInputProps('project')}
                            name="project"
                            form={form}
                            client={form.values.client}
                            onChange={project => {
                                form.setFieldValue('project', project?._id || '');
                                form.setFieldValue('client', project?.client?._id || '');
                            }}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={6}>
                        <ClientSelect
                            {...form.getInputProps('client')}
                            name="client"
                            form={form}
                            onChange={client => {
                                form.setFieldValue('client', client?._id || '');
                            }}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={6}>
                        <TimeRangePicker
                            startTime={form.values.startTime}
                            endTime={form.values.endTime}
                            setTime={form.setFieldValue}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} align="center" justify="center">
                        <Button
                            loading={loading}
                            leftIcon={<IoSave />}
                            type="submit"
                        >
                            Uložit záznam
                        </Button>
                    </Grid.Col>
                </Grid>
            </form>
        </Box>
    )
}

export default WorkSessionForm