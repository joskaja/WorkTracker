import React from 'react'
import { Box, Center, Button, Group, InputWrapper } from '@mantine/core'
import DateRangePicker from '../DatePicker/DateRangePicker'
import ClientSelect from '../Clients/ClientSelect'
import ProjectSelect from '../Projects/ProjectSelect'
import moment from 'moment'

function FilterForm({ filters, setFilters, onReset }) {
    return (
        <Box>
            <Group mb="md">
                <DateRangePicker
                    label="Rozmezí"
                    dateRange={filters.dateRange}
                    setDateRange={(range) => setFilters({ ...filters, dateRange: range })}
                    variant="default"
                    noArrows
                />
                <InputWrapper label="Rychlé nastavení rozmezí: ">
                    <Group>
                        <Button
                            variant="light"
                            onClick={() => {
                                setFilters({
                                    ...filters,
                                    dateRange: [
                                        moment().startOf('isoweek').toDate(),
                                        moment().endOf('isoweek').toDate()
                                    ]
                                })
                            }}
                        >
                            Týden
                        </Button>
                        <Button
                            variant="light"
                            onClick={() => {
                                setFilters({
                                    ...filters,
                                    dateRange: [
                                        moment().startOf('month').toDate(),
                                        moment().endOf('month').toDate()
                                    ]
                                })
                            }}
                        >
                            Měsíc
                        </Button>
                        <Button
                            variant="light"
                            onClick={() => {
                                setFilters({
                                    ...filters,
                                    dateRange: [
                                        moment().startOf('year').toDate(),
                                        moment().endOf('year').toDate()
                                    ]
                                })
                            }}
                        >
                            Rok
                        </Button>
                    </Group>
                </InputWrapper>
            </Group>
            <Box mb="md">
                <ClientSelect
                    value={filters.client}
                    onChange={(val) => setFilters({ ...filters, client: val?._id || '' })}
                />
            </Box>
            <Box mb="md">
                <ProjectSelect
                    value={filters.project}
                    onChange={(val) => setFilters({ ...filters, project: val?._id || '' })}
                />
            </Box>
            <Center>
                <Button
                    mt="md"
                    variant="subtle"
                    color="red"
                    onClick={onReset}
                >
                    Resetovat filtrování
                </Button>
            </Center>
        </Box>
    )
}

export default FilterForm