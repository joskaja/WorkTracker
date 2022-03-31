import { Box, Button, Grid, Group, TextInput, Title } from '@mantine/core'
import React, { useState } from 'react'
import ClientSelect from '../Clients/ClientSelect'
import TimePicker from '../TimePicker/TimePicker';
import { useForm } from '@mantine/hooks'
import TimeRangePicker from '../TimePicker/TimeRangePicker';
import ProjectSelect from '../Projects/ProjectSelect';
import { useSelector } from 'react-redux';
import moment from 'moment';

function WorkSessionForm() {
    const { date } = useSelector(state => state.date);

    const form = useForm({
        initialValues: {
            startTime: moment().subtract(1, 'hour').startOf('hour').format('HH:mm'),
            endTime: moment().startOf('hour').format('HH:mm'),
        }
    })

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = {
            ...form.values,
            start: moment(`${date} ${form.values.startTime}`, 'DD.MM.YYYY HH:mm').toDate(),
            end: moment(`${date} ${form.values.endTime}`, 'DD.MM.YYYY HH:mm').toDate()
        };
        console.log(formData);
    }

    return (
        <Box>
            <Title order={4} mb="sm">Nový záznam</Title>
            <form onSubmit={onSubmit}>
                <Grid>
                    <Grid.Col sm={12} md={6} lg={3}>
                        <ProjectSelect
                            {...form.getInputProps('project')}
                            client={form.values.client}
                            onChange={project => {
                                form.setFieldValue('project', project?._id);
                                form.setFieldValue('client', project?.client?._id);
                            }}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={6} lg={3}>
                        <ClientSelect
                            {...form.getInputProps('client')}
                            onChange={client => {
                                form.setFieldValue('client', client?._id);
                            }}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={12} lg={6}>
                        <TimeRangePicker
                            startTime={form.values.startTime}
                            endTime={form.values.endTime}
                            setTime={form.setFieldValue}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} align="center" justify="center">
                        <Button type="submit">
                            Uložit záznam
                        </Button>
                    </Grid.Col>
                </Grid>
            </form>
        </Box>
    )
}

export default WorkSessionForm