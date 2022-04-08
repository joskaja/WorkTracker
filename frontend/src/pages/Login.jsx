import React, { useState, useEffect } from 'react'
import { Center, Paper, Title, Group, TextInput, PasswordInput, Button, Alert, createStyles, useMantineTheme } from '@mantine/core';
import { MdPersonOutline, MdCancel } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '@mantine/notifications';
import { login, reset } from '../features/Auth/authSlice';
import Header from '../components/Navigation/Header';
import { apiRequestService } from '../services/apiRequestService';

const useStyles = createStyles(theme => ({
  wrapper: {
    minHeight: 'calc(100vh - 60px)',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    flexDirection: 'column'
  },
  paper: {
    maxWidth: theme.breakpoints.xs,
    width: '100%'
  }
}));
function Login() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const notifications = useNotifications();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      setErrorMessage(message);
    }

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

    dispatch(reset());

  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData))
  }
  const { email, password } = formData;
  return (
    <>
      <Header height={60} p="xs" />
      <Center className={classes.wrapper}>
        <Title mb="lg">WorkTracker</Title>
        <Paper
          className={classes.paper}
        >
          <Group position="center">
            <MdPersonOutline size={50} color={theme.colors[theme.primaryColor][4]} />
            <Title order={2}>Přihlásit se</Title>
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
            <PasswordInput
              name="password"
              value={password}
              onChange={onChange}
              label="Heslo"
              placeholder="Zadejte heslo"
              required
              mb="xs"
            />
            <Button
              type="submit"
              variant="filled"
              fullWidth
              loading={isLoading}
            >
              Přihlásit se
            </Button>
          </form>
        </Paper>
      </Center>
    </>
  )
}

export default Login