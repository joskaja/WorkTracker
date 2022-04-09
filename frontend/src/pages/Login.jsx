import React, { useState, useEffect } from 'react'
import { Group, Title, useMantineTheme } from '@mantine/core';
import { IoPersonCircleOutline } from 'react-icons/io5';
import Header from '../components/Navigation/Header'
import AccountFormWrap from '../components/Account/AccountFormWrap';
import LoginForm from '../components/Account/LoginForm';


function Login() {
  const theme = useMantineTheme();

  return (

    <AccountFormWrap>
      <Group position="center">
        <IoPersonCircleOutline size={35} color={theme.colors[theme.primaryColor][5]} />
        <Title order={2}>Přihlásit se</Title>
      </Group>
      <LoginForm />
    </AccountFormWrap>
  )
}

export default Login