import { Title } from '@mantine/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Logo(props) {
    const { user } = useSelector(state => state.auth);
    return (
        <Title order={2} {...props} ml="sm">
            <Link to={user && user.id ? '/dashboard' : '/'}
                style={{
                    textDecoration: 'none', color: 'inherit',
                    background: '-webkit-linear-gradient(35deg, #364fc7 0%, #3bc9db 100%)',
                    '-webkit-background-clip': 'text',
                    '-webkit-text-fill-color': 'transparent'
                }}>
                WorkTracker
            </Link>
        </Title>
    )
}

export default Logo