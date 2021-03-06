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
            title: '??sp??ch',
            message: 'Z??kazn??k byl ??sp????n?? ulo??en',
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
                Zp??t na p??ehled
            </Button>
            <form onSubmit={form.onSubmit(saveClient)}>
                <Title order={3} mb="sm">{form.values.name ? `Z??kazn??k - ${form.values.name}` : 'Nov?? z??kazn??k'}</Title>
                <Grid>
                    <Grid.Col sm={12} md={6}>
                        <TextInput
                            name="name"
                            label="N??zev"
                            placeholder="N??zev z??kazn??ka"
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
                            label="V??choz?? hodinov?? sazba"
                            placeholder="V??choz?? hodinov?? sazba projekt??"
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
                            placeholder="E-mail z??kazn??ka"
                            {...form.getInputProps('email')}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={6}>
                        <TextInput
                            name="phone"
                            label="Telefon"
                            placeholder="Telefon z??kazn??ka"
                            {...form.getInputProps('phone')}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={4}>
                        <TextInput
                            name="city"
                            label="M??sto"
                            placeholder="M??sto z??kazn??ka"
                            {...form.getInputProps('city')}
                        />                    </Grid.Col>

                    <Grid.Col sm={12} md={4}>
                        <TextInput
                            name="street"
                            label="Ulice a ??.p."
                            placeholder="Ulice a ??.p. z??kazn??ka"
                            {...form.getInputProps('street')}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} md={4}>
                        <TextInput
                            name="zipCode"
                            label="PS??"
                            placeholder="PS?? z??kazn??ka"
                            {...form.getInputProps('zipCode')}
                        />
                    </Grid.Col>
                    <Grid.Col sm={12} style={{textAlign: 'center'}}>
                        <Button type="submit">Ulo??it z??kazn??ka</Button>
                    </Grid.Col>
                </Grid>
            </form>
        </Box>
    )
}

export default ClientForm