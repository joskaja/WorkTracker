import { ActionIcon, Box, Group} from '@mantine/core';
import {  DatePicker as MantineDatePicker } from '@mantine/dates';
import React from 'react'
import moment from 'moment';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import 'dayjs/locale/cs';
import { useDispatch, useSelector } from 'react-redux';
import { decrementDate, incrementDate, setDate } from '../../features/Date/dateSlice';


function DatePicker() {
    const {date} = useSelector(state => state.date);
    const dispatch = useDispatch();

    return (
        <Group ml="auto">
            <ActionIcon onClick={() => dispatch(decrementDate())}>
                <IoChevronBack />
            </ActionIcon>
            <Box position="center" >
                <MantineDatePicker
                    locale="cs"
                    variant="unstyled"
                    value={moment(date, 'DD.MM.YYYY').toDate()}
                    onChange={(val) => dispatch(setDate(moment(val).format('DD.MM.YYYY')))}
                    firstDayOfWeek="monday"
                    clearable={false}
                    style={{ width: 100 }}
                />
            </Box>
            <ActionIcon onClick={() => dispatch(incrementDate())}>
                <IoChevronForward />
            </ActionIcon>
        </Group>
    )
}

export default DatePicker