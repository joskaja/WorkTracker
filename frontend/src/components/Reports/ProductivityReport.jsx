import React from 'react'
import moment from 'moment';
import { Box, useMantineTheme } from '@mantine/core';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
const prepareChartData = (range) => {
    const chartData = {};
    const start = moment(range[0]);
    const end = moment(range[1]);
    while (end >= start) {
        chartData[start.format('YYYY-MM-DD')] = {
            name: start.format('DD.MM.YYYY'),
            time: 0
        };
        start.add(1, 'day');
    }
    return chartData;
}

function ProductivityReport({ range, data, ...props }) {
    const theme = useMantineTheme();
    let chartData = {};
    if (range[0] && range[1] && data) {
        chartData = prepareChartData(range);
        data.forEach((session) => {
            const start = moment(session.startTime);
            if (chartData[start.format('YYYY-MM-DD')]) {
                chartData[start.format('YYYY-MM-DD')].time += session.duration;
            }
        });
    }
    chartData = Object.values(chartData);
    return (
        <Box style={{ minHeight: 400, width: '99%', overflow: 'hidden' }}>
            {chartData.length > 0 ?
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData} width={500} height={400}>
                        <Tooltip />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Legend verticalAlign="bottom" iconType="circle" height={36} />
                        <Bar dataKey="time" name="Počet hodin" fill={theme.colors[theme.primaryColor][6]} />
                    </BarChart>
                </ResponsiveContainer>
                :
                <Box>Žádná data</Box>
            }
        </Box>
    )
}

export default ProductivityReport