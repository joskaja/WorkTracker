import { Button, Center, PasswordInput, Title } from '@mantine/core'
import { IoCheckmarkCircleSharp, IoCloseCircleSharp } from 'react-icons/io5'
import { useForm } from '@mantine/form'
import { useNotifications } from '@mantine/notifications';
import React from 'react'
import { apiRequestService } from '../../services/apiRequestService';

function PasswordChangeForm() {
    const notifications = useNotifications();
    const form = useForm({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: ''
        }
    });

    const changePassword = (values) => {
        if (form.validate()) {
            apiRequestService.post('/api/users/password', values).then(data => {
                notifications.showNotification({
                    title: 'Úspěch',
                    autoClose: 4000,
                    color: 'green',
                    icon: <IoCheckmarkCircleSharp />,
                    message: data.message
                });
            }).catch(e => {
                notifications.showNotification({
                    title: 'Chyba',
                    autoClose: 4000,
                    color: 'red',
                    icon: <IoCloseCircleSharp />,
                    message: e
                });
            })
        }
    }
    return (
        <form onSubmit={form.onSubmit(changePassword)}>
            <Title order={4}>Změna hesla</Title>
            <PasswordInput
                name="oldPassword"
                label="Staré heslo"
                placeholder="Zadejte heslo"
                required
                mb="xs"
                {...form.getInputProps('oldPassword')}
            />
            <PasswordInput
                name="newPassword"
                label="Nové heslo"
                placeholder="Zadejte heslo"
                required
                mb="xs"
                {...form.getInputProps('newPassword')}
            />
            <PasswordInput
                name="newPasswordConfirm"
                label="Nové heslo znovu"
                placeholder="Zadejte stejné heslo znovu"
                required
                mb="lg"
                {...form.getInputProps('newPasswordConfirm')}
            />
            <Center>
                <Button
                    type="submit"
                    variant="filled"
                >
                    Změnit heslo
                </Button>
            </Center>
        </form>
    )
}

export default PasswordChangeForm