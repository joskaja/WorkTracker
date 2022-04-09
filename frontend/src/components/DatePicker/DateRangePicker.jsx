import { ActionIcon, Box, Group } from '@mantine/core'
import React from 'react'
import { DateRangePicker as MantineDateRangePicker } from '@mantine/dates'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import moment from 'moment';

function DateRangePicker({ dateRange, setDateRange }) {

    const derivateRange = (i) => {
        const start = moment(dateRange[0]);
        const end = moment(dateRange[1]);
        const days = moment.duration(end.diff(start)).asDays();
        start.add(days*i, 'days');
        end.add(days*i, 'days');
        setDateRange([start.toDate(), end.toDate()]);
    }
    return (
        <Group spacing="xs">
            <ActionIcon variant="hover" color="primary" onClick={() => derivateRange(-1)}>
                <IoChevronBack />
            </ActionIcon>
            <Box position="center" >
                <MantineDateRangePicker
                    sx={(theme) => ({
                        width: 200,
                        input: {
                            fontWeight: 700,
                            textAlign: 'center'
                        }
                    })}
                    clearable={false}
                    variant="unstyled"
                    value={dateRange}
                    onChange={setDateRange}
                />
            </Box>
            <ActionIcon variant="hover" color="primary" onClick={() => derivateRange(1)}>
                <IoChevronForward/>
            </ActionIcon>
        </Group>
    )
}

export default DateRangePicker