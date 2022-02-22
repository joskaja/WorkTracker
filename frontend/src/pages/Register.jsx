import React, { useEffect, useState } from 'react';
import { Center, Paper, Title, Group, TextInput, PasswordInput, Alert, Button, createStyles, useMantineTheme } from '@mantine/core';
import { MdPersonAddAlt, MdCancel } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { useNotifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/Auth/authSlice';
import Header from '../components/Header';

const useStyles = createStyles(theme => ({
    paper: {
        maxWidth: theme.breakpoints.xs,
        width: '100%'
    }
}));
function Register() {
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordAgain: ''
    });
    const { firstName, lastName, email, password, passwordAgain } = formData;

    const theme = useMantineTheme();
    const { classes } = useStyles();

    const notifications = useNotifications();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {

        if (isSuccess) {
            notifications.showNotification({
                title: 'Úspěch',
                autoClose: 4000,
                message: 'Přihlášení proběhlo úspěšně'
            });
        }

        if (isSuccess || user) {
            navigate('/', { replace: true });
        }


    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    const onSubmit = (e) => {
        e.preventDefault();
        if (password && password !== passwordAgain) {
            alert('chyba');
        } else {
            dispatch(register(formData))
        }
    }

    return (
        <>
            <Header height={60} padding="xs" />
            <Center style={{ minHeight: 'calc(100vh - 60px)' }}>
                <Paper padding="lg" shadow="sm" radius="md"
                    className={classes.paper}
                >
                    <Group align="center" position="center">
                        <MdPersonAddAlt size={50} color={theme.colors[theme.primaryColor][4]} />
                        <Title>Vytvořit účet</Title>
                    </Group>
                    {(errorMessage.length > 0) && (
                        <Alert icon={<MdCancel size={16} />} title="Chyba" color="red" my="md">
                            {errorMessage}
                        </Alert>
                    )}
                    <form onSubmit={onSubmit}>
                        <TextInput
                            name="email"
                            value={email}
                            onChange={onChange}
                            type="email"
                            label="E-mail"
                            placeholder="Vaš e-mail"
                            required
                            mb="xs"
                        />
                        <TextInput
                            name="firstName"
                            value={firstName}
                            onChange={onChange}
                            label="Křestní jméno"
                            placeholder="Vaše křestní jméno"
                            required
                            mb="xs"
                        />
                        <TextInput
                            name="lastName"
                            value={lastName}
                            onChange={onChange}
                            label="Příjmení"
                            placeholder="Vaše příjmení"
                            required
                            mb="xs"
                        />
                        <PasswordInput
                            name="password"
                            value={password}
                            onChange={onChange}
                            label="Heslo"
                            placeholder="Zadejte heslo"
                            required
                            mb="xs"
                        />
                        <PasswordInput
                            name="passwordAgain"
                            value={passwordAgain}
                            onChange={onChange}
                            label="Heslo znovu"
                            placeholder="Zadejte stejné heslo znovu"
                            required
                            mb="lg"
                        />
                        <Button
                            type="submit"
                            variant="filled"
                            fullWidth
                            loading={isLoading}
                        >
                            Zaregistrovat se
                        </Button>
                    </form>
                </Paper>
            </Center>
        </>
    )
}

export default Register