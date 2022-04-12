import React, { useEffect, useState } from 'react';
import { TextInput, PasswordInput, Alert, Button } from '@mantine/core';
import { MdCancel } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { useNotifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../../features/Auth/authSlice';
import { useForm } from '@mantine/form';

function RegisterForm() {
    const notifications = useNotifications();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const form = useForm({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: ''
        },
        validate: {
            email: (value) => (!/^\S+@\S+$/.test(value) ? 'Neplatná e-mailová adresa' : null),
            firstName: (value) => (value.length < 2 ? 'Jméno musí mít alespoň 2 znaky' : null),
            lastName: (value) => (value.length < 2 ? 'Příjmení musí mít alespoň 2 znaky' : null),
            password: (value) => (value.length < 5 ? 'Heslo musí mít alespoň 5 znaků' : null),
            confirmPassword: (value, values) => (value !== values.password ? 'Hesla se neshodují' : null),
        }
    })
    const { user, status, message } = useSelector((state) => state.auth);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (status === 'error') {
            setErrorMessage(message || 'Chyba registrace');
        }

        if (status === 'success') {
            notifications.showNotification({
                title: 'Úspěch',
                autoClose: 4000,
                message: 'Registrace proběhla úspěšně'
            });
        }

        if (user) {
            navigate('/dashboard', { replace: true });
        }

        dispatch(reset())

    }, [user, status, message]);

    const submitRegister = (values) => {
        if (form.validate()) {
            dispatch(register(values))
        }
    }

    return (
        <form onSubmit={form.onSubmit(submitRegister)}>
            {(errorMessage.length > 0) && (
                <Alert icon={<MdCancel size={16} />} title="Chyba" color="red" my="md">
                    {errorMessage}
                </Alert>
            )}
            <TextInput
                name="email"
                label="E-mail"
                placeholder="Vaš e-mail"
                required
                mb="xs"
                {...form.getInputProps('email')}
            />
            <TextInput
                name="firstName"
                label="Jméno"
                placeholder="Vaše jméno"
                required
                mb="xs"
                {...form.getInputProps('firstName')}
            />
            <TextInput
                name="lastName"
                label="Příjmení"
                placeholder="Vaše příjmení"
                required
                mb="xs"
                {...form.getInputProps('lastName')}
            />
            <PasswordInput
                name="password"
                label="Heslo"
                placeholder="Zadejte heslo"
                required
                mb="xs"
                {...form.getInputProps('password')}
            />
            <PasswordInput
                name="passwordAgain"
                label="Heslo znovu"
                placeholder="Zadejte stejné heslo znovu"
                required
                mb="lg"
                {...form.getInputProps('confirmPassword')}
            />
            <Button
                type="submit"
                variant="filled"
                fullWidth
                loading={status === 'loading'}
            >
                Zaregistrovat se
            </Button>
        </form>
    )
}

export default RegisterForm