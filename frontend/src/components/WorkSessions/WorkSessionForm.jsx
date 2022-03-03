import { Box, Button, Grid, Group, TextInput, Title } from '@mantine/core'
import React, { useState } from 'react'
import ClientSelect from '../Clients/ClientSelect'
import TimePicker from '../TimePicker/TimePicker';
import { useForm } from '@mantine/hooks'


function WorkSessionForm() {
    const form = useForm({
        initialValues: {
            startTime: '09:30',
            endTime: '10:30'
        }
    })
    return (
        <Box>
            <Title order={4} mb="sm">Nový záznam</Title>
            <Grid>
                <Grid.Col sm={12} md={6} lg={3}>
                    <ClientSelect />
                </Grid.Col>
                <Grid.Col sm={12} md={6} lg={3}>
                    <ClientSelect />
                </Grid.Col>
                <Grid.Col sm={12} md={6} lg={3}>
                    <Group style={{alignItems: 'center'}} grow>
                        <TimePicker
                            label="Začátek"
                            time={form.values.startTime}
                            onChange={(time) => form.setFieldValue('startTime', time)}
                        />
                        <Box style={{marginTop: 20, width: 20}}> - </Box>
                        <TimePicker
                            label="Konec"
                            time={form.values.endTime}
                            onChange={(time) => form.setFieldValue('endTime', time)}
                        />
                    </Group>
                </Grid.Col>
                <Grid.Col sm={12} md={6} lg={3}>
                    <TextInput
                        label="Odpracovaná doba"
                        type="time"
                    />
                </Grid.Col>
                <Grid.Col sm={12}>
                    <Button>
                        Uložit záznam
                    </Button>
                </Grid.Col>
            </Grid>
        </Box>
    )
}

export default WorkSessionForm