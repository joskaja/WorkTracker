import { Box, Button, ColorInput, Grid, Group, LoadingOverlay, NumberInput, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/hooks'
import { Link, useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { MdArrowBack, MdCheckCircle, MdError } from 'react-icons/md'
import { apiService } from '../../services/apiService'
import { useNotifications } from '@mantine/notifications'
import { colors } from '../../utils/colors'

function ClientForm() {
    const notifications = useNotifications();
    const navigate = useNavigate();
    const { clientID } = useParams();
    const [loading, setLoading] = useState(false);
    const form = useForm({
        initialValues: {
            name: '',
            defaultHourRate: 0,
            email: '',
            phone: '',
            color: colors.randomColor(),
            street: '',
            city: '',
            zipCode: ''
        },
        validationRules: {
            name: (value) => value.length > 3,
            email: (value) => /^\S+@\S+$/.test(value),
        }
    });

    useEffect(() => {
        if (clientID) {
            setLoading(true);
            apiService.get('/api/clients/' + clientID).then(data => {
                form.setValues({ ...data, ...data.address });
                setLoading(false);
            })
        }
    }, [clientID]);

    const saveClient = (formData) => {
        setLoading(true);
        let request;
        if (clientID) {
            request = apiService.put('/api/clients/' + clientID, formData);
        } else {
            request = apiService.post('/api/clients', formData);
        }
        request.then((data) => {
            onClientSaved();
        }).catch(e => {
            notifications.showNotification({
                title: 'Chyba!',
                message: e,
                color: 'red',
                icon: <MdError />
            })
        })
    }

    const onClientSaved = () => {
        setLoading(false);
        notifications.showNotification({
            title: 'Úspěch',
            message: 'Zákazník byl úspěšně uložen',
            color: 'green',
            icon: <MdCheckCircle />
        });
        navigate('/clients');
    }
    return (
        <Box>
            <LoadingOverlay visible={loading} />
            <Button
                compact
                mb="xl"
                component={Link}
                to="/clients"
                variant="subtle"
                leftIcon={<MdArrowBack />}
            >
                Zpět na přehled
            </Button>
            <form onSubmit={form.onSubmit(saveClient)}>
                <Title order={3} mb="sm">{form.values.name ? `Zákazník - ${form.values.name}` : 'Nový zákazník'}</Title>
                <Grid>
                    <Grid.Col sm={12} md={6}>
                        <TextInput
                            name="name"
                            label="Název"
                            placeholder="Název zákazníka"
                            {...form.getInputProps('name')}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={6}>
                        <ColorInput
                            name="color"
                            label="Barva"
                            placeholder="Vyberte barvu"
                            {...form.getInputProps('color')}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={6}>
                        <NumberInput
                            name="defaultHourRate"
                            label="Výchozí hodinová sazba"
                            placeholder="Výchozí hodinová sazba projektů"
                            {...form.getInputProps('defaultHourRate')}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} >
                        <Title order={4} mt="sm">Kontakty</Title>
                    </Grid.Col>
                    <Grid.Col sm={12} md={6}>
                        <TextInput
                            name="email"
                            label="E-mail"
                            placeholder="E-mail zákazníka"
                            {...form.getInputProps('email')}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={6}>
                        <TextInput
                            name="phone"
                            label="Telefon"
                            placeholder="Telefon zákazníka"
                            {...form.getInputProps('phone')}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={4}>
                        <TextInput
                            name="city"
                            label="Město"
                            placeholder="Město zákazníka"
                            {...form.getInputProps('city')}
                        />                    </Grid.Col>

                    <Grid.Col sm={12} md={4}>
                        <TextInput
                            name="street"
                            label="Ulice a č.p."
                            placeholder="Ulice a č.p. zákazníka"
                            {...form.getInputProps('street')}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={4}>
                        <TextInput
                            name="zipCode"
                            label="PSČ"
                            placeholder="PSČ zákazníka"
                            {...form.getInputProps('zipCode')}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} style={{textAlign: 'center'}}>
                        <Button type="submit">Uložit zákazníka</Button>
                    </Grid.Col>
                </Grid>
            </form>
        </Box>
    )
}

export default ClientForm