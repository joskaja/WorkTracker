import React, { useEffect, useState } from 'react'
import { Select } from '@mantine/core'
import ClientSelectItem from './ClientSelectItem';
import { apiRequestService } from '../../services/apiRequestService';
import { useNotifications } from '@mantine/notifications';
import { MdCheckCircle, MdError } from 'react-icons/md';
import { colors } from '../../utils/colors'


function ClientSelect(props) {
    const notifications = useNotifications();
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState([]);
    useEffect(() => {
        setLoading(true);
        apiRequestService.get('/api/clients').then(clients => {
            clients = clients.map(client => ({ ...client, label: client.name, value: client._id }));
            setClients(clients);
            setLoading(false);
        });
    }, []);

    const quickCreate = (name) => {
        setLoading(true);
        apiRequestService.post('/api/clients', { name, color: colors.randomColor() }).then(client => {
            console.log(client)
            setClients(clients => [...clients, { ...client, label: client.name, value: client._id }]);
            notifications.showNotification({
                title: 'Úspěch',
                message: 'Zákazník byl úspěšně uložen',
                color: 'green',
                icon: <MdCheckCircle />
            });
            props?.form?.setFieldValue(props.name, client._id);
            console.log(props?.form?.values);
            setLoading(false);
        }).catch(e => {
            notifications.showNotification({
                title: 'Chyba!',
                message: e,
                color: 'red',
                icon: <MdError />
            });
            setLoading(false);
        });
    }

    return (
        <Select
            label="Zákazník"
            placeholder="Vyberte zákazníka"
            nothingFound="Nikdo nebyl nalezen..."
            readOnly={loading}
            data={clients}
            itemComponent={ClientSelectItem}
            searchable
            clearable
            creatable
            getCreateLabel={(query) => `+ Přidat zákazníka "${query}"`}
            onCreate={quickCreate}
            filter={(value, item) =>
                item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
                item?.email?.toLowerCase().includes(value.toLowerCase().trim())
            }
            {...props}
            onChange={(value) => {
                let client = clients.filter(client => client._id === value)[0];
                console.log(value, client);
                return props.onChange(client)
            }}
        />
    )
}

export default ClientSelect