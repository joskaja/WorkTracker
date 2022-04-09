import React, { useState, useEffect } from 'react'
import { TextInput, PasswordInput, Button, Alert } from '@mantine/core';
import { MdCancel } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '@mantine/notifications';
import { login, reset } from '../../features/Auth/authSlice';
import { useForm } from '@mantine/form';
function LoginForm() {
    const [errorMessage, setErrorMessage] = useState('');
    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            email: (value) => (!/^\S+@\S+$/.test(value) ? 'Neplatná e-mailová adresa' : null),
            password: (value) => (value.length < 5 ? 'Heslo musí mít alespoň 5 znaků' : null),
        }
    })
    const notifications = useNotifications();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, message, status } = useSelector((state) => state.auth);

    useEffect(() => {
        if (status === 'error') {
            setErrorMessage(message || 'Chyba přihlášení');
        }

        if (status === 'success') {
            notifications.showNotification({
                title: 'Úspěch',
                autoClose: 4000,
                message: 'Přihlášení proběhlo úspěšně'
            });
        }

        if (status === 'success' && user) {
            navigate('/dashboard', { replace: true });
        }

        dispatch(reset());

    }, [user, status, message]);

    const submitLogin = (values) => {
        if (form.validate()) {
            dispatch(login(values))
        }
    }
    return (
        <form onSubmit={form.onSubmit(submitLogin)}>
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
            <PasswordInput
                name="password"
                label="Heslo"
                placeholder="Zadejte heslo"
                required
                mb="lg"
                {...form.getInputProps('password')}
            />
            <Button
                type="submit"
                variant="filled"
                fullWidth
                loading={status === 'loading'}
            >
                Přihlásit se
            </Button>
        </form>
    )
}

export default LoginForm