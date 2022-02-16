import React, { useState } from 'react'
import { Center, Paper, Title, Group, TextInput, PasswordInput, Button, createStyles } from '@mantine/core';
import { MdPersonAddAlt } from 'react-icons/md';

const useStyles = createStyles(theme => ({
    paper: {
        backgroundColor: theme.colors.dark[6],
        maxWidth: theme.breakpoints.xs,
        width: '100%'
    }
}));
function Register() {
    const { classes } = useStyles();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordAgain: ''
    });
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    const onSubmit = (e) => {
        e.preventDefault();
    }
    const { firstName, lastName, email, password, passwordAgain } = formData;
    return (
        <Center style={{ minHeight: 'calc(100vh - 60px)' }}>
            <Paper padding="lg" shadow="sm" radius="md"
                className={classes.paper}
            >
                <Group align="center" position="center">
                    <MdPersonAddAlt size={50} />
                    <Title>Vytvořit účet</Title>
                </Group>
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
                    <Button variant="filled" fullWidth>Zaregistrovat se</Button>
                </form>
            </Paper>
        </Center>
    )
}

export default Register