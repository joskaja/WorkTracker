import { ActionIcon, Box, Group, InputWrapper } from '@mantine/core'
import React from 'react'
import { DateRangePicker as MantineDateRangePicker } from '@mantine/dates'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import moment from 'moment';

function DateRangePicker({ dateRange, setDateRange, label, noArrows, variant }) {

    const derivateRange = (i) => {
        const start = moment(dateRange[0]);
        const end = moment(dateRange[1]);
        const days = moment.duration(end.diff(start)).asDays();
        start.add(days * i, 'days');
        end.add(days * i, 'days');
        setDateRange([start.toDate(), end.toDate()]);
    }
    return (
        <InputWrapper label={label}>
            <Group spacing="xs">
                {!noArrows &&
                    <ActionIcon variant="hover" color="primary" onClick={() => derivateRange(-1)}>
                        <IoChevronBack />
                    </ActionIcon>
                }
                <Box position="center" >
                    <MantineDateRangePicker
                        sx={(theme) => ({
                            width: variant === 'default' ? '100%' : 200,
                            input: {
                                fontWeight: 700,
                                textAlign: variant === 'default' ? 'left' : 'center'
                            }
                        })}
                        clearable={false}
                        variant={variant || 'unstyled'}
                        value={dateRange}
                        onChange={setDateRange}
                    />
                </Box>
                {!noArrows &&
                    <ActionIcon variant="hover" color="primary" onClick={() => derivateRange(1)}>
                        <IoChevronForward />
                    </ActionIcon>
                }
            </Group>
        </InputWrapper >
    )
}

export default DateRangePicker