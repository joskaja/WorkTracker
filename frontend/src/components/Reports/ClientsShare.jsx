import React, { useMemo } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { Box, Skeleton } from '@mantine/core';

const countChartData = (data) => {
    const chartData = {};
    data.forEach((session) => {
        const client = session.client ? session.client : { _id: 'other', name: 'Nezařazeno', color: '#4c6ef5' };
        if (!chartData[client._id]) {
            chartData[client._id] = {
                totalHours: 0,
                clientName: client.name,
                color: client.color
            }
        }
        chartData[client._id].totalHours += session.duration || 0;
    });

    return Object.values(chartData);
}


function ClientsShare({ data, loading }) {

    let workSessionsByClient = useMemo(() => countChartData(data), [data]);

    return (
        <Box style={{ minHeight: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {(workSessionsByClient.length > 0 && !loading) &&
                <ResponsiveContainer height={400} style={{ margin: '0 auto' }}>
                    <PieChart>
                        <Pie data={workSessionsByClient} dataKey="totalHours" nameKey="clientName" cx="50%" cy="50%" fill="#8884d8" >
                            {workSessionsByClient.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" iconType="circle" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            }
            {(workSessionsByClient.length < 1 && !loading) && <Box>Žádná data</Box>}
            {loading && <Skeleton width="100%" height={400} radius="sm" />}
        </Box>
    )
}

export default ClientsShare