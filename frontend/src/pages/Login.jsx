import React, { useState } from 'react'
import { Center, Paper, Title, Group, TextInput, PasswordInput, Button, createStyles } from '@mantine/core';
import { MdPersonOutline } from 'react-icons/md';

const useStyles = createStyles(theme => ({
  paper: {
    backgroundColor: theme.colors.dark[6],
    maxWidth: theme.breakpoints.xs,
    width: '100%'
  }
}));
function Login() {
  const { classes } = useStyles();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
  const { email, password } = formData;
  return (
    <Center style={{ minHeight: 'calc(100vh - 60px)' }}>
      <Paper padding="lg" shadow="sm" radius="md"
        className={classes.paper}
      >
        <Group align="center" position="center">
          <MdPersonOutline size={50} />
          <Title>Přihlásit se</Title>
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
          <PasswordInput
            name="password"
            value={password}
            onChange={onChange}
            label="Heslo"
            placeholder="Zadejte heslo"
            required
            mb="xs"
          />
          <Button variant="filled" fullWidth>Přihlásit se</Button>
        </form>
      </Paper>
    </Center>
  )
}

export default Login