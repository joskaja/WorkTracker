import { Group } from '@mantine/core'
import React from 'react'

function PageHeader({ children }) {
    return (
        <Group mb="sm" sx={(theme) => ({
            justifyContent: 'space-between',
            marginLeft: theme.spacing.lg,
            marginRight: theme.spacing.lg,
            [`@media screen and (max-width: 480px)`]: {
                justifyContent: 'center',
                marginLeft: 0,
                marginRight: 0,
                '& > *:nth-child(1)': {
                    flexBasis: '100%',
                    textAlign: 'center'
                }
            }
        })}>
            {children}
        </Group>
    )
}

export default PageHeader