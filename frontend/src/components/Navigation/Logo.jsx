import { Title } from '@mantine/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Logo(props) {
    const { user } = useSelector(state => state.auth);
    return (
        <Title order={2} {...props} ml="sm"
            sx={(theme) => ({
                background: theme.fn.linearGradient(35, theme.colors.indigo[9], theme.colors.cyan[4]),
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
            })}
        >
            <Link to={user && user.id ? '/dashboard' : '/'}
                style={{
                    textDecoration: 'none', color: 'inherit',
                }}>
                WorkTracker
            </Link>
        </Title>
    )
}

export default Logo