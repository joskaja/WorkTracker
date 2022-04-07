import { ActionIcon, Box, Group, useMantineTheme } from '@mantine/core';
import { DatePicker as MantineDatePicker } from '@mantine/dates';
import React, { useEffect } from 'react'
import moment from 'moment';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import 'dayjs/locale/cs';
import { useDispatch, useSelector } from 'react-redux';
import { decrementDate, incrementDate, loadWorkSessions, setDate } from '../../features/WorkSessions/workSessionsSlice';


function DatePicker() {
    const { date } = useSelector(state => state.workSessions);
    const dispatch = useDispatch();
    const theme = useMantineTheme();

    const today = moment().startOf('day').toDate();

    useEffect(() => {
        dispatch(loadWorkSessions());
    }, [date]);


    return (
        <Group>
            <ActionIcon variant="hover" color="primary" onClick={() => dispatch(decrementDate())}>
                <IoChevronBack />
            </ActionIcon>
            <Box position="center" >
                <MantineDatePicker
                    locale="cs"
                    variant="unstyled"
                    inputFormat="DD. MMMM YYYY"
                    value={moment(date, 'DD.MM.YYYY').toDate()}
                    onChange={(val) => dispatch(setDate(moment(val).format('DD.MM.YYYY')))}
                    onDoubleClick={() => dispatch(setDate(moment().format('DD.MM.YYYY')))}
                    firstDayOfWeek="monday"
                    clearable={false}
                    dayStyle={(date) => date.getTime() === today.getTime()
                        ? { backgroundColor: theme.colors.cyan[5], color: theme.white }
                        : null
                    }
                    sx={(theme) => ({
                        width: 110,
                        input: {
                            textAlign: 'center',
                            fontWeight: 700,
                            color: theme.colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.gray[9]
                        }
                    })}
                />
            </Box>
            <ActionIcon variant="hover" color="primary" onClick={() => dispatch(incrementDate())}>
                <IoChevronForward />
            </ActionIcon>
        </Group>
    )
}

export default DatePicker