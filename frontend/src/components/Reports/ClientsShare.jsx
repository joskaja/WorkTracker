import React, { useMemo } from 'react'
import moment from 'moment';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip, LabelList } from 'recharts';
import { Box, Skeleton } from '@mantine/core';

const countChartData = (data) => {
    const chartData = {};
    data.forEach((session) => {
        if (!chartData[session.client._id]) {
            chartData[session.client._id] = {
                totalHours: 0,
                clientName: session.client.name,
                color: session.client.color
            }
        }
        chartData[session.client._id].totalHours += session.duration || 0;
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