import React from 'react';
import { Title, Group, useMantineTheme } from '@mantine/core';
import { IoPersonCircleOutline } from 'react-icons/io5';
import AccountFormWrap from '../components/Account/AccountFormWrap';
import RegisterForm from '../components/Account/RegisterForm';


function Register() {
    const theme = useMantineTheme();
    return (

            <AccountFormWrap>
                <Group align="center" position="center">
                    <IoPersonCircleOutline size={35} color={theme.colors[theme.primaryColor][4]} />
                    <Title order={2}>Vytvořit účet</Title>
                </Group>
                <RegisterForm />
            </AccountFormWrap>

    )
}

export default Register