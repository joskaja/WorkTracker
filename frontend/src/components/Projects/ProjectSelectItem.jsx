import { Box, Group, Text } from "@mantine/core";
import { forwardRef } from "react";

const ProjectSelectItem = forwardRef(
    ({ name, hourRate, updatedAt, createdAt, client, _id, ...others }, ref) => (
        <Box ref={ref} value={_id} {...others}>
            <Group noWrap>
                <div>
                    <Text>{name}</Text>
                    <Text size="xs" color="dimmed">
                        {client?.name}
                    </Text>
                </div>
            </Group>
        </Box>
    )
);

export default ProjectSelectItem;