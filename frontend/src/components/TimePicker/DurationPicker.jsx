import { ActionIcon, Group, TextInput } from '@mantine/core'
import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5'

const createDurationString = (milliseconds) => {
    let duration = moment.duration(milliseconds);
    return `${duration.get('hours')} h ${duration.get('minutes')} min`;
}

function DurationPicker({ duration, onChange }) {
    const [durationString, setDurationString] = useState(createDurationString(duration));

    useEffect(() => {
        setDurationString(createDurationString(duration));
    }, [duration])


    const derivateDuration = (hours) => {
        let newDuration = moment.duration(duration);
        newDuration.add(hours, 'hours');
        if (newDuration.asMinutes() < 1) {
            newDuration = moment.duration(1, 'minute');
        };
        onChange(newDuration.asMilliseconds());
    }

    return (
        <Group spacing={0}>
            <ActionIcon
                color="red"
                variant="transparent"
                style={{ marginTop: '1.7rem' }}
                onClick={() => derivateDuration(-1)}
            >
                <IoRemoveCircle />
            </ActionIcon>
            <TextInput
                label="Doba"
                value={durationString}
                onChange={(e) => setDurationString(e.target.value)}
                sx={(theme) => ({ maxWidth: 100, input: { textAlign: 'center' } })}
                onBlur={e => {
                    let val = e.target.value.replace(/\s+/g, '').split('h');
                    let hours = val[0];
                    let minutes = val[1]?.replace('min', '');

                    if (isNaN(hours)) hours = 1;
                    if (isNaN(minutes)) minutes = 0;

                    onChange(moment.duration({
                        hours,
                        minutes
                    }).asMilliseconds());
                }}
            />
            <ActionIcon
                color="green"
                variant="transparent"
                style={{ marginTop: '1.7rem' }}
                onClick={() => derivateDuration(1)}
            >
                <IoAddCircle />
            </ActionIcon>
        </Group>
    )
}

export default DurationPicker