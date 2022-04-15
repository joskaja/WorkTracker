import { ActionIcon, Box, Button, Skeleton, Table } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import React, { useEffect } from 'react'
import { IoTrashBinOutline, IoPencil } from 'react-icons/io5'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { deleteWorkSession, resetStatus } from '../../features/WorkSessions/workSessionsSlice'
import { IoCloseCircleSharp, IoCheckmarkCircleSharp } from 'react-icons/io5'
import { createDurationString } from '../../utils/time'
import { Link } from 'react-router-dom'

function WorkSessionList({ data, fullDates, noActions, editWorkSession }) {
    const notifications = useNotifications();
    const dispatch = useDispatch();
    const { status, message } = useSelector(state => state.workSessions);



    useEffect(() => {
        if (status === 'delete_error') {
            notifications.showNotification({
                title: 'Chyba při odstraňování!',
                message: message,
                color: 'red',
                icon: <IoCloseCircleSharp />
            })
        }
        if (status === 'delete_success') {
            notifications.showNotification({
                title: 'Položka byla úspěšně odstraněna',
                message: message,
                color: 'green',
                icon: <IoCheckmarkCircleSharp />
            })
        }
        dispatch(resetStatus());
    }, [status, message]);

    let totalHours = 0;
    let totalAmount = 0;
    console.log(data);
    return (
        <Box style={{ overflowX: 'auto' }}>
            <Table verticalSpacing="sm" highlightOnHover>
                <thead>
                    <tr>
                        <th>Čas</th>
                        <th>Popis</th>
                        <th>Projekt</th>
                        <th>Klient</th>
                        <th>Délka</th>
                        <th>Částka</th>
                        {!noActions && <th>&nbsp;</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((session) => {
                        const start = moment(session.startTime);
                        const end = moment(session.endTime);
                        const amount = session.duration * (session?.project?.hourRate || 0);
                        totalHours += session.duration;
                        totalAmount += amount;
                        return (
                            <tr key={session._id}>
                                <td>{start.format(fullDates ? 'DD.MM.YYYY HH:mm' : 'HH:mm')} - {end.format('HH:mm')}</td>
                                <td>
                                    <Button
                                        compact
                                        color="black"
                                        component={Link}
                                        variant="subtle"
                                        to={'/session/' + session._id}
                                    >
                                        {session.description}
                                    </Button>
                                </td>
                                <td>{session?.project?.name}</td>
                                <td>{session?.client?.name}</td>
                                <td>{createDurationString(session.duration * 60 * 60 * 1000)}</td>
                                <td>{amount.toLocaleString('cs-CZ', { maximumFractionDigits: 2 })}&nbsp;Kč</td>
                                {!noActions &&
                                    <td>
                                        <ActionIcon
                                            color="yellow"
                                            onClick={() => { editWorkSession(session._id) }}
                                        >
                                            <IoPencil />
                                        </ActionIcon>
                                        <ActionIcon color="red"
                                            onClick={() => { dispatch(deleteWorkSession(session._id)) }}
                                        >
                                            <IoTrashBinOutline />
                                        </ActionIcon>
                                    </td>
                                }
                            </tr>
                        )
                    })
                    }
                    {status === 'load_loading' && <tr><td colSpan={7}><Skeleton height={30} radius="sm" /></td></tr>}
                    {(data.length < 1 && status !== 'load_loading') && <tr><td colSpan={7}>Nic nebylo nalezeno</td></tr>}
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={4}>Celkem: </th>
                        <th>{createDurationString(totalHours * 60 * 60 * 1000)}</th>
                        <th>{totalAmount.toLocaleString('cs-CZ', { maximumFractionDigits: 2 })}&nbsp;Kč</th>
                        <th>&nbsp;</th>
                    </tr>
                </tfoot>
            </Table>
        </Box>
    )
}

export default WorkSessionList