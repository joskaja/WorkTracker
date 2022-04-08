import React, { useMemo } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip, LabelList } from 'recharts';
import { colors } from '../../utils/colors'
import { Box, Skeleton } from '@mantine/core';
const countChartData = (data) => {
    const chartData = {};
    data.forEach((session) => {
        if (!chartData[session.project._id]) {
            chartData[session.project._id] = {
                totalHours: 0,
                projectName: session.project.name,
                color: colors.randomColor()
            }
        }
        chartData[session.project._id].totalHours += session.duration || 0;
    });

    return Object.values(chartData);
}

function ProjectsShare({ data, loading }) {

    let workSessionsByProject = useMemo(() => countChartData(data), [data])
    return (
        <Box style={{ minHeight: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {(workSessionsByProject.length > 0 && !loading) &&
                <ResponsiveContainer height={400} style={{ margin: '0 auto' }}>
                    <PieChart>
                        <Pie data={workSessionsByProject} dataKey="totalHours" nameKey="projectName" cx="50%" cy="50%" fill="#8884d8" >
                            {workSessionsByProject.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" iconType="circle" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            }
            {(workSessionsByProject.length < 1 && !loading) && <Box>Žádná data</Box>}
            {loading && <Skeleton width="100%" height={400} radius="sm" />}

        </Box>
    )
}

export default ProjectsShare