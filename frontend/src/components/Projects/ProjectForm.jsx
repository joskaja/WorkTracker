import { Box, Button, Grid, LoadingOverlay, NumberInput, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/hooks'
import { Link, useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { MdArrowBack, MdCheckCircle, MdError } from 'react-icons/md'
import { apiRequestService } from '../../services/apiRequestService'
import { useNotifications } from '@mantine/notifications'
import ClientSelect from '../Clients/ClientSelect'


function ProjectForm() {
    const notifications = useNotifications();
    const navigate = useNavigate();
    const { projectID } = useParams();
    const [loading, setLoading] = useState(false);
    const form = useForm({
        initialValues: {
            name: '',
            hourRate: 0,
            client: ''
        },
        validationRules: {
            name: (value) => value.length > 3,
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (projectID) {
                const project = await apiRequestService.get('/api/projects/' + projectID);
                form.setValues(project);
            }
            setLoading(false);
        }
        fetchData();
    }, [projectID]);

    const saveProject = (formData) => {
        setLoading(true);
        let request;
        if (projectID) {
            request = apiRequestService.put('/api/projects/' + projectID, formData);
        } else {
            request = apiRequestService.post('/api/projects', formData);
        }
        request.then((data) => {
            onProjectSaved();
        }).catch(e => {
            notifications.showNotification({
                title: 'Chyba!',
                message: e,
                color: 'red',
                icon: <MdError />
            })
        })
    }

    const onProjectSaved = () => {
        setLoading(false);
        notifications.showNotification({
            title: 'Úspěch',
            message: 'Projekt byl úspěšně uložen',
            color: 'green',
            icon: <MdCheckCircle />
        });
        navigate('/projects');
    }
    return (
        <Box>
            <LoadingOverlay visible={loading} />
            <Button
                mb="xl"
                component={Link}
                to="/projects"
                variant="subtle"
                leftIcon={<MdArrowBack />}
            >
                Zpět na přehled
            </Button>
            <form onSubmit={form.onSubmit(saveProject)}>
                <Title order={3} mb="sm">{form.values.name ? `Projekt - ${form.values.name}` : 'Nový projekt'}</Title>
                <Grid>
                    <Grid.Col sm={12} md={6}>
                        <TextInput
                            name="name"
                            label="Název"
                            placeholder="Název projektu"
                            autoComplete={false}
                            {...form.getInputProps('name')}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={6}>
                        <ClientSelect
                            value={form.values.client}
                            autoComplete={false}
                            name="client"
                            form={form}
                            onChange={(client) => {
                                form.setFieldValue('client', client?._id || '');
                                form.setFieldValue('hourRate', client?.defaultHourRate || 0);
                            }}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={6}>
                        <NumberInput
                            name="hourRate"
                            label="Hodinová sazba"
                            placeholder="Hodinová sazba projektu"
                            {...form.getInputProps('hourRate')}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} style={{textAlign: 'center'}}>
                        <Button type="submit">Uložit projekt</Button>
                    </Grid.Col>
                </Grid>
            </form>
        </Box>
    )
}

export default ProjectForm