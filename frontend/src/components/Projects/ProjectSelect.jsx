import React, { useEffect, useState } from 'react'
import { Select } from '@mantine/core'
import ProjectSelectItem from './ProjectSelectItem';
import { apiRequestService } from '../../services/apiRequestService';
import { useNotifications } from '@mantine/notifications';
import { MdCheckCircle, MdError } from 'react-icons/md';
import { colors } from '../../utils/colors'


function ProjectSelect(props) {
    const notifications = useNotifications();
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);


    useEffect(() => {
        setLoading(true);
        apiRequestService.get('/api/projects')
            .then(projects => {
                projects = projects.map(project => ({ ...project, label: project.name, value: project._id }));
                setProjects(projects);
                setLoading(false);
            });
    }, []);

    const quickCreate = (name) => {
        setLoading(true);
        apiRequestService.post('/api/clients', { name, color: colors.randomColor() }).then(project => {
            setProjects(projects => [...projects, { ...project, label: project.name, value: project._id }]);
            notifications.showNotification({
                title: 'Úspěch',
                message: 'Projekt byl úspěšně uložen',
                color: 'green',
                icon: <MdCheckCircle />
            });
            props?.form?.setFieldValue(props.name, project._id);
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
            label="Projekt"
            placeholder="Vyberte projekt"
            nothingFound="Nikdo nebyl nalezen..."
            readOnly={loading}
            data={props.client ? projects.filter(project => project?.client?._id === props.client) : projects}
            itemComponent={ProjectSelectItem}
            searchable
            clearable
            creatable
            getCreateLabel={(query) => `+ Přidat projekt "${query}"`}
            onCreate={quickCreate}
            filter={(value, item) =>
                item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
                item?.email?.toLowerCase().includes(value.toLowerCase().trim())
            }
            {...props}
            onChange={(value) => {
                const project = projects.filter(project => project._id === value)[0];
                return props.onChange(project)
            }}
        />
    )
}

export default ProjectSelect